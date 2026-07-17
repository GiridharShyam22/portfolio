import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectDetailModal from './ProjectDetailModal';

/* ── Project theme config ──────────────────── */
const themes = {
  1: { color: '#9a9a9a', glow: 'rgba(154,154,154,0.25)',  label: 'Trading AI' },
  2: { color: '#9f9f9f', glow: 'rgba(159,159,159,0.25)',  label: 'Finance' },
  3: { color: '#a7a7a7', glow: 'rgba(167,167,167,0.25)',  label: 'Mental Health AI' },
  4: { color: '#a0a0a0', glow: 'rgba(160,160,160,0.25)', label: 'Event Platform' },
  5: { color: '#a0a0a0', glow: 'rgba(160,160,160,0.25)', label: 'Healthcare' },
  6: { color: '#c4c4c4', glow: 'rgba(196,196,196,0.25)',  label: 'AI Recruiting' },
};

/* ── Holographic 3D Card ───────────────────── */
function HoloCard({ project, onOpen }) {
  const theme = themes[project.id] || themes[1];
  const cardRef = useRef(null);
  const shineRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);

    cardRef.current.style.transform =
      `perspective(1000px) rotateY(${dx * 10}deg) rotateX(${-dy * 8}deg) translateZ(4px)`;

    // Foil shine position
    if (shineRef.current) {
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      shineRef.current.style.background = `
        radial-gradient(circle at ${px}% ${py}%,
          rgba(255,255,255,0.08) 0%,
          rgba(114,114,114,0.06) 40%,
          transparent 70%
        )
      `;
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
    if (shineRef.current) shineRef.current.style.background = 'none';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(project)}
      role="button"
      tabIndex={0}
      aria-label={`View ${project.title} case study`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpen(project); }}
      className="relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-150 group"
      style={{
        background: 'linear-gradient(135deg, rgba(20,20,20,0.95), rgba(11,11,11,0.98))',
        border: `1px solid rgba(114,114,114,0.12)`,
        boxShadow: '0 4px 30px rgba(4,4,4,0.5)',
        willChange: 'transform',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.08s ease-out, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${theme.color}50`;
        e.currentTarget.style.boxShadow = `0 8px 50px ${theme.glow}, 0 0 0 1px ${theme.color}20`;
      }}
    >
      {/* Foil shine overlay */}
      <div ref={shineRef} className="absolute inset-0 z-10 pointer-events-none rounded-2xl transition-none" />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, ${theme.color}, transparent)`, opacity: 0.7 }} />

      {/* Content */}
      <div className="relative z-10 p-6 md:p-8 flex flex-col h-full" style={{ transformStyle: 'preserve-3d' }}>

        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            {/* Project type badge */}
            <span
              className="inline-block px-2.5 py-1 rounded-full font-mono text-[10px] tracking-widest uppercase mb-3"
              style={{ background: `${theme.color}15`, border: `1px solid ${theme.color}35`, color: theme.color }}
            >
              {theme.label}
            </span>
            <h3
              className="text-xl md:text-2xl font-bold leading-tight text-white group-hover:transition-colors"
              style={{ transform: 'translateZ(8px)', fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {project.title}
            </h3>
            <div className="text-xs font-mono mt-1" style={{ color: 'rgba(229,229,229,0.5)' }}>
              {project.year} · {project.role}
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200"
                style={{
                  background: `${theme.color}15`,
                  border: `1px solid ${theme.color}30`,
                  color: theme.color,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = `${theme.color}25`; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = `${theme.color}15`; }}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live
              </a>
            )}
            {project.apkUrl && (
              <a
                href={project.apkUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200"
                style={{
                  background: `${theme.color}15`,
                  border: `1px solid ${theme.color}30`,
                  color: theme.color,
                }}
              >
                APK
              </a>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-lg transition-all duration-200"
              style={{ color: 'rgba(229,229,229,0.5)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(229,229,229,0.5)'; }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>

        {/* Description */}
        <p
          className="text-sm md:text-base leading-relaxed flex-1 mb-5"
          style={{ color: 'rgba(229,229,229,0.85)', transform: 'translateZ(4px)' }}
        >
          {project.description.length > 160 ? project.description.slice(0, 160) + '…' : project.description}
        </p>

        {/* Tags + View Case Study */}
        <div className="flex items-end justify-between gap-3 mt-auto">
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map(tag => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg font-mono text-[10px] transition-colors"
                style={{
                  background: 'rgba(39,39,39,0.4)',
                  border: '1px solid rgba(114,114,114,0.15)',
                  color: 'rgba(229,229,229,0.7)',
                }}
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="px-2 py-1 rounded-lg font-mono text-[10px]" style={{ color: 'rgba(229,229,229,0.4)' }}>
                +{project.tags.length - 4}
              </span>
            )}
          </div>

          <div
            className="flex-shrink-0 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1"
            style={{ color: theme.color }}
          >
            Case study →
          </div>
        </div>
      </div>

      {/* Bottom glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${theme.color}, transparent)` }}
      />
    </div>
  );
}

/* ── Projects Section ─────────────────────── */
export default function Projects() {
  const [selected, setSelected] = useState(null);

  const featured = projects.filter(p => p.featured);
  const rest     = projects.filter(p => !p.featured);

  const { scrollYProgress } = useScroll();
  // Parallax offsets for columns
  const yCol1 = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const yCol2 = useTransform(scrollYProgress, [0, 1], ['0%', '-5%']);
  const yCol3 = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  const bgTextY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <>
      <section id="projects" className="relative py-24 md:py-36 px-6 md:px-12 overflow-hidden">

        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(114,114,114,0.06) 0%, transparent 60%)',
        }} />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* Huge background text for parallax depth */}
          <motion.div 
            className="absolute top-0 right-0 pointer-events-none select-none overflow-hidden opacity-5"
            style={{ y: bgTextY, x: '20%' }}
          >
            <span className="text-[20vw] font-bold font-mono tracking-tighter leading-none text-white whitespace-nowrap">
              PROJECTS
            </span>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px flex-1 max-w-[40px]" style={{ background: 'linear-gradient(to right, transparent, rgba(114,114,114,0.6))' }} />
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-neutral-400/70">02 — Work</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h2 className="text-4xl md:text-6xl font-extrabold" style={{ fontFamily: 'Space Grotesk' }}>
                <span className="text-white">Featured </span>
                <span style={{
                  background: 'linear-gradient(135deg, #727272, #727272, #727272)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>Projects</span>
              </h2>
              <p className="text-sm font-mono max-w-xs text-right" style={{ color: 'rgba(229,229,229,0.6)' }}>
                {projects.length} projects · Click any card to explore the full case study
              </p>
            </div>
          </motion.div>

          {/* Featured: 3-col on large, 1-col on small */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
            {featured.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
              >
                <HoloCard project={project} onOpen={setSelected} />
              </motion.div>
            ))}
          </div>

          {/* Rest: 2-col or 3-col */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((project, i) => {
              const colIndex = i % 3;
              const yOffset = colIndex === 0 ? yCol1 : colIndex === 1 ? yCol2 : yCol3;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  style={{ y: yOffset }}
                >
                  <HoloCard project={project} onOpen={setSelected} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectDetailModal
            key={selected.id}
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
