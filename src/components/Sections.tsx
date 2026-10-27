import { useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import {
  beyond,
  education,
  experience,
  labProjects,
  profile,
  skills,
  workProjects,
} from '../data/content';
import { Magnetic, Reveal, SpotCard } from './fx';
import { stagger } from './motion';
import { FeatureVisual } from './Visuals';

function Heading({ eyebrow, children, lede }: { eyebrow: string; children: React.ReactNode; lede?: string }) {
  return (
    <div>
      <Reveal><span className="eyebrow">{eyebrow}</span></Reveal>
      <Reveal as="h2" className="section-title" delay={0.05}>{children}</Reveal>
      {lede && <Reveal as="p" className="section-lede" delay={0.1}>{lede}</Reveal>}
    </div>
  );
}

const inViewGroup = (gap?: number) => ({
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, margin: '-80px' },
  variants: stagger(gap),
});

// Bolds the measurable bit of each bullet so the numbers jump out.
const emphasise = (text: string) =>
  text.split(/(3-month plan in 1 month|50\+ colleagues|1st place|20\+ teams|24 hours|from scratch)/).map((part, i) =>
    i % 2 ? <strong key={i}>{part}</strong> : part,
  );

export function Experience() {
  const job = experience[0];
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 55%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <section id="experience">
      <div className="container">
        <Heading eyebrow="01 — Experience">
          Three years of shipping <em>real</em> products.
        </Heading>
        <div className="exp-grid">
          <Reveal className="exp-side">
            <div className="exp-company">{job.company}</div>
            <div className="exp-role">{job.role}</div>
            <div className="exp-period">{job.period}</div>
            <div className="chips">{job.stack.map((t) => <span key={t} className="chip">{t}</span>)}</div>
          </Reveal>
          <div className="timeline" ref={listRef}>
            <div className="timeline-track"><motion.div className="timeline-fill" style={{ scaleY: fill }} /></div>
            {job.points.map((p, i) => (
              <Reveal key={i} className="tl-item" delay={i * 0.04}>
                <span className="tl-dot" />
                <p>{emphasise(p)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Work() {
  return (
    <section id="work">
      <div className="container">
        <Heading
          eyebrow="02 — Client work"
          lede="Products I've built front ends for at QBurst. Client names stay private, the problems don't."
        >
          AI products, <em>made usable.</em>
        </Heading>
        <motion.div className="work-grid" {...inViewGroup(0.12)}>
          {workProjects.map((p, i) => (
            <SpotCard key={p.title} className="work-card" tilt={6}>
              <span className="work-index">0{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.blurb}</p>
              <div className="chips">{p.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
            </SpotCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function Lab() {
  return (
    <section id="lab">
      <div className="container">
        <div className="lab-head">
          <Heading
            eyebrow="03 — The lab"
            lede="What I build when nobody's asking. Most of it runs 24/7 on a phone in my house."
          >
            Personal <em>projects.</em>
          </Heading>
        </div>

        <div className="featured">
          {labProjects.map((p) => (
            <motion.div key={p.title} {...inViewGroup()}>
              <SpotCard className="feature">
                <div className="feature-body">
                  <span className="feature-kicker">{p.kicker}</span>
                  <h3>{p.title}</h3>
                  <p>{p.blurb}</p>
                  <ul>{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
                  <div className="feature-foot">
                    <div className="chips">{p.stack.map((t) => <span key={t} className="chip">{t}</span>)}</div>
                  </div>
                </div>
                <div className="feature-visual"><FeatureVisual kind={p.visual} /></div>
              </SpotCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export function Skills() {
  const half = Math.ceil(skills.length / 2);
  const rows = [skills.slice(0, half), skills.slice(half)];
  return (
    <div className="marquee-section" aria-label="Skills">
      {rows.map((row, r) => (
        <div key={r} className={`marquee${r ? ' rev' : ''}`}>
          <div className="marquee-track">
            {[...row, ...row, ...row, ...row].map((s, i) => (
              <span key={i} className="marquee-item" aria-hidden={i >= row.length}>{s}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function About() {
  return (
    <section id="about">
      <div className="container">
        <Heading eyebrow="04 — Off the clock">
          Beyond the <em>editor.</em>
        </Heading>
        <motion.div className="about-grid" {...inViewGroup(0.12)}>
          <SpotCard className="about-card">
            <h3>Life</h3>
            {beyond.map((b) => (
              <div key={b.title} className="about-row">
                <div><div className="t">{b.title}</div><div className="s">{b.text}</div></div>
              </div>
            ))}
          </SpotCard>
          <SpotCard className="about-card">
            <h3>Education</h3>
            {education.map((e) => (
              <div key={e.course} className="about-row">
                <div><div className="t">{e.course}</div><div className="s">{e.place}</div></div>
                <div className="p">{e.period}</div>
              </div>
            ))}
          </SpotCard>
        </motion.div>
      </div>
    </section>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async (e: React.MouseEvent) => {
    try {
      await navigator.clipboard.writeText(profile.email);
      e.preventDefault();
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // No clipboard access (e.g. plain http): let the mailto: link open instead.
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <Reveal><span className="eyebrow">05 — Contact</span></Reveal>
        <Reveal as="h2" className="contact-title" delay={0.05}>
          Let's build<br /><span className="serif grad-text">something.</span>
        </Reveal>
        <Reveal as="p" className="section-lede" delay={0.1}>
          Open to front-end roles, interesting problems and conversations about the night sky.
        </Reveal>
        <Reveal delay={0.15}>
          <Magnetic strength={0.2}>
            <a className="email-btn" href={`mailto:${profile.email}`} onClick={copy}>
              {profile.email}
              <span className="copy">{copied ? 'copied ✓' : 'copy'}</span>
            </a>
          </Magnetic>
        </Reveal>
        <Reveal className="contact-links" delay={0.2}>
          {profile.links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer">{l.label} ↗</a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <span>© {new Date().getFullYear()} {profile.fullName}</span>
        <span>Self-hosted on an Android phone · Built with React + Motion</span>
      </div>
    </footer>
  );
}
