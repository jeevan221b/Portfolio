import { motion } from 'motion/react';
import { ease, useActiveSection } from './motion';

const links = [
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'lab', label: 'Lab' },
  { id: 'contact', label: 'Contact' },
];
const ids = links.map((l) => l.id);

export function Nav() {
  const active = useActiveSection(ids);
  return (
    <motion.nav
      className="nav"
      initial={{ y: -40, x: '-50%', opacity: 0 }}
      animate={{ y: 0, x: '-50%', opacity: 1 }}
      transition={{ duration: 0.9, ease, delay: 0.2 }}
      aria-label="Primary"
    >
      <a href="#top" className="nav-mark" aria-label="Back to top">RD</a>
      {links.map((l) => (
        <a key={l.id} href={`#${l.id}`} className={`nav-link${active === l.id ? ' active' : ''}`}>
          {active === l.id && (
            <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
          )}
          {l.label}
        </a>
      ))}
    </motion.nav>
  );
}
