import { useEffect, useState, useSyncExternalStore } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { profile } from '../data/content';
import { Magnetic } from './fx';
import { ease } from './motion';

const words = ['interfaces', 'web apps', 'self-hosted tools', 'side quests'];

function SplitLine({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="line" aria-hidden>
      {[...text].map((c, i) => (
        <motion.span
          key={i}
          className="char"
          initial={{ y: '110%', rotate: 8, opacity: 0 }}
          animate={{ y: '0%', rotate: 0, opacity: 1 }}
          transition={{ duration: 1, ease, delay: delay + i * 0.045 }}
        >
          {c === ' ' ? ' ' : c}
        </motion.span>
      ))}
    </span>
  );
}

function Swap() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % words.length), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="swap">
      {/* invisible copies reserve the width of the longest word */}
      {words.map((w) => <span key={w} style={{ visibility: 'hidden' }} aria-hidden>{w}</span>)}
      <AnimatePresence mode="popLayout">
        <motion.span
          key={words[i]}
          className="grad-text"
          initial={{ y: '60%', opacity: 0, filter: 'blur(8px)' }}
          animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-60%', opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.6, ease }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 1, ease, delay },
});

// Below this width the orbit stacks under the text, so the hero is taller than the screen.
const stackedQuery = '(max-width: 860px)';
const subscribeStacked = (cb: () => void) => {
  const mq = window.matchMedia(stackedQuery);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};
const isStacked = () => window.matchMedia(stackedQuery).matches;

export function Hero() {
  const stacked = useSyncExternalStore(subscribeStacked, isStacked);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 160]);
  const fade = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="hero" id="top">
      {/* the scroll fade would hide the stacked orbit just as it scrolls into view */}
      <motion.div className="container hero-inner" style={stacked ? undefined : { y, opacity: fade }}>
        <div>
          <motion.div className="eyebrow" {...enter(0.1)}>
            <span className="status-dot" style={{ marginRight: 2 }} />
            {profile.role} · {profile.location}
          </motion.div>
          <h1 className="hero-name" aria-label={profile.name}>
            <SplitLine text="Raj" delay={0.25} />
            <SplitLine text="Diwakar" delay={0.4} />
          </h1>
          <motion.p className="hero-tag" {...enter(0.9)}>
            I build <Swap /> <br />that feel effortless.
          </motion.p>
          <motion.p className="hero-intro" {...enter(1.05)}>{profile.intro}</motion.p>
          <motion.div className="hero-cta" {...enter(1.2)}>
            <Magnetic>
              <a className="btn btn-primary" href="#lab">
                See the work <span className="arrow">↗</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn btn-ghost" href="#contact">Get in touch</a>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          className="orbit-wrap"
          initial={{ opacity: 0, scale: 0.85, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.8, ease, delay: 0.4 }}
          aria-hidden
        >
          <div className="orbit" style={{ '--inset': '0%', '--dur': '60s' } as React.CSSProperties}>
            <span className="planet" style={{ '--c': '#67e8f9' } as React.CSSProperties} />
          </div>
          <div className="orbit" style={{ '--inset': '13%', '--dur': '38s' } as React.CSSProperties}>
            <span className="planet" style={{ '--c': '#a5d8ff' } as React.CSSProperties} />
          </div>
          <div className="orbit" style={{ '--inset': '26%', '--dur': '22s' } as React.CSSProperties}>
            <span className="planet" style={{ '--c': '#5ea2ff' } as React.CSSProperties} />
          </div>
          <div className="orbit-core" />
          <span className="orbit-label" style={{ top: '8%', left: '-4%' }}>React · TypeScript</span>
          <span className="orbit-label" style={{ bottom: '14%', right: '0%' }}>AI-driven products</span>
          <span className="orbit-label" style={{ bottom: '2%', left: '8%' }}>UI/UX · Performance</span>
        </motion.div>
      </motion.div>

      <motion.div className="scroll-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
        SCROLL
        <span className="bar" />
      </motion.div>
    </section>
  );
}
