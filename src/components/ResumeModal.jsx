import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Brain, Code2 } from 'lucide-react';
import { useResumeModal } from '../context/ResumeModalContext';

const OPTIONS = [
  {
    key: 'ai',
    icon: Brain,
    title: 'AI & Research',
    subtitle: 'Agentic Workflows · LLMs · ML Pipelines · NLP',
    description: 'Best for roles in AI engineering, research, or agentic system building.',
    href: '/charansResume1.pdf',
    accentFrom: 'from-violet-500/15',
    accentBorder: 'border-violet-500/25',
    accentText: 'text-violet-400',
    accentBg: 'bg-violet-500/10',
    glowColor: 'rgba(139,92,246,0.15)',
    dotColor: 'rgb(139,92,246)',
  },
  {
    key: 'dev',
    icon: Code2,
    title: 'Software Engineering',
    subtitle: 'Full-Stack · Mobile · System Architecture · APIs',
    description: 'Best for roles in product engineering, web, or mobile development.',
    href: '/charansResume2.pdf',
    accentFrom: 'from-cyan-500/15',
    accentBorder: 'border-cyan-500/25',
    accentText: 'text-cyan-400',
    accentBg: 'bg-cyan-500/10',
    glowColor: 'rgba(6,182,212,0.15)',
    dotColor: 'rgb(6,182,212)',
  },
];

export default function ResumeModal() {
  const { isOpen, close } = useResumeModal();

  // Lock scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Esc to close
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="resume-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-md"
            onClick={close}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            key="resume-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Choose your resume"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-[560px] top-1/2 -translate-y-1/2 z-[201] rounded-3xl border border-white/10 bg-[#060a12]/95 backdrop-blur-2xl shadow-2xl overflow-hidden"
            style={{ boxShadow: '0 0 80px rgba(100,100,255,0.08), 0 32px 64px rgba(0,0,0,0.7)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Subtle grid texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:36px_36px]" />

            {/* Header */}
            <div className="relative flex items-start justify-between px-8 pt-8 pb-2">
              <div>
                <p className="text-xs font-mono tracking-widest uppercase text-white/30 mb-2">Choose your path</p>
                <h2 className="text-2xl font-extrabold text-white leading-tight">Which version would<br />you like to see?</h2>
              </div>
              <button
                onClick={close}
                className="mt-1 w-9 h-9 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all shrink-0"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Options */}
            <div className="relative flex flex-col gap-4 px-8 py-7">
              {OPTIONS.map((opt) => {
                const Icon = opt.icon;
                return (
                  <a
                    key={opt.key}
                    href={opt.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={close}
                    className={`group relative flex items-start gap-5 rounded-2xl border ${opt.accentBorder} bg-gradient-to-br ${opt.accentFrom} to-transparent p-6 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110`}
                    style={{ boxShadow: `0 4px 24px ${opt.glowColor}` }}
                  >
                    {/* Icon badge */}
                    <div
                      className={`mt-0.5 shrink-0 w-11 h-11 rounded-xl ${opt.accentBg} border ${opt.accentBorder} flex items-center justify-center`}
                    >
                      <Icon className={`w-5 h-5 ${opt.accentText}`} />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-base font-extrabold ${opt.accentText}`}>{opt.title}</span>
                        <span
                          className="inline-block w-1.5 h-1.5 rounded-full"
                          style={{ background: opt.dotColor }}
                        />
                      </div>
                      <p className="text-xs font-mono text-white/40 mb-2 leading-relaxed">{opt.subtitle}</p>
                      <p className="text-sm text-white/60 leading-relaxed">{opt.description}</p>
                    </div>

                    {/* Arrow */}
                    <ArrowUpRight className={`shrink-0 w-4 h-4 mt-1 ${opt.accentText} opacity-40 group-hover:opacity-100 transition-opacity`} />
                  </a>
                );
              })}
            </div>

            {/* Footer note */}
            <p className="text-center text-xs text-white/20 font-mono pb-7 px-8">
              Both resumes open in a new tab as PDF
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
