#!/usr/bin/env python3
"""Turn the portfolio's beacon log into visitor counts for Mission Control.

nginx appends one JSON line per page load to visits/visits.log (see
deploy/nginx-portfolio-site.conf and src/visit.ts). Cron runs this every
minute on Nexus; it reads the new lines, updates visits/state.json and
rewrites visits/status.json, which nginx serves on 127.0.0.1:8082 only.

A visitor is a hash of IP + user agent with a salt that is replaced every
day, so the same person counts once per day and can't be followed across
days. Raw addresses never leave the log, and the log is truncated once read.

Stdlib only (Termux). Days are IST, the site owner's day.
"""
from __future__ import annotations

import hashlib
import json
import os
import re
import secrets
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

VISITS_DIR = Path(os.environ.get("PORTFOLIO_VISITS_DIR", Path.home() / "Portfolio" / "visits"))
LOG = VISITS_DIR / "visits.log"
STATE = VISITS_DIR / "state.json"
STATUS = VISITS_DIR / "status.json"

IST = timezone(timedelta(hours=5, minutes=30))
HISTORY_DAYS = 30
ACTIVE_MINUTES = 30
# Truncate the log once it's this big and fully counted.
TRUNCATE_AT = 256 * 1024
TOP_N = 5

# The beacon only fires from a real browser running the page's JS, so this
# just catches headless renderers and link-preview fetchers that do run it.
BOT_UA = re.compile(r"bot|crawl|spider|slurp|headless|lighthouse|preview|python|curl|wget|go-http|phantom", re.I)


def now() -> datetime:
    return datetime.now(IST)


def load_state() -> dict:
    try:
        return json.loads(STATE.read_text())
    except (OSError, ValueError):
        return {"offset": 0, "history": {}}


def new_day(date: str) -> dict:
    return {"date": date, "salt": secrets.token_hex(16), "visitors": {}, "pageviews": 0,
            "bots": 0, "referrers": {}, "countries": {}}


def visitor_id(salt: str, ip: str, ua: str) -> str:
    return hashlib.sha256(f"{salt}|{ip}|{ua}".encode()).hexdigest()[:16]


def roll_day(state: dict, date: str) -> dict:
    """The current day's bucket, archiving the previous one (its salt and
    visitor hashes are dropped; only the counts are kept)."""
    day = state.get("day")
    if day and day["date"] == date:
        return day
    if day:
        state["history"][day["date"]] = {"visitors": len(day["visitors"]), "pageviews": day["pageviews"]}
    state["day"] = new_day(date)
    return state["day"]


def count(state: dict, entry: dict) -> None:
    try:
        ts = datetime.fromisoformat(entry["t"]).astimezone(IST)
    except (KeyError, ValueError):
        return
    date = ts.date().isoformat()
    day = state.get("day")
    # A late line from an already-archived day: count it there, coarsely.
    if day and date < day["date"]:
        old = state["history"].setdefault(date, {"visitors": 0, "pageviews": 0})
        old["pageviews"] += 1
        return
    day = roll_day(state, date)

    ua = entry.get("ua", "")
    if not ua or BOT_UA.search(ua):
        day["bots"] += 1
        return

    ip = entry.get("ip") or entry.get("ra", "")
    vid = visitor_id(day["salt"], ip, ua)
    first = vid not in day["visitors"]
    day["visitors"][vid] = ts.isoformat(timespec="seconds")
    day["pageviews"] += 1
    if first:
        # referrer/country per visitor, not per reload
        ref = entry.get("r") or "direct"
        day["referrers"][ref] = day["referrers"].get(ref, 0) + 1
        country = entry.get("c") or "??"
        day["countries"][country] = day["countries"].get(country, 0) + 1


def read_new_lines(state: dict) -> None:
    try:
        size = LOG.stat().st_size
    except FileNotFoundError:
        state["offset"] = 0
        return
    offset = state.get("offset", 0)
    if size < offset:  # truncated by someone else
        offset = 0
    with LOG.open("rb") as f:
        f.seek(offset)
        data = f.read()
    # only whole lines; a half-written one is picked up next run
    end = data.rfind(b"\n") + 1
    for raw in data[:end].splitlines():
        try:
            count(state, json.loads(raw))
        except ValueError:
            continue
    offset += end
    # nginx appends with O_APPEND, so truncating is safe — but only when
    # nothing arrived after what we just read.
    if offset >= TRUNCATE_AT and LOG.stat().st_size == offset:
        os.truncate(LOG, 0)
        offset = 0
    state["offset"] = offset


def top(counts: dict, n: int = TOP_N) -> list[list]:
    return [[k, v] for k, v in sorted(counts.items(), key=lambda kv: (-kv[1], kv[0]))[:n]]


def build_status(state: dict, at: datetime) -> dict:
    today = at.date().isoformat()
    day = roll_day(state, today)
    history = state["history"]
    for old in sorted(history)[:-HISTORY_DAYS]:
        del history[old]

    daily = []
    for i in range(13, -1, -1):
        date = (at.date() - timedelta(days=i)).isoformat()
        if date == today:
            daily.append({"date": date, "visitors": len(day["visitors"]), "pageviews": day["pageviews"]})
        else:
            h = history.get(date, {})
            daily.append({"date": date, "visitors": h.get("visitors", 0), "pageviews": h.get("pageviews", 0)})

    cutoff = at - timedelta(minutes=ACTIVE_MINUTES)
    seen = [datetime.fromisoformat(t) for t in day["visitors"].values()]
    if seen:
        state["last_visit"] = max(seen).isoformat()
    last_visit = state.get("last_visit")

    return {
        "date": today,
        "visitors_today": len(day["visitors"]),
        "pageviews_today": day["pageviews"],
        "bots_today": day["bots"],
        f"active_{ACTIVE_MINUTES}m": sum(t >= cutoff for t in seen),
        "visitors_yesterday": daily[-2]["visitors"],
        "visitors_7d": sum(d["visitors"] for d in daily[-7:]),
        "daily": daily,
        "top_referrers": top(day["referrers"]),
        "top_countries": top(day["countries"]),
        "last_visit": last_visit,
        "generated_at": at.isoformat(timespec="seconds"),
    }


def write_json(path: Path, data: dict) -> None:
    tmp = path.with_suffix(".tmp")
    tmp.write_text(json.dumps(data, indent=1))
    tmp.replace(path)


def main() -> int:
    VISITS_DIR.mkdir(parents=True, exist_ok=True)
    state = load_state()
    read_new_lines(state)
    status = build_status(state, now())
    write_json(STATE, state)
    write_json(STATUS, status)
    if "-v" in sys.argv:
        print(json.dumps(status, indent=1))
    return 0


if __name__ == "__main__":
    sys.exit(main())
