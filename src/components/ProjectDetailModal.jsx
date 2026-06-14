import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Download } from 'lucide-react';
import { LogoLoop } from '../reactbits/LogoLoop';
import ScreenshotReel from './ScreenshotReel';
import {
  SiFastapi, SiReact, SiFlutter, SiMongodb, SiNodedotjs,
  SiPython, SiTensorflow, SiSocketdotio, SiNextdotjs,
  SiPostgresql, SiTailwindcss, SiVercel, SiHuggingface,
  SiVite, SiExpress, SiFirebase, SiDart, SiBinance,
} from 'react-icons/si';

// Map icon string keys to actual icon components
const ICON_MAP = {
  SiFastapi, SiReact, SiFlutter, SiMongodb, SiNodedotjs,
  SiPython, SiTensorflow, SiSocketdotio, SiNextdotjs,
  SiPostgresql, SiTailwindcss, SiVercel, SiHuggingface,
  SiVite, SiExpress, SiFirebase, SiDart, SiBinance,
};

// Per-project theme tokens
const MODAL_THEMES = {
  1: {
    bg: 'from-blue-950/95 via-[#0c0a09]/98 to-[#0c0a09]/98',
    glow: 'rgba(59,130,246,0.12)',
    glowSolid: 'rgb(59,130,246)',
    border: 'border-blue-500/20',
    accent: 'text-blue-400',
    accentBg: 'bg-blue-500/10',
    accentBorder: 'border-blue-500/25',
    fadeColor: '#050a14',
  },
  2: {
    bg: 'from-teal-950/95 via-[#0c0a09]/98 to-[#0c0a09]/98',
    glow: 'rgba(20,184,166,0.12)',
    glowSolid: 'rgb(20,184,166)',
    border: 'border-teal-500/20',
    accent: 'text-teal-400',
    accentBg: 'bg-teal-500/10',
    accentBorder: 'border-teal-500/25',
    fadeColor: '#051412',
  },
  3: {
    bg: 'from-orange-950/95 via-[#0c0a09]/98 to-[#0c0a09]/98',
    glow: 'rgba(251,146,60,0.12)',
    glowSolid: 'rgb(251,146,60)',
    border: 'border-orange-500/20',
    accent: 'text-orange-400',
    accentBg: 'bg-orange-500/10',
    accentBorder: 'border-orange-500/25',
    fadeColor: '#140a04',
  },
  4: {
    bg: 'from-rose-950/95 via-[#0c0a09]/98 to-[#0c0a09]/98',
    glow: 'rgba(244,63,94,0.12)',
    glowSolid: 'rgb(244,63,94)',
    border: 'border-rose-500/20',
    accent: 'text-rose-400',
    accentBg: 'bg-rose-500/10',
    accentBorder: 'border-rose-500/25',
    fadeColor: '#140206',
  },
  5: {
    bg: 'from-stone-900/95 via-[#0c0a09]/98 to-[#0c0a09]/98',
    glow: 'rgba(168,162,158,0.12)',
    glowSolid: 'rgb(168,162,158)',
    border: 'border-stone-500/20',
    accent: 'text-stone-300',
    accentBg: 'bg-stone-500/10',
    accentBorder: 'border-stone-500/25',
    fadeColor: '#0e0d0c',
  },
  6: {
    bg: 'from-amber-950/95 via-[#0c0a09]/98 to-[#0c0a09]/98',
    glow: 'rgba(245,158,11,0.12)',
    glowSolid: 'rgb(245,158,11)',
    border: 'border-amber-500/20',
    accent: 'text-amber-400',
    accentBg: 'bg-amber-500/10',
    accentBorder: 'border-amber-500/25',
    fadeColor: '#140d02',
  },
};

function buildLogoItems(techLogos) {
  return techLogos.map(({ title, icon }) => {
    const IconComponent = ICON_MAP[icon];
    if (!IconComponent) return null;
    return { node: <IconComponent />, title };
  }).filter(Boolean);
}

// Custom render function for LogoLoop items with hover tooltip
function LogoItemWithTooltip(item, key) {
  return (
    <div key={key} className="relative group/logo flex flex-col items-center cursor-default">
      <span className="logoloop__node text-white/60 transition-all duration-300 group-hover/logo:text-white group-hover/logo:scale-110">
        {item.node}
      </span>
      {item.title && (
        <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono font-bold tracking-wider uppercase opacity-0 group-hover/logo:opacity-100 transition-all duration-300 translate-y-1 group-hover/logo:translate-y-0 pointer-events-none px-2 py-0.5 rounded-md bg-white/10 backdrop-blur-sm text-white/90">
          {item.title}
        </span>
      )}
    </div>
  );
}

