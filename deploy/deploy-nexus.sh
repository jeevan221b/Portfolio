#!/usr/bin/env bash
# Build on the laptop and publish to Nexus.
#  - pushes main to GitHub, then fast-forwards the ~/Portfolio clone on Nexus
#  - ships dist/ as a tarball (Vite's native bindings don't build on Termux) and swaps it in
#  - installs/refreshes the nginx site (127.0.0.1:8081) and reloads nginx if it changed
# Public URL: https://jeevanraj.dev (Cloudflare tunnel -> 127.0.0.1:8081).
set -euo pipefail
cd "$(dirname "$0")/.."

HOST=${NEXUS_HOST:-nexus}
REMOTE_DIR='~/Portfolio'
CONF_NAME=portfolio-site.conf

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Working tree is dirty; commit first." >&2
  exit 1
fi

npm run build
git push origin main

ssh "$HOST" "cd $REMOTE_DIR && git checkout -q -- package-lock.json 2>/dev/null; git pull -q --ff-only origin main && git log --oneline -1"

tar -C dist -czf - . | ssh "$HOST" "set -e; cd $REMOTE_DIR; rm -rf dist.new; mkdir dist.new; tar -C dist.new -xzf -; rm -rf dist.old; [ -d dist ] && mv dist dist.old; mv dist.new dist; rm -rf dist.old"

ssh "$HOST" "set -e
  conf=\$PREFIX/etc/nginx/conf.d/$CONF_NAME
  if ! cmp -s $REMOTE_DIR/deploy/nginx-portfolio-site.conf \"\$conf\"; then
    cp $REMOTE_DIR/deploy/nginx-portfolio-site.conf \"\$conf\"
    nginx -t 2>&1 | tail -1
    nginx -s reload && echo 'nginx reloaded'
  fi
  curl -s -o /dev/null -w 'local check: %{http_code}\n' http://127.0.0.1:8081/"
