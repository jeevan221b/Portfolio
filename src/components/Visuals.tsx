import type { Visual } from '../data/content';

// Small animated SVG scenes, one per kind of project. All drawn on a 400x320 box.

function NexusViz() {
  const nodes = [
    { x: 70, y: 70, l: 'portfolio' },
    { x: 330, y: 70, l: 'blog' },
    { x: 70, y: 250, l: 'interview sim' },
    { x: 330, y: 250, l: 'skywatcher' },
  ];
  return (
    <svg className="viz" viewBox="0 0 400 320" aria-hidden>
      <circle className="stroke spin" cx="200" cy="160" r="120" strokeDasharray="2 8" />
      {nodes.map((n, i) => (
        <g key={n.l}>
          <line className="accent dash" x1="200" y1="160" x2={n.x} y2={n.y} style={{ animationDelay: `${i * -0.3}s`, opacity: 0.6 }} />
          <circle cx={n.x} cy={n.y} r="5" fill="#6ee7c8" className="pulse" style={{ animationDelay: `${i * 0.4}s` }} />
          <text x={n.x} y={n.y + (n.y < 160 ? -14 : 22)} textAnchor="middle" fill="#8d8d96" fontSize="11" fontFamily="JetBrains Mono, monospace">{n.l}</text>
        </g>
      ))}
      <rect x="168" y="112" width="64" height="96" rx="12" fill="#0c0c0f" stroke="#b8a8ff" strokeWidth="1.2" />
      <rect x="176" y="122" width="48" height="66" rx="4" fill="rgba(184,168,255,0.08)" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="182" y={130 + i * 13} width={i % 2 ? 22 : 34} height="4" rx="2" fill="#b8a8ff" className="pulse" style={{ animationDelay: `${i * 0.25}s` }} />
      ))}
      <circle cx="200" cy="197" r="3" fill="#8d8d96" />
    </svg>
  );
}

function SkyViz() {
  const stars = [[60, 50], [110, 90], [150, 40], [250, 70], [300, 40], [340, 110], [90, 200], [320, 230], [40, 140], [360, 180]];
  return (
    <svg className="viz" viewBox="0 0 400 320" aria-hidden>
      {stars.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 ? 1.4 : 2.2} fill="#fff" className="twinkle" style={{ animationDelay: `${i * 0.37}s` }} />
      ))}
      <polyline points="60,50 110,90 150,40" className="stroke" strokeDasharray="3 4" />
      <path d="M20 300 Q200 60 380 300" className="stroke" strokeDasharray="2 6" />
      <g className="spin-rev">
        <circle cx="200" cy="160" r="70" className="stroke" />
        <circle cx="270" cy="160" r="9" fill="#e9c46a" style={{ filter: 'drop-shadow(0 0 10px #e9c46a)' }} />
      </g>
      <g className="spin">
        <circle cx="200" cy="160" r="112" className="stroke" />
        <circle cx="200" cy="48" r="6" fill="#b8a8ff" style={{ filter: 'drop-shadow(0 0 10px #b8a8ff)' }} />
      </g>
      <circle cx="200" cy="160" r="26" fill="#d9d0ff" />
      <circle cx="212" cy="152" r="26" fill="#060607" />
      <text x="200" y="306" textAnchor="middle" fill="#8d8d96" fontSize="11" fontFamily="JetBrains Mono, monospace">sky score 8.4 / 10</text>
    </svg>
  );
}

function VoiceViz() {
  const bars = Array.from({ length: 28 }, (_, i) => 20 + Math.abs(Math.sin(i * 0.7)) * 90 + (i % 4) * 8);
  return (
    <svg className="viz" viewBox="0 0 400 320" aria-hidden>
      <circle cx="200" cy="160" r="128" className="stroke" strokeDasharray="1 7" />
      {bars.map((h, i) => (
        <rect
          key={i}
          x={46 + i * 11}
          y={160 - h / 2}
          width="5"
          height={h}
          rx="2.5"
          fill={i % 5 === 0 ? '#6ee7c8' : '#b8a8ff'}
          opacity={0.45 + (i % 3) * 0.2}
          className="bar"
          style={{ animationDelay: `${(i % 7) * -0.15}s`, animationDuration: `${0.8 + (i % 5) * 0.15}s` }}
        />
      ))}
      <text x="200" y="300" textAnchor="middle" fill="#8d8d96" fontSize="11" fontFamily="JetBrains Mono, monospace">listening…</text>
    </svg>
  );
}

function HomeViz() {
  const devices = [
    { x: 70, y: 70, l: 'lights' },
    { x: 330, y: 70, l: 'fans' },
    { x: 70, y: 250, l: 'switches' },
    { x: 330, y: 250, l: 'AC (IR)' },
  ];
  return (
    <svg className="viz" viewBox="0 0 400 320" aria-hidden>
      {devices.map((d, i) => (
        <g key={d.l}>
          <path className="accent dash" d={`M200 160 C 200 ${d.y} ${d.x} 160 ${d.x} ${d.y}`} style={{ animationDelay: `${i * -0.4}s`, opacity: 0.6 }} />
          <rect x={d.x - 16} y={d.y - 16} width="32" height="32" rx="8" fill="#0c0c0f" stroke="rgba(255,255,255,0.16)" />
          <circle cx={d.x} cy={d.y} r="5" fill="#6ee7c8" className="pulse" style={{ animationDelay: `${i * 0.5}s` }} />
          <text x={d.x} y={d.y + (d.y < 160 ? -26 : 36)} textAnchor="middle" fill="#8d8d96" fontSize="11" fontFamily="JetBrains Mono, monospace">{d.l}</text>
        </g>
      ))}
      <circle cx="200" cy="160" r="54" className="stroke pulse" />
      <circle cx="200" cy="160" r="36" fill="#0c0c0f" stroke="#b8a8ff" strokeWidth="1.2" />
      <text x="200" y="157" textAnchor="middle" fill="#ededef" fontSize="11" fontFamily="JetBrains Mono, monospace">MQTT</text>
      <text x="200" y="172" textAnchor="middle" fill="#8d8d96" fontSize="9" fontFamily="JetBrains Mono, monospace">node-red</text>
    </svg>
  );
}

export function FeatureVisual({ kind }: { kind: Visual }) {
  if (kind === 'nexus') return <NexusViz />;
  if (kind === 'sky') return <SkyViz />;
  if (kind === 'home') return <HomeViz />;
  return <VoiceViz />;
}
