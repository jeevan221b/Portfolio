import { useEffect, useRef, type ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react';
import { ease, fadeUp, prefersReducedMotion } from './motion';

type Star = { x: number; y: number; r: number; depth: number; phase: number; speed: number };
type Meteor = { x: number; y: number; vx: number; vy: number; life: number };

// Three depth layers that drift with scroll and pointer; deeper stars move less.
export function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    const still = prefersReducedMotion();
    let w = 0, h = 0, stars: Star[] = [], meteor: Meteor | null = null, raf = 0;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((w * h) / 4200);
      stars = Array.from({ length: count }, () => {
        const depth = Math.random() < 0.7 ? 0.15 : Math.random() < 0.8 ? 0.4 : 0.8;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.35 + depth * 1.1 * Math.random() + 0.2,
          depth,
          phase: Math.random() * Math.PI * 2,
          speed: 0.6 + Math.random() * 1.6,
        };
      });
    };

    const onMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / w - 0.5) * 2;
      pointer.ty = (e.clientY / h - 0.5) * 2;
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;
      const scroll = window.scrollY;

      for (const s of stars) {
        const y = (((s.y - scroll * s.depth * 0.35 - pointer.y * 14 * s.depth) % h) + h) % h;
        const x = (((s.x - pointer.x * 14 * s.depth) % w) + w) % w;
        const tw = still ? 0.8 : 0.55 + 0.45 * Math.sin(t * 0.001 * s.speed + s.phase);
        ctx.globalAlpha = tw * (0.35 + s.depth * 0.8);
        ctx.fillStyle = s.depth > 0.6 ? '#e0ecff' : '#ffffff';
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!meteor && Math.random() < 0.0025) {
        meteor = { x: Math.random() * w * 0.8 + w * 0.2, y: Math.random() * h * 0.4, vx: -7, vy: 3.2, life: 1 };
      }
      if (meteor) {
        const m = meteor;
        const g = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 14, m.y - m.vy * 14);
        g.addColorStop(0, `rgba(224, 236, 255,${m.life})`);
        g.addColorStop(1, 'rgba(224, 236, 255,0)');
        ctx.globalAlpha = 1;
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx * 14, m.y - m.vy * 14);
        ctx.stroke();
        m.x += m.vx;
        m.y += m.vy;
        m.life -= 0.012;
        if (m.life <= 0) meteor = null;
      }
      ctx.globalAlpha = 1;
      if (!still) raf = requestAnimationFrame(draw);
    };

    resize();
    draw(0);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove);
    const onScroll = () => still && draw(0);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return <canvas ref={ref} className="starfield" aria-hidden />;
}

export function CursorGlow() {
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const sx = useSpring(x, { stiffness: 120, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 120, damping: 20, mass: 0.4 });
  useEffect(() => {
    const move = (e: PointerEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [x, y]);
  return <motion.div className="cursor-glow" style={{ x: sx, y: sy }} aria-hidden />;
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  return <motion.div className="progress" style={{ scaleX }} />;
}

type RevealProps = { children: ReactNode; className?: string; delay?: number; as?: 'div' | 'li' | 'p' | 'h2' };

export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={{ hidden: fadeUp.hidden, show: { ...(fadeUp.show as object), transition: { duration: 0.9, ease, delay } } }}
    >
      {children}
    </Tag>
  );
}

// Card whose border/fill glow tracks the pointer, with an optional gentle 3D tilt.
export function SpotCard({ children, className = '', tilt = 0 }: { children: ReactNode; className?: string; tilt?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rx = useSpring(0, { stiffness: 180, damping: 18 });
  const ry = useSpring(0, { stiffness: 180, damping: 18 });

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current!;
    const b = el.getBoundingClientRect();
    const px = (e.clientX - b.left) / b.width;
    const py = (e.clientY - b.top) / b.height;
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
    if (tilt && !reduce && e.pointerType === 'mouse') {
      rx.set((0.5 - py) * tilt);
      ry.set((px - 0.5) * tilt);
    }
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div
      ref={ref}
      className={`spot ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      variants={fadeUp}
    >
      {children}
    </motion.div>
  );
}

export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 14, mass: 0.3 });
  const y = useSpring(0, { stiffness: 200, damping: 14, mass: 0.3 });
  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: 'inline-flex' }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return;
        const b = ref.current!.getBoundingClientRect();
        x.set((e.clientX - b.left - b.width / 2) * strength);
        y.set((e.clientY - b.top - b.height / 2) * strength);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

