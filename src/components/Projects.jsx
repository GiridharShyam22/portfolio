import React, { useState, useEffect, useRef } from 'react';
import { projects } from '../data/projects';
import { GiPlantSeed, GiBrain, GiPayMoney, GiTrophyCup, GiHealthNormal, GiRadarCrossSection } from 'react-icons/gi';

const projectThemes = {
  6: { // TalentRadar
    icon: GiRadarCrossSection,
    gradient: "from-amber-500/10 to-transparent",
    border: "group-hover:border-amber-500/50",
    text: "group-hover:text-amber-400",
    tagText: "text-amber-400/50",
    shadow: "hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.3)]",
    iconColor: "text-amber-500",
  },
  1: { // AyuSethu (Agriculture)
    icon: GiPlantSeed,
    gradient: "from-emerald-500/10 to-transparent",
    border: "group-hover:border-emerald-500/50",
    text: "group-hover:text-emerald-400",
    tagText: "text-emerald-400/50",
    shadow: "hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.3)]",
    iconColor: "text-emerald-500",
  },
  2: { // SmartSpend (Finance)
    icon: GiPayMoney,
    gradient: "from-cyan-500/10 to-transparent",
    border: "group-hover:border-cyan-500/50",
    text: "group-hover:text-cyan-400",
    tagText: "text-cyan-400/50",
    shadow: "hover:shadow-[0_20px_40px_-15px_rgba(6,182,212,0.3)]",
    iconColor: "text-cyan-500",
  },
  3: { // Soul Connect (Mental Health)
    icon: GiBrain,
    gradient: "from-rose-500/10 to-transparent",
    border: "group-hover:border-rose-500/50",
    text: "group-hover:text-rose-400",
    tagText: "text-rose-400/50",
    shadow: "hover:shadow-[0_20px_40px_-15px_rgba(244,63,94,0.3)]",
    iconColor: "text-rose-500",
  },
  4: { // Prajwalan (Hackathon)
    icon: GiTrophyCup,
    gradient: "from-violet-500/10 to-transparent",
    border: "group-hover:border-violet-500/50",
    text: "group-hover:text-violet-400",
    tagText: "text-violet-400/50",
    shadow: "hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.3)]",
    iconColor: "text-violet-500",
  },
  5: { // Mana Hospitals (Health)
    icon: GiHealthNormal,
    gradient: "from-sky-500/10 to-transparent",
    border: "group-hover:border-sky-500/50",
    text: "group-hover:text-sky-400",
    tagText: "text-sky-400/50",
    shadow: "hover:shadow-[0_20px_40px_-15px_rgba(14,165,233,0.3)]",
    iconColor: "text-sky-500",
  }
};

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const stickyTop = window.innerHeight * 0.15; // 15vh
      let current = 0;

      cardRefs.current.forEach((ref, i) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          // A card is "active" when its wrapper top has scrolled past the sticky threshold
          if (rect.top <= stickyTop + 50) {
            current = i;
          }
        }
      });

      setActiveIndex(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="projects" className="relative z-10">
      <div className="max-w-5xl mx-auto px-6 md:px-12 pt-28 pb-8">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Projects</h2>
        <div className="h-1 w-20 bg-accent rounded-full"></div>
      </div>

      {/* Sticky Scroll Counter — lives outside the header so it persists */}
      <div className="sticky top-[15vh] z-50 hidden md:block pointer-events-none">
        <div className="absolute right-8 lg:right-12 top-0 font-mono tracking-widest pointer-events-auto">
          <div className="bg-bg2/80 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-5 flex flex-col items-center gap-1 shadow-2xl">
            <span className="text-white text-2xl font-bold">{String(activeIndex + 1).padStart(2, '0')}</span>
            <div className="w-4 h-px bg-accent/50"></div>
            <span className="text-txt-dim text-sm">{String(projects.length).padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 md:gap-32 pb-32">
        {projects.map((project, index) => {
          const theme = projectThemes[project.id];
          const Icon = theme.icon;

          return (
          <div
            key={project.id}
            ref={(el) => (cardRefs.current[index] = el)}
            data-index={index}
            className="relative md:sticky md:top-[15vh] mb-8 md:mb-0 transition-transform duration-500"
            style={{ zIndex: 10 + index }}
          >
            <div className={`bg-bg2 border border-white/10 rounded-3xl p-6 md:p-12 max-w-5xl mx-auto h-[550px] md:h-[420px] flex flex-col justify-between relative overflow-hidden group transition-all duration-500 shadow-2xl bg-opacity-95 backdrop-blur-xl hover:-translate-y-2 ${theme.border} ${theme.shadow}`}>
              
              {/* Massive Watermark Icon */}
              <div className={`absolute -right-8 -top-8 opacity-5 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none transform -rotate-12 ${theme.iconColor}`}>
                <Icon className="text-[280px]" />
              </div>

              {/* Thematic gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-txt-dim font-mono text-sm tracking-wider uppercase mb-1 block">{project.year}</span>
                    <h3 className={`text-3xl md:text-4xl font-extrabold text-white mt-1 transition-colors duration-300 ${theme.text}`}>
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-4 md:mt-0">
                    {project.demoUrl && (
                      <a 
                        href={project.demoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
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
                        className={`px-4 md:px-5 py-2 text-xs md:text-sm font-bold tracking-wide rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-2 ${theme.text}`}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download APK
                      </a>
                    )}
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className={`opacity-40 hover:opacity-100 transition-opacity p-2 ${theme.iconColor} hover:brightness-150`}>
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                    </a>
                  </div>
                </div>
                
                <p className="text-txt-mid text-xl leading-relaxed mb-8 max-w-3xl font-medium">
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
  );
}
