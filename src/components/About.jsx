import { useRef } from 'react';
import { motion } from 'framer-motion';
import SkillGraph from './3d/SkillGraph';

const SKILLS = [
  'Python', 'TensorFlow', 'OpenCV', 'PyTorch', 'Scikit-Learn',
  'React.js', 'Next.js', 'Node.js', 'FastAPI', 'Flutter',
  'MongoDB', 'PostgreSQL', 'Docker', 'Socket.io', 'WebRTC',
  'spaCy', 'IPFS', 'Firebase', 'JWT', 'Bhashini',
];

const STATS = [
  { value: 'AI / ML', sub: 'Vision · NLP · Pipelines', color: '#727272' },
  { value: 'Full-Stack', sub: 'React · Node · FastAPI', color: '#171717' },
  { value: '15+', sub: 'Hackathons', color: '#727272' },
  { value: '∞', sub: 'Learning Loop', color: '#727272' },
];

/* ── 3D Orbital Skill Ring ─────────────────────────────── */
function OrbitRing({ skills, radius = 160, speed = 20, reverse = false }) {
  const count = skills.length;
  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        style={{
          position: 'relative',
          width: radius * 2,
          height: radius * 2,
          transformStyle: 'preserve-3d',
          animation: `${reverse ? 'orbit-spin-reverse' : 'orbit-spin'} ${speed}s linear infinite`,
        }}
      >
        {skills.map((skill, i) => {
          const angle = (i / count) * 360;
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius * 0.35;
          return (
            <div
              key={skill}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                animation: `${reverse ? 'orbit-spin' : 'orbit-spin-reverse'} ${speed}s linear infinite`,
              }}
            >
              <span
                className="px-2.5 py-1 rounded-full font-mono whitespace-nowrap text-[10px] font-medium pointer-events-auto cursor-default"
                style={{
                  background: 'linear-gradient(135deg, rgba(39,39,39,0.7), rgba(20,20,20,0.85))',
                  border: '1px solid rgba(114,114,114,0.25)',
                  color: 'rgba(255,255,255,0.9)',
                  boxShadow: '0 0 10px rgba(114,114,114,0.1)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {skill}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-36 px-6 md:px-12 overflow-hidden">

      {/* Section background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 60% at 10% 50%, rgba(39,39,39,0.15) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 90% 60%, rgba(114,114,114,0.06) 0%, transparent 50%)',
      }} />

      <div className="max-w-7xl mx-auto">

        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 max-w-[40px]" style={{ background: 'linear-gradient(to right, transparent, rgba(114,114,114,0.6))' }} />
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-neutral-400/70">01 — About</span>
          </div>
          <h2
            className="text-4xl md:text-6xl font-extrabold leading-tight"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            <span className="text-white">Who I </span>
            <span style={{
              background: 'linear-gradient(135deg, #727272 0%, #727272 40%, #727272 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Am
            </span>
          </h2>
        </motion.div>

        {/* Grid: Text + Orbit Ring */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">

          {/* LEFT: Bio text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              <div
                className="pl-5 border-l-2"
                style={{ borderColor: 'rgba(114,114,114,0.5)' }}
              >
                <p className="text-lg md:text-xl leading-relaxed font-medium" style={{ color: 'rgba(234,234,234,0.9)' }}>
                  I'm <span className="font-bold" style={{ color: '#b7b7b7' }}>Giridhar Shyam Samsani</span> — a passionate AI & Machine Learning Developer with experience building intelligent applications using Computer Vision, ML pipelines, and full-stack technologies.
                </p>
              </div>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: 'rgba(229,229,229,0.85)' }}>
                I don't just build isolated apps — I orchestrate complex systems where databases, mobile clients, web dashboards, and AI inference engines interact seamlessly. From training ML models to crafting polished interfaces, I build end-to-end systems that make a tangible impact.
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(229,229,229,0.7)' }}>
                Actively participating in <span className="text-neutral-300 font-semibold">15+ hackathons</span>, coordinating the <span className="text-neutral-300 font-semibold">GCC Coding Club</span>, and constantly pushing the boundaries of what's possible.
              </p>
            </div>

            {/* Quick facts */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { num: '15+', label: 'Hackathons' },
                { num: '5+', label: 'Projects' },
                { num: '∞', label: 'Curiosity' },
              ].map(({ num, label }) => (
                <div
                  key={label}
                  className="text-center py-4 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(39,39,39,0.35), rgba(11,11,11,0.7))',
                    border: '1px solid rgba(114,114,114,0.15)',
                  }}
                >
                  <div className="text-2xl font-black" style={{
                    background: 'linear-gradient(135deg, #727272, #727272)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>{num}</div>
                  <div className="text-[11px] font-mono uppercase tracking-widest mt-1" style={{ color: 'rgba(229,229,229,0.7)' }}>{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Infinite Skill Loop Marquee */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9 }}
            className="flex flex-col items-center justify-center relative w-full h-full min-h-[360px]"
          >
            <SkillGraph />
          </motion.div>
        </div>

        {/* Bottom: Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map(({ value, sub, color }, i) => (
            <motion.div
              key={value}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group p-6 rounded-2xl text-center cursor-default transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(20,20,20,0.8), rgba(11,11,11,0.9))',
                border: '1px solid rgba(114,114,114,0.1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${color}40`;
                e.currentTarget.style.boxShadow = `0 0 30px ${color}20`;
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(114,114,114,0.1)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = '';
              }}
            >
              <div
                className="text-2xl md:text-3xl font-black mb-2 transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${color}, ${color}aa)`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}
              >
                {value}
              </div>
              <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest" style={{ color: 'rgba(229,229,229,0.6)' }}>
                {sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
