import { motion } from 'framer-motion';
import { GiTrophyCup } from 'react-icons/gi';
import { RiRocketLine, RiCodeSSlashLine, RiTeamLine, RiAwardLine } from 'react-icons/ri';

const timeline = [
  {
    id: 'gcc',
    badge: 'Ongoing',
    badgePulse: true,
    title: 'Coordinator — GCC Coding Club',
    sub: 'Technical Leadership',
    color: '#4f6ef7',
    glow: 'rgba(79,110,247,0.25)',
    icon: RiCodeSSlashLine,
    points: [
      'Coordinating coding activities, technical events, and peer learning initiatives across the college',
      'Promoting programming and problem-solving skills through workshops and competitions',
      'Mentoring peers on DSA, web development, and machine learning fundamentals',
    ],
    tags: ['Leadership', 'Event Management', 'Mentoring', 'Community Building'],
  },
  {
    id: 'expo',
    badge: 'Completed',
    badgePulse: false,
    title: 'Tech Expo Organizer',
    sub: 'Event Management',
    color: '#7c4fff',
    glow: 'rgba(124,79,255,0.25)',
    icon: RiTeamLine,
    points: [
      'Successfully organized a college-level Tech Expo with project showcases and technical demonstrations',
      'Facilitated student engagement through interactive demos, poster sessions, and live coding challenges',
    ],
    tags: ['Event Management', 'Coordination'],
  },
];

const achievements = [
  {
    id: 'tackathon',
    highlight: true,
    badge: 'Runner-Up',
    icon: GiTrophyCup,
    title: 'Tackathon Communication Competition',
    desc: 'Secured Runner-Up position demonstrating strong presentation, teamwork, and communication skills under competitive pressure.',
    stat: '2nd Place',
    statLabel: 'Recognition',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.3)',
  },
  {
    id: 'hackathons',
    highlight: true,
    badge: 'Active Participant',
    icon: RiRocketLine,
    title: '15+ Hackathons',
    desc: 'Participated in 15+ monthly hackathons, gaining hands-on experience in innovation, rapid prototyping, teamwork, and problem-solving.',
    stat: '15+ Events',
    statLabel: 'Experience',
    color: '#00b4ff',
    glow: 'rgba(0,180,255,0.25)',
  },
];

const smallCards = [
  { icon: RiCodeSSlashLine, badge: 'Coordinator', title: 'GCC Coding Club', desc: 'Coordinating coding activities and events to foster programming culture.', color: '#4f6ef7' },
  { icon: RiTeamLine,       badge: 'Organizer',   title: 'Tech Expo',       desc: 'Organized a college-level Tech Expo with project showcases.', color: '#7c4fff' },
  { icon: RiRocketLine,     badge: 'Builder',      title: 'AI & ML Projects', desc: 'Developed multiple AI/ML and full-stack projects solving real-world challenges.', color: '#00b4ff' },
  { icon: RiAwardLine,      badge: 'Innovator',    title: 'Rapid Prototyping', desc: 'Consistent track record building functional prototypes under time constraints.', color: '#f59e0b' },
];

