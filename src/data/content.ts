// Everything the page says lives here, so copy edits never touch layout code.

export const profile = {
  name: 'Raj Diwakar',
  fullName: 'A Raj Diwakar',
  role: 'Front-End Developer',
  location: 'Perumbavoor, Kerala',
  email: 'ard121001@gmail.com',
  intro:
    'I build fast, user-centric interfaces with React and TypeScript at QBurst, and after hours I run a small fleet of self-hosted tools on an old Android phone.',
  links: [
    { label: 'GitHub', href: 'https://github.com/jeevan221b' },
    { label: 'Blog', href: 'https://blog.jeevanraj.dev' },
    // LinkedIn isn't in the resume PDF as a URL; add it here to show it.
  ] as { label: string; href: string }[],
};

export type Job = {
  role: string;
  company: string;
  period: string;
  points: string[];
  stack: string[];
};

export const experience: Job[] = [
  {
    role: 'Software Developer',
    company: 'QBurst Technologies',
    period: 'Aug 2023 — Present',
    points: [
      'Build intuitive, responsive front ends in React with JavaScript and TypeScript, and support backend integration so features ship end to end.',
      'Spearheaded the migration of a large-scale React codebase from JavaScript to TypeScript, finishing a 3-month plan in 1 month without destabilising the product.',
      'Led several projects from scratch, working across cross-functional teams from requirements through to production deployment.',
      'Ran technical sessions on emerging technologies for 50+ colleagues.',
      'Won 1st place in an internal hackathon among 20+ teams with a working prototype built in 24 hours.',
    ],
    stack: ['React', 'TypeScript', 'JavaScript', 'Redux', 'Material UI', 'Java'],
  },
];

export const education = [
  { course: 'B.Tech, Computer Science', place: 'Federal Institute of Science and Technology, Angamaly', period: '2019 — 2023' },
  { course: 'Higher Secondary', place: 'HSS Valayanchirangara', period: '2017 — 2019' },
];

export type WorkProject = { title: string; blurb: string; tags: string[] };

// Client work from QBurst — described, not linked.
export const workProjects: WorkProject[] = [
  {
    title: 'AI-driven Recruitment Platform',
    blurb:
      'Front end for resume parsing, candidate-to-job matching and semantic search, shaped into a hiring workflow recruiters can move through quickly.',
    tags: ['React', 'Semantic search', 'UX'],
  },
  {
    title: 'CV Parsing & Standardisation',
    blurb:
      'Turns CVs in any format into structured profiles, then into client-configurable templates. I built the transformation UI that cut manual processing.',
    tags: ['React', 'TypeScript', 'AI extraction'],
  },
  {
    title: 'Back-Office Process Automation',
    blurb:
      'AI-assisted automation for timesheets, payroll, billing and cash allocation, built to scale while removing manual steps from finance workflows.',
    tags: ['Automation', 'Workflows', 'AI'],
  },
];

export type Visual = 'nexus' | 'sky' | 'voice' | 'home';

export type LabProject = {
  title: string;
  kicker: string;
  blurb: string;
  highlights: string[];
  stack: string[];
  visual: Visual;
};

export const labProjects: LabProject[] = [
  {
    title: 'Nexus',
    kicker: 'Personal infrastructure',
    blurb:
      'A retired Galaxy M31 turned into a 24/7 home server. Termux gives it Linux; runit, nginx, Tailscale and a Cloudflare tunnel turn it into the host for my other projects.',
    highlights: [
      'Self-healing boot: one idempotent ensure-up script, fired by boot, cron, a tmux keeper and Android JobScheduler',
      'Serves web apps and bots to the internet through a named Cloudflare tunnel',
      'Battery and uptime alerts straight to Telegram',
    ],
    stack: ['Termux', 'nginx', 'runit', 'Cloudflare', 'Tailscale'],
    visual: 'nexus',
  },
  {
    title: 'SkyWatcher',
    kicker: 'Astronomy assistant',
    blurb:
      'A Telegram bot that tells me when the sky is worth looking at. It computes planet positions, moon phase and Milky Way quality locally, then folds in cloud cover to score each night 0–10.',
    highlights: [
      'Ephemeris maths runs offline from JPL data, no paid APIs',
      'Alerts when targets enter my balcony telescope window',
      'ISS passes, eclipses, meteor showers and a monthly dark-sky calendar',
    ],
    stack: ['Python', 'Skyfield', 'Open-Meteo', 'Telegram'],
    visual: 'sky',
  },
  {
    title: 'Interview Sim',
    kicker: 'Voice-first mock interviews',
    blurb:
      'Pick a topic, hear each question read aloud, answer by speaking. At the end you get scores per dimension, missed points, model answers and delivery stats like pace and filler words.',
    highlights: [
      'Live transcription in the browser, Whisper fallback elsewhere',
      'Works for any field, with custom topics and focus areas',
      'Invite-only with Google sign-in, hosted on Nexus',
    ],
    stack: ['React', 'Hono', 'Groq', 'Whisper', 'SQLite'],
    visual: 'voice',
  },
  {
    title: 'IoT Home Automation',
    kicker: 'Hardware',
    blurb:
      'Lights, switches and air conditioners controlled from anywhere. ESP32 boards drive relays and IR transmitters, orchestrated by Node-RED on a Raspberry Pi.',
    highlights: [
      'ESP32 + relays for wall switches, IR transmitters for the ACs',
      'Node-RED flows on a Raspberry Pi run the automations',
      'MQTT keeps device messaging light and reliable',
    ],
    stack: ['ESP32', 'Node-RED', 'MQTT', 'Raspberry Pi'],
    visual: 'home',
  },
];

export const skills = [
  'React', 'TypeScript', 'JavaScript', 'Redux', 'Material UI', 'Java', 'Apps Script', 'Python',
  'FastAPI', 'Node', 'SQLite', 'nginx', 'Git', 'Claude Code', 'Cursor', 'MQTT', 'ESP32',
];

export const beyond = [
  { title: 'Astrophotography', text: 'Shooting the night sky. SkyWatcher started as a way to know which nights are worth setting up for.' },
  { title: 'Cricket', text: 'I play for my club team and my office team.' },
];
