import React from 'react';
import { motion } from 'framer-motion';
import { GiTrophyCup } from 'react-icons/gi';
import { PiMedalFill } from 'react-icons/pi';
import { RiAwardLine } from 'react-icons/ri';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen w-full bg-bg text-txt font-sans relative pb-24 md:pb-0">
      {/* Availability Marker */}
      <div className="fixed top-6 left-6 md:top-8 md:left-10 z-50 group pointer-events-auto">
        <a
          href="#contact"
          className="font-mono text-2xl font-black tracking-tighter text-white hover:text-accent transition-colors duration-300 mix-blend-difference"
        >
          .open
        </a>
        <span className="absolute top-full left-0 mt-3 whitespace-nowrap rounded-xl border border-accent/20 bg-bg2/90 px-3 py-2 text-xs font-mono text-txt-mid opacity-0 shadow-2xl backdrop-blur-xl transition-all duration-300 pointer-events-none translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
          Open to internships / freelance / full-time
        </span>
      </div>

      {/* Navigation Dock */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />

        {/* About Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-28 bg-bg relative" id="about">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <div className="pr-0 lg:pr-10">
              <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">About Me</h2>
              <div className="h-1.5 w-24 bg-gradient-to-r from-accent to-purple-500 rounded-full mb-10"></div>

              <div className="pl-6 border-l-2 border-accent/30 space-y-8">
                <p className="text-xl md:text-2xl text-txt-mid leading-relaxed font-medium">
                  I'm Sri Ram Charan Nalla, a 3rd year AI & ML student at SRKR Engineering College. I work across full-stack web development, machine learning, and agentic AI systems.
                </p>
                <p className="text-lg md:text-xl text-txt-dim leading-relaxed">
                  I like building complete products: React frontends, Node.js and FastAPI services, Flutter apps, ML pipelines, and LLM-powered agents that can reason through workflows instead of just responding to prompts. I care about reliable architecture, clean implementation, and AI features that are useful in real product contexts.
                </p>
              </div>
            </div>

            <div className="relative mt-12 lg:mt-0">
              {/* Subtle background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/5 blur-[100px] rounded-full -z-10 pointer-events-none mix-blend-screen"></div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-bg2/80 backdrop-blur-md border border-white/5 p-8 rounded-3xl text-center hover:-translate-y-2 hover:border-accent/50 hover:shadow-[0_20px_40px_-15px_rgba(59,158,255,0.3)] transition-all duration-500 group">
                  <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-4 group-hover:from-accent group-hover:to-purple-400 transition-all">Full-Stack</div>
                  <div className="text-xs tracking-widest text-txt-dim font-mono uppercase">React / Node / FastAPI</div>
                </div>
                <div className="bg-bg2/80 backdrop-blur-md border border-white/5 p-8 rounded-3xl text-center hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.3)] transition-all duration-500 group">
                  <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-4 group-hover:from-purple-400 group-hover:to-pink-400 transition-all">AI / ML</div>
                  <div className="text-xs tracking-widest text-txt-dim font-mono uppercase">Vision / NLP / Agents</div>
                </div>
                <div className="bg-bg2/80 backdrop-blur-md border border-white/5 p-8 rounded-3xl text-center hover:-translate-y-2 hover:border-emerald-500/50 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.3)] transition-all duration-500 group">
                  <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-4 group-hover:from-emerald-400 group-hover:to-cyan-400 transition-all">8.87</div>
                  <div className="text-xs tracking-widest text-txt-dim font-mono uppercase">Current CGPA</div>
                </div>
                <div className="bg-bg2/80 backdrop-blur-md border border-white/5 p-8 rounded-3xl text-center hover:-translate-y-2 hover:border-rose-500/50 hover:shadow-[0_20px_40px_-15px_rgba(244,63,94,0.3)] transition-all duration-500 group relative">
                  <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-4 group-hover:from-rose-400 group-hover:to-orange-400 transition-all">∞</div>
                  <div className="text-xs tracking-widest text-txt-dim font-mono uppercase">Learning Loop</div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Section Divider */}
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>
        </div>

        <Projects />

        {/* Experience & Achievements */}
        {/* Section Divider */}
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>
        </div>

        <section className="max-w-7xl mx-auto px-6 md:px-12 py-28 bg-bg relative" id="experience">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Experience & Achievements</h2>
            <div className="h-1 w-20 bg-accent rounded-full mb-12"></div>

            <div className="grid lg:grid-cols-2 gap-16">
              {/* Experience Timeline */}
              <div>
                <h3 className="text-2xl font-mono text-txt-mid mb-8 flex items-center gap-3">
                  <span className="text-accent">/</span> Career Track
                </h3>
                <div className="relative pl-8 border-l border-white/10 space-y-12 ml-4">

                  {/* Experience 1 */}
                  <div className="relative group">
                    <div className="absolute -left-[41px] top-1.5 h-4 w-4 rounded-full bg-bg border-2 border-accent group-hover:scale-125 group-hover:bg-accent transition-all duration-300 shadow-[0_0_10px_rgba(59,158,255,0.5)]"></div>
                    <div className="bg-bg2 border border-white/5 p-8 rounded-3xl group-hover:border-accent/30 transition-all duration-300 shadow-2xl">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent font-mono text-xs mb-6 border border-accent/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                        Mar 2025 – Jun 2025
                      </div>
                      <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-accent transition-colors">AI Intern</h4>
                      <div className="text-txt-mid font-medium mb-6">Adverk Technologies Pvt. Ltd. · Remote</div>
                      <ul className="text-txt-dim space-y-4">
                        <li className="flex items-start gap-3">
                          <span className="text-accent mt-1">▹</span>
                          <span className="leading-relaxed">Built and evaluated supervised ML models for car price prediction and credit-risk style datasets</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-accent mt-1">▹</span>
                          <span className="leading-relaxed">Prepared datasets, handled preprocessing, and compared model performance using standard evaluation metrics</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-accent mt-1">▹</span>
                          <span className="leading-relaxed">Created Power BI dashboards for sales and inventory analysis, turning raw data into cleaner operational reports</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                </div>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-2xl font-mono text-txt-mid mb-8 flex items-center gap-3">
                  <span className="text-accent">/</span> Hall of Fame
                </h3>
                <div className="flex flex-col gap-6">

                  {/* Ach 1 */}
                  <div className="bg-bg2 border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(250,204,21,0.15)]">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-yellow-400 to-yellow-600"></div>
                    <div className="absolute -right-4 -top-4 text-yellow-400/5 group-hover:text-yellow-400/10 transition-colors duration-500">
                      <GiTrophyCup className="text-9xl transform -rotate-12" />
                    </div>
                    <div className="relative z-10">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-400/10 text-yellow-400 font-bold text-xs mb-5 border border-yellow-400/20">
                        <GiTrophyCup className="text-sm" /> National Winner
                      </div>
                      <h4 className="text-xl font-bold text-white mb-3">Text Sprouts, E-Summit 2K26</h4>
                      <p className="text-txt-dim leading-relaxed">1st place, National Level Project Expo — Developed an innovative Supply Chain Management solution.</p>
                    </div>
                  </div>

                  {/* Ach 2 */}
                  <div className="bg-bg2 border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(148,163,184,0.15)]">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-slate-300 to-slate-500"></div>
                    <div className="absolute -right-4 -top-4 text-slate-300/5 group-hover:text-slate-300/10 transition-colors duration-500">
                      <PiMedalFill className="text-9xl transform -rotate-12" />
                    </div>
                    <div className="relative z-10">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-300/10 text-slate-300 font-bold text-xs mb-5 border border-slate-300/20">
                        <PiMedalFill className="text-sm" /> National Runner-up
                      </div>
                      <h4 className="text-xl font-bold text-white mb-3">Smart India Hackathon 2025</h4>
                      <p className="text-txt-dim leading-relaxed">National level finalist (Dehradun) — Awarded for innovative problem-solving under extreme time constraints.</p>
                    </div>
                  </div>

                  {/* Ach 3 */}
                  <div className="bg-bg2 border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(217,119,6,0.15)]">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-amber-500 to-amber-700"></div>
                    <div className="absolute -right-4 -top-4 text-amber-500/5 group-hover:text-amber-500/10 transition-colors duration-500">
                      <RiAwardLine className="text-9xl transform -rotate-12" />
                    </div>
                    <div className="relative z-10">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-500 font-bold text-xs mb-5 border border-amber-500/20">
                        <RiAwardLine className="text-sm" /> Finalist
                      </div>
                      <h4 className="text-xl font-bold text-white mb-3">Prajwalan 2025</h4>
                      <p className="text-txt-dim leading-relaxed">Recognized as a top national team — Praised for complex solution architecture and rapid prototype implementation.</p>
                    </div>
                  </div>

                  {/* Ach 4 */}
                  <div className="bg-bg2 border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(14,165,233,0.15)]">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-sky-400 to-sky-600"></div>
                    <div className="absolute -right-4 -top-4 text-sky-400/5 group-hover:text-sky-400/10 transition-colors duration-500">
                      <RiAwardLine className="text-9xl transform -rotate-12" />
                    </div>
                    <div className="relative z-10">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-400/10 text-sky-400 font-bold text-xs mb-5 border border-sky-400/20">
                        <RiAwardLine className="text-sm" /> Selected Participant
                      </div>
                      <h4 className="text-xl font-bold text-white mb-3">IDE Bootcamp 2026 (Phase 1)</h4>
                      <p className="text-txt-dim leading-relaxed">Selected for an intensive 5-day national initiative — Focused on design thinking, product commercialization, and entrepreneurial pitching.</p>
                    </div>
                  </div>

                  {/* Ach 5 */}
                  <div className="bg-bg2 border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.15)]">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-blue-500 to-blue-700"></div>
                    <div className="absolute -right-4 -top-4 text-blue-500/5 group-hover:text-blue-500/10 transition-colors duration-500">
                      <RiAwardLine className="text-9xl transform -rotate-12" />
                    </div>
                    <div className="relative z-10">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-400 font-bold text-xs mb-5 border border-blue-500/20">
                        <RiAwardLine className="text-sm" /> National Participant
                      </div>
                      <h4 className="text-xl font-bold text-white mb-3">NHIDE 2026</h4>
                      <p className="text-txt-dim leading-relaxed">Competed in the National Hackathon on Innovation, Design, and Entrepreneurship (Bilaspur) — Rapidly prototyped and presented an innovative technical solution.</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Section Divider */}
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>
        </div>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
