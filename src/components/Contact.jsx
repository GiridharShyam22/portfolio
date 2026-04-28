import React from 'react';
import { Mail } from 'lucide-react';
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
    <section id="contact" className="py-32 px-6 md:px-12 max-w-6xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="relative group"
      >
        {/* Glow Aura */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-purple-500/20 to-pink-500/20 blur-[100px] -z-10 rounded-[3rem] opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

        <div className="bg-bg2/90 backdrop-blur-2xl border border-white/10 p-12 md:p-24 rounded-[3rem] text-center shadow-2xl overflow-hidden relative">
          
          {/* Watermark Icon */}
          <div className="absolute -right-20 -bottom-20 text-accent/5 pointer-events-none transform -rotate-12 group-hover:scale-110 transition-transform duration-1000">
            <Mail className="w-96 h-96" />
          </div>

          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/30">
              Let's build something useful.
            </h2>
            <p className="text-xl md:text-2xl text-txt-mid mb-6 max-w-2xl mx-auto font-medium">
              I'm available for full-stack development, ML-backed product features, Flutter apps, and practical UI builds.
            </p>
            <p className="text-sm md:text-base text-txt-dim mb-16">
              Send a brief note about the project, timeline, and expected outcome. I'll reply with a clear next step.
            </p>

            <div className="flex flex-col gap-4 md:gap-5 items-center">
              {/* Primary CTA — full width emphasis */}
              <a href="mailto:nvsk72@gmail.com" className="w-full max-w-lg px-10 py-6 rounded-2xl bg-gradient-to-r from-accent to-purple-600 text-white font-extrabold text-lg hover:brightness-125 transition-all shadow-[0_0_40px_rgba(59,158,255,0.4)] hover:shadow-[0_0_60px_rgba(168,85,247,0.6)] hover:-translate-y-1 flex items-center justify-center gap-3">
                <Mail className="w-6 h-6" /> nvsk72@gmail.com
              </a>
              
              {/* Secondary Buttons — smaller row */}
              <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                <a href="https://linkedin.com/in/nsrcharan" target="_blank" rel="noopener noreferrer" className="px-6 py-4 rounded-2xl bg-bg border border-white/10 text-white font-bold text-sm hover:bg-white/5 hover:border-[#0A66C2]/50 transition-all shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3 group/btn">
                  <div className="text-txt-dim group-hover/btn:text-[#0A66C2] transition-colors"><LinkedinIcon /></div> LinkedIn
                </a>
                <a href="https://github.com/Charan512" target="_blank" rel="noopener noreferrer" className="px-6 py-4 rounded-2xl bg-bg border border-white/10 text-white font-bold text-sm hover:bg-white/5 hover:border-white/50 transition-all shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3 group/btn">
                  <div className="text-txt-dim group-hover/btn:text-white transition-colors"><GithubIcon /></div> GitHub
                </a>
                <a href="https://www.instagram.com/me_nsrc/" target="_blank" rel="noopener noreferrer" className="px-6 py-4 rounded-2xl bg-bg border border-white/10 text-white font-bold text-sm hover:bg-white/5 hover:border-[#E1306C]/50 transition-all shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3 group/btn">
                  <FaInstagram className="w-5 h-5 text-txt-dim group-hover/btn:text-[#E1306C] transition-colors" /> Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
