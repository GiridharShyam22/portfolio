import React from 'react';
import { ArrowUpRight, BriefcaseBusiness, Mail, Send } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);

export default function Contact() {
  return (
    <section id="contact" className="py-28 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="relative"
      >
        <div className="absolute inset-x-8 top-10 h-48 rounded-full bg-accent/10 blur-[90px] -z-10 pointer-events-none"></div>

        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-bg2/80 shadow-2xl backdrop-blur-2xl">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative p-8 md:p-12 lg:p-16">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-cyan-300 to-emerald-300"></div>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-accent">
                <BriefcaseBusiness className="h-4 w-4" /> Available for work
              </div>

              <h2 className="max-w-3xl text-4xl font-black leading-tight text-white md:text-6xl">
                Let's build something useful.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-txt-mid md:text-xl">
                I'm open to internships, freelance builds, and full-time roles across full-stack development, ML-backed product features, Flutter apps, and agentic AI workflows.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a href="mailto:nvsk72@gmail.com" className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-accent px-6 py-4 text-base font-extrabold text-white shadow-[0_0_36px_rgba(59,158,255,0.35)] transition-all duration-300 hover:-translate-y-1 hover:brightness-110 sm:w-auto">
                  <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  Email me
                </a>
                <a href="/CharansResume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-base font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/10 sm:w-auto">
                  Resume <ArrowUpRight className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div className="border-t border-white/10 bg-bg/60 p-8 md:p-12 lg:border-l lg:border-t-0">
              <div className="rounded-3xl border border-white/10 bg-bg2/70 p-6">
                <div className="text-xs font-mono uppercase tracking-widest text-txt-dim">Direct contact</div>
                <a href="mailto:nvsk72@gmail.com" className="mt-3 flex items-center gap-3 break-all text-lg font-black text-white transition-colors hover:text-accent">
                  <Mail className="h-5 w-5 shrink-0 text-accent" /> nvsk72@gmail.com
                </a>
                <p className="mt-4 text-sm leading-relaxed text-txt-dim">
                  Send the role, project idea, timeline, and what outcome you need. I’ll reply with a clear next step.
                </p>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <a href="https://linkedin.com/in/nsrcharan" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-bg2/70 px-5 py-4 text-sm font-bold text-white transition-all duration-300 hover:border-[#0A66C2]/50 hover:bg-white/5">
                  <span className="flex items-center gap-3"><span className="text-txt-dim transition-colors group-hover:text-[#0A66C2]"><LinkedinIcon /></span> LinkedIn</span>
                  <ArrowUpRight className="h-4 w-4 text-txt-dim" />
                </a>
                <a href="https://github.com/Charan512" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-bg2/70 px-5 py-4 text-sm font-bold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5">
                  <span className="flex items-center gap-3"><span className="text-txt-dim transition-colors group-hover:text-white"><GithubIcon /></span> GitHub</span>
                  <ArrowUpRight className="h-4 w-4 text-txt-dim" />
                </a>
                <a href="https://www.instagram.com/me_nsrc/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-bg2/70 px-5 py-4 text-sm font-bold text-white transition-all duration-300 hover:border-[#E1306C]/50 hover:bg-white/5">
                  <span className="flex items-center gap-3"><FaInstagram className="h-5 w-5 text-txt-dim transition-colors group-hover:text-[#E1306C]" /> Instagram</span>
                  <ArrowUpRight className="h-4 w-4 text-txt-dim" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