/* ── Timeline Node ─────────────────────── */
function TimelineEntry({ item, index }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="relative flex gap-6"
    >
      {/* Timeline spine */}
      <div className="flex flex-col items-center">
        {/* Node */}
        <div
          className="w-4 h-4 rounded-full flex-shrink-0 mt-1.5 z-10"
          style={{
            background: item.color,
            boxShadow: `0 0 0 4px rgba(3,4,14,0.8), 0 0 16px ${item.glow}`,
            animation: 'node-pulse 3s ease-in-out infinite',
          }}
        />
        {/* Line */}
        <div className="w-px flex-1 mt-2" style={{ background: `linear-gradient(to bottom, ${item.color}40, transparent)`, minHeight: '100%' }} />
      </div>

      {/* Card */}
      <div
        className="flex-1 mb-10 rounded-2xl overflow-hidden transition-all duration-300 group"
        style={{
          background: 'linear-gradient(135deg, rgba(15,18,48,0.9), rgba(8,11,26,0.95))',
          border: `1px solid rgba(79,110,247,0.1)`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${item.color}40`;
          e.currentTarget.style.boxShadow = `0 0 30px ${item.glow}`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(79,110,247,0.1)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {/* Top accent */}
        <div className="h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${item.color}80, transparent)` }} />

        <div className="p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-xs font-bold"
              style={{ background: `${item.color}15`, border: `1px solid ${item.color}35`, color: item.color }}
            >
              {item.badgePulse && (
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: item.color, boxShadow: `0 0 6px ${item.color}`, animation: 'blink-cursor 1.5s ease-in-out infinite' }} />
              )}
              {item.badge}
            </span>
          </div>

          <h4 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-blue-200 transition-colors" style={{ fontFamily: 'Space Grotesk' }}>
            {item.title}
          </h4>
          <div className="text-sm font-medium mb-5" style={{ color: 'rgba(121,134,203,0.7)' }}>{item.sub}</div>

          <ul className="space-y-3 mb-5">
            {item.points.map((pt, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: 'rgba(121,134,203,0.8)' }}>
                <span className="mt-1 flex-shrink-0" style={{ color: item.color }}>▹</span>
                {pt}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {item.tags.map(tag => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full font-mono text-[10px]"
                style={{ background: `${item.color}10`, border: `1px solid ${item.color}25`, color: `${item.color}cc` }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Achievement Highlight Card ────────── */
function AchievementCard({ item, index }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="relative overflow-hidden rounded-2xl transition-all duration-300 group cursor-default"
      style={{
        background: `linear-gradient(135deg, rgba(15,18,48,0.98), ${item.color}18, rgba(8,11,26,0.98))`,
        border: `1px solid ${item.color}25`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${item.color}55`;
        e.currentTarget.style.boxShadow = `0 8px 40px ${item.glow}`;
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${item.color}25`;
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = '';
      }}
    >
      {/* Top gradient line */}
      <div className="h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }} />

      {/* Watermark icon */}
      <div className="absolute -right-4 -top-4 opacity-[0.06] pointer-events-none" style={{ color: item.color }}>
        <Icon style={{ fontSize: '8rem' }} />
      </div>

      <div className="relative z-10 p-6 md:p-7">
        <span
          className="inline-block px-3 py-1 rounded-full font-mono text-xs font-bold mb-4"
          style={{ background: `${item.color}15`, border: `1px solid ${item.color}35`, color: item.color }}
        >
          {item.badge}
        </span>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="text-xl font-black text-white mb-2" style={{ fontFamily: 'Space Grotesk' }}>{item.title}</h4>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(121,134,203,0.8)' }}>{item.desc}</p>
          </div>
          <div className="flex-shrink-0 text-right px-4 py-3 rounded-xl" style={{ background: `${item.color}08`, border: `1px solid ${item.color}20` }}>
            <div className="text-[10px] font-mono uppercase tracking-widest mb-1" style={{ color: 'rgba(121,134,203,0.5)' }}>{item.statLabel}</div>
            <div className="text-base font-black" style={{ color: item.color }}>{item.stat}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-36 px-6 md:px-12 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 50% at 80% 50%, rgba(29,32,102,0.12) 0%, transparent 60%)',
      }} />

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 max-w-[40px]" style={{ background: 'linear-gradient(to right, transparent, rgba(79,110,247,0.6))' }} />
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-blue-400/70">03 — Journey</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold" style={{ fontFamily: 'Space Grotesk' }}>
            <span className="text-white">Activities & </span>
            <span style={{
              background: 'linear-gradient(135deg, #8899ff, #4f6ef7, #7c4fff)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Achievements</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

          {/* LEFT: Timeline */}
          <div>
            <h3 className="font-mono text-sm tracking-[0.2em] uppercase mb-8 flex items-center gap-3" style={{ color: 'rgba(121,134,203,0.7)' }}>
              <span style={{ color: '#4f6ef7' }}>/</span> Leadership
            </h3>
            {timeline.map((item, i) => (
              <TimelineEntry key={item.id} item={item} index={i} />
            ))}
          </div>

          {/* RIGHT: Achievements */}
          <div>
            <h3 className="font-mono text-sm tracking-[0.2em] uppercase mb-8 flex items-center gap-3" style={{ color: 'rgba(121,134,203,0.7)' }}>
              <span style={{ color: '#4f6ef7' }}>/</span> Recognition
            </h3>

            <div className="space-y-4 mb-6">
              {achievements.map((item, i) => (
                <AchievementCard key={item.id} item={item} index={i} />
              ))}
            </div>

            {/* Small cards grid */}
            <div className="grid grid-cols-2 gap-3">
              {smallCards.map(({ icon: Icon, badge, title, desc, color }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.08 }}
                  className="p-4 rounded-xl transition-all duration-300 cursor-default"
                  style={{
                    background: 'rgba(15,18,48,0.7)',
                    border: '1px solid rgba(79,110,247,0.1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${color}40`;
                    e.currentTarget.style.boxShadow = `0 0 20px ${color}15`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(79,110,247,0.1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono" style={{ background: `${color}12`, border: `1px solid ${color}30`, color }}>{badge}</span>
                    <Icon style={{ fontSize: '1.2rem', color, opacity: 0.6 }} />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
                  <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(121,134,203,0.6)' }}>{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
