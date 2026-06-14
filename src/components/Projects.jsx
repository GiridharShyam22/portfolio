import { useState, useEffect, useRef } from 'react';
import { projects } from '../data/projects';
import { AnimatePresence } from 'framer-motion';
import ProjectDetailModal from './ProjectDetailModal';

const projectThemes = {
  6: { // TalentRadar
    logo: '/logos/talentradar.png',
    gradient: "from-amber-500/10 to-transparent",
    border: "group-hover:border-amber-500/50",
    text: "group-hover:text-amber-400",
    tagText: "text-amber-400/50",
    shadow: "hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.3)]",
    iconColor: "text-amber-500",
  },
  1: { // Trading Pulse AI
    logo: '/logos/tradingpulse.svg',
    gradient: "from-blue-600/10 to-transparent",
    border: "group-hover:border-blue-500/50",
    text: "group-hover:text-blue-400",
    tagText: "text-blue-400/50",
    shadow: "hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.25)]",
    iconColor: "text-blue-500",
  },
  2: { // SmartSpend (Finance)
    logo: '/logos/smartspend.png',
    gradient: "from-teal-600/10 to-transparent",
    border: "group-hover:border-teal-500/50",
    text: "group-hover:text-teal-400",
    tagText: "text-teal-400/50",
    shadow: "hover:shadow-[0_20px_40px_-15px_rgba(20,184,166,0.25)]",
    iconColor: "text-teal-500",
  },
  3: { // Soul Connect (Mental Health)
    logo: '/logos/soulconnect.png',
    gradient: "from-orange-600/10 to-transparent",
    border: "group-hover:border-orange-400/50",
    text: "group-hover:text-orange-400",
    tagText: "text-orange-400/50",
    shadow: "hover:shadow-[0_20px_40px_-15px_rgba(251,146,60,0.25)]",
    iconColor: "text-orange-500",
  },
  4: { // Prajwalan (Hackathon)
    logo: '/logos/prajwalan.png',
    gradient: "from-rose-700/10 to-transparent",
    border: "group-hover:border-rose-500/50",
    text: "group-hover:text-rose-400",
    tagText: "text-rose-400/50",
    shadow: "hover:shadow-[0_20px_40px_-15px_rgba(244,63,94,0.25)]",
    iconColor: "text-rose-500",
  },
  5: { // Mana Hospitals (Health)
    logo: '/logos/manahospitals.png',
    gradient: "from-stone-500/10 to-transparent",
    border: "group-hover:border-stone-400/50",
    text: "group-hover:text-stone-300",
    tagText: "text-stone-400/50",
    shadow: "hover:shadow-[0_20px_40px_-15px_rgba(168,162,158,0.25)]",
    iconColor: "text-stone-400",
  }
};

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const stickyTop = window.innerHeight * 0.15;
      let current = 0;
      cardRefs.current.forEach((ref, i) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (rect.top <= stickyTop + 50) current = i;
        }
      });
      setActiveIndex(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <section id="projects" className="relative z-10">
        <div className="max-w-5xl mx-auto px-6 md:px-12 pt-28 pb-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Projects</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-accent to-amber-400 rounded-full" />
        </div>

        {/* Sticky Scroll Counter */}
        <div className="sticky top-[15vh] z-50 hidden xl:block pointer-events-none">
          <div className="absolute right-8 lg:right-12 top-0 font-mono tracking-widest pointer-events-auto">
            <div className="bg-bg2/80 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-5 flex flex-col items-center gap-1 shadow-2xl">
              <span className="text-white text-2xl font-bold">{String(activeIndex + 1).padStart(2, '0')}</span>
              <div className="w-4 h-px bg-accent/50" />
              <span className="text-txt-dim text-sm">{String(projects.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 md:gap-32 pb-32">
          {projects.map((project, index) => {
            const theme = projectThemes[project.id];

            return (
              <div
                key={project.id}
                ref={(el) => (cardRefs.current[index] = el)}
                data-index={index}
                className="relative md:sticky md:top-[15vh] mb-8 md:mb-0 transition-transform duration-500"
                style={{ zIndex: 10 + index }}
              >
                {/* Clickable card — opens modal */}
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${project.title} case study`}
                  onClick={() => setSelectedProject(project)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedProject(project); }}
                  className={`bg-bg2 border border-white/10 rounded-3xl p-5 md:p-12 max-w-5xl mx-auto min-h-[420px] md:h-[420px] flex flex-col justify-between relative overflow-hidden group transition-all duration-500 shadow-2xl bg-opacity-95 backdrop-blur-xl hover:-translate-y-2 cursor-pointer ${theme.border} ${theme.shadow}`}
                >
                  {/* Massive Watermark Logo */}
                  <div className="absolute -right-4 -top-4 w-[280px] h-[280px] opacity-[0.07] group-hover:opacity-[0.18] transition-opacity duration-700 pointer-events-none -rotate-12">
                    <img src={theme.logo} alt="" className="w-full h-full object-contain" draggable={false} />
                  </div>

                  {/* Thematic gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                  {/* "View case study" hover pill */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 pointer-events-none">
                    <span className="text-xs font-mono tracking-widest uppercase bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-4 py-2 text-white/70">
                      View case study
                    </span>
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                      <div>
                        <span className="text-txt-dim font-mono text-xs tracking-wider uppercase mb-1 block">{project.year}</span>
                        <h3 className={`text-2xl md:text-4xl font-extrabold text-white mt-1 transition-colors duration-300 ${theme.text}`}>
                          {project.title}
                        </h3>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-0">
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={`px-4 md:px-5 py-2 text-xs md:text-sm font-bold tracking-wide rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-2 ${theme.text}`}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Live Demo
                          </a>
                        )}
                        {project.apkUrl && (
                          <a
                            href={project.apkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={`px-4 md:px-5 py-2 text-xs md:text-sm font-bold tracking-wide rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-2 ${theme.text}`}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download APK
                          </a>
                        )}
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={`opacity-40 hover:opacity-100 transition-opacity p-2 ${theme.iconColor} hover:brightness-150`}
                        >
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                          </svg>
                        </a>
                      </div>
                    </div>

                    <p className="text-txt-mid text-base md:text-xl leading-relaxed mb-4 md:mb-8 max-w-3xl font-medium">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-3 mt-auto">
                      {project.tags.map(tag => (
                        <span key={tag} className={`px-4 py-2 text-xs font-mono rounded-xl bg-bg3 border border-white/5 transition-all duration-300 group-hover:border-white/10 hover:!border-current ${theme.tagText} ${theme.text}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Modal — rendered outside section to avoid stacking context issues */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            key={selectedProject.id}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