export default function ProjectDetailModal({ project, onClose }) {
  const scrollRef = useRef(null);
  const theme = MODAL_THEMES[project.id];
  const logoItems = buildLogoItems(project.techLogos || []);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on Esc
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {/* Overlay */}
      <motion.div
        key="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <motion.div
        key="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} case study`}
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-0 sm:inset-x-4 sm:top-4 sm:bottom-4 md:inset-x-8 lg:inset-x-16 xl:inset-x-32 md:top-6 md:bottom-6 z-[101] flex flex-col rounded-none sm:rounded-3xl overflow-hidden border ${theme.border} shadow-2xl`}
        style={{ boxShadow: `0 0 80px ${theme.glow}, 0 32px 64px rgba(0,0,0,0.6)` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Themed gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-b ${theme.bg} pointer-events-none`} />
        {/* Subtle grid texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:40px_40px]" />

        {/* Scrollable body */}
        <div ref={scrollRef} className="relative flex flex-col h-full overflow-y-auto">

          {/* HEADER */}
          <div className={`sticky top-0 z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 md:px-12 py-6 border-b ${theme.border} bg-[#0c0a09]/85 backdrop-blur-xl`}>
            <div className="flex flex-col gap-1.5 min-w-0">
              <div className={`flex items-center gap-2.5 text-xs font-mono tracking-widest uppercase ${theme.accent}`}>
                <span className="inline-block w-2 h-2 rounded-full" style={{ background: theme.glowSolid }} />
                {project.year} — {project.role}
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">{project.title}</h2>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold border ${theme.accentBorder} ${theme.accentBg} ${theme.accent} transition-all hover:brightness-125`}
                >
                  Live Demo <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
              {project.apkUrl && (
                <a
                  href={project.apkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold border ${theme.accentBorder} ${theme.accentBg} ${theme.accent} transition-all hover:brightness-125`}
                >
                  APK <Download className="w-3.5 h-3.5" />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold border border-white/10 bg-white/5 text-white/70 hover:text-white hover:border-white/25 transition-all"
                >
                  GitHub <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all"
                aria-label="Close case study"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* CONTENT BODY */}
          <div className="flex flex-col gap-12 px-6 md:px-12 py-10">

            {/* OVERVIEW */}
            <p className={`text-base md:text-lg leading-relaxed max-w-3xl ${theme.accent} font-medium`}>
              {project.overview}
            </p>

            {/* SCREENSHOT REEL — auto-scrolling, drag/swipe, pauses on hover */}
            <div>
              <h3 className={`text-xs font-mono tracking-widest uppercase mb-5 ${theme.accent}`}>Screenshots</h3>
              <div className={`rounded-2xl border ${theme.accentBorder} overflow-hidden`}>
                <ScreenshotReel
                  images={project.screenshots.map((src, i) => ({
                    src,
                    alt: `${project.title} screenshot ${i + 1}`,
                  }))}
                  speed={40}
                  height={280}
                  gap={20}
                  fadeColor={theme.fadeColor}
                  borderClass={`border ${theme.border}`}
                  glowColor={theme.glow}
                  ariaLabel={`Screenshots for ${project.title}`}
                />
              </div>
            </div>

            {/* TECH STACK — LOGO LOOP WITH TOOLTIP */}
            {logoItems.length > 0 && (
              <div>
                <h3 className={`text-xs font-mono tracking-widest uppercase mb-5 ${theme.accent}`}>Tech Stack</h3>
                <div
                  className={`rounded-2xl border ${theme.accentBorder} ${theme.accentBg} overflow-hidden`}
                  style={{ height: '80px', position: 'relative' }}
                >
                  <LogoLoop
                    logos={logoItems}
                    speed={50}
                    direction="left"
                    logoHeight={30}
                    gap={48}
                    hoverSpeed={0}
                    fadeOut
                    fadeOutColor={theme.fadeColor}
                    ariaLabel={`Tech stack for ${project.title}`}
                    renderItem={LogoItemWithTooltip}
                    style={{ paddingTop: '12px' }}
                  />
                </div>
              </div>
            )}

            {/* DETAIL CARDS */}
            <div className="grid md:grid-cols-2 gap-8">

              {/* Key Features */}
              <div className={`rounded-2xl border ${theme.accentBorder} bg-[#0c0a09]/60 p-7`}>
                <h3 className={`text-xs font-mono tracking-widest uppercase mb-6 ${theme.accent}`}>Key Features</h3>
                <ul className="space-y-4">
                  {project.keyFeatures.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/70 leading-relaxed">
                      <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: theme.glowSolid }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Architecture + Outcome */}
              <div className="flex flex-col gap-8">
                <div className={`rounded-2xl border ${theme.accentBorder} bg-[#0c0a09]/60 p-7 flex-1`}>
                  <h3 className={`text-xs font-mono tracking-widest uppercase mb-4 ${theme.accent}`}>Architecture</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{project.architectureNotes}</p>
                </div>
                <div className={`rounded-2xl border ${theme.accentBorder} bg-[#0c0a09]/60 p-7 flex-1`}>
                  <h3 className={`text-xs font-mono tracking-widest uppercase mb-4 ${theme.accent}`}>Outcome</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{project.outcome}</p>
                </div>
              </div>
            </div>

            {/* Mobile action buttons (visible only below sm) */}
            <div className="flex flex-wrap gap-3 sm:hidden">
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-sm font-bold border ${theme.accentBorder} ${theme.accentBg} ${theme.accent}`}>
                  Live Demo <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
              {project.apkUrl && (
                <a href={project.apkUrl} target="_blank" rel="noopener noreferrer"
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-sm font-bold border ${theme.accentBorder} ${theme.accentBg} ${theme.accent}`}>
                  APK <Download className="w-3.5 h-3.5" />
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-sm font-bold border border-white/10 bg-white/5 text-white/70">
                  GitHub <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {/* Bottom breathing room */}
            <div className="h-2" />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
