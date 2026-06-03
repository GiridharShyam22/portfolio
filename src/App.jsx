import { motion } from 'framer-motion';
import { GiTrophyCup } from 'react-icons/gi';
import { RiAwardLine, RiCodeSSlashLine, RiTeamLine, RiRocketLine } from 'react-icons/ri';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import { ResumeModalProvider } from './context/ResumeModalContext';

function App() {
  return (
    <ResumeModalProvider>
    <div className="min-h-screen w-full bg-bg text-txt font-sans relative pb-24 md:pb-0">
      {/* Availability Marker — desktop only to avoid overlapping mobile modals/cards */}
      <div className="hidden md:block fixed top-8 left-10 z-50 group pointer-events-auto">
        <a
          href="#contact"
          className="font-mono text-2xl font-black tracking-tighter text-white hover:text-accent transition-colors duration-300 mix-blend-difference"
        >
          .open
        </a>
        <span className="absolute top-full left-0 mt-3 whitespace-nowrap rounded-xl border border-accent/20 bg-bg2/90 px-3 py-2 text-xs font-mono text-txt-mid opacity-0 shadow-2xl backdrop-blur-xl transition-all duration-300 pointer-events-none translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
          Open to internships / freelance / collaboration
        </span>
      </div>

      {/* Navigation Dock */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />

        {/* About Section */}
        <section className="max-w-7xl mx-auto px-4 md:px-12 py-16 md:py-28 bg-bg relative" id="about">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-start lg:items-center"
          >
            <div className="w-full pr-0 lg:pr-10">
              <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">About Me</h2>
              <div className="h-1.5 w-24 bg-gradient-to-r from-accent to-amber-400 rounded-full mb-10"></div>

              <div className="pl-6 border-l-2 border-accent/30 space-y-8">
                <p className="text-xl md:text-2xl text-txt-mid leading-relaxed font-medium">
                  I'm Giridhar Shyam Samsani — a passionate AI & Machine Learning Developer with experience building intelligent applications using Computer Vision, ML pipelines, and full-stack technologies.
                </p>
                <p className="text-lg md:text-xl text-txt-dim leading-relaxed">
                  I'm dedicated to solving real-world problems through innovative and scalable technology solutions. From training ML models to crafting polished web interfaces, I enjoy building end-to-end systems that make a tangible impact. I actively participate in hackathons and tech events to stay sharp and push boundaries.
                </p>
              </div>
            </div>

            <div className="relative w-full mt-4 lg:mt-0">
              {/* Subtle background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/5 blur-[100px] rounded-full -z-10 pointer-events-none mix-blend-screen"></div>

              <div className="grid grid-cols-2 gap-3 md:gap-6">
                <div className="bg-bg2/80 backdrop-blur-md border border-white/5 p-5 md:p-8 rounded-2xl md:rounded-3xl text-center hover:-translate-y-2 hover:border-accent/50 hover:shadow-[0_20px_40px_-15px_rgba(212,163,115,0.3)] transition-all duration-500 group">
                  <div className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-2 md:mb-4 group-hover:from-accent group-hover:to-amber-300 transition-all">AI / ML</div>
                  <div className="text-[10px] md:text-xs tracking-widest text-txt-dim font-mono uppercase">Vision / NLP / Pipelines</div>
                </div>
                <div className="bg-bg2/80 backdrop-blur-md border border-white/5 p-5 md:p-8 rounded-2xl md:rounded-3xl text-center hover:-translate-y-2 hover:border-amber-600/50 hover:shadow-[0_20px_40px_-15px_rgba(180,130,70,0.3)] transition-all duration-500 group">
                  <div className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-2 md:mb-4 group-hover:from-amber-400 group-hover:to-orange-300 transition-all">Full-Stack</div>
                  <div className="text-[10px] md:text-xs tracking-widest text-txt-dim font-mono uppercase">React / Node / FastAPI</div>
                </div>
                <div className="bg-bg2/80 backdrop-blur-md border border-white/5 p-5 md:p-8 rounded-2xl md:rounded-3xl text-center hover:-translate-y-2 hover:border-orange-700/50 hover:shadow-[0_20px_40px_-15px_rgba(194,149,106,0.3)] transition-all duration-500 group">
                  <div className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-2 md:mb-4 group-hover:from-orange-300 group-hover:to-yellow-300 transition-all">15+</div>
                  <div className="text-[10px] md:text-xs tracking-widest text-txt-dim font-mono uppercase">Hackathons</div>
                </div>
                <div className="bg-bg2/80 backdrop-blur-md border border-white/5 p-5 md:p-8 rounded-2xl md:rounded-3xl text-center hover:-translate-y-2 hover:border-stone-500/50 hover:shadow-[0_20px_40px_-15px_rgba(168,162,158,0.3)] transition-all duration-500 group relative">
                  <div className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-2 md:mb-4 group-hover:from-stone-300 group-hover:to-amber-200 transition-all">∞</div>
                  <div className="text-[10px] md:text-xs tracking-widest text-txt-dim font-mono uppercase">Learning Loop</div>
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Activities & Achievements</h2>
            <div className="h-1 w-20 bg-accent rounded-full mb-12"></div>

            <div className="grid lg:grid-cols-2 gap-16">
              {/* Leadership & Activities */}
              <div>
                <h3 className="text-2xl font-mono text-txt-mid mb-8 flex items-center gap-3">
                  <span className="text-accent">/</span> Leadership
                </h3>
                <div className="relative pl-8 border-l border-white/10 space-y-12 ml-4">

                  {/* GCC Coding Club Coordinator */}
                  <div className="relative group">
                    <div className="absolute -left-[41px] top-1.5 h-4 w-4 rounded-full bg-bg border-2 border-accent group-hover:scale-125 group-hover:bg-accent transition-all duration-300 shadow-[0_0_10px_rgba(212,163,115,0.5)]"></div>
                    <div className="bg-bg2 border border-white/5 p-8 rounded-3xl group-hover:border-accent/30 transition-all duration-300 shadow-2xl">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent font-mono text-xs mb-6 border border-accent/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                        Ongoing
                      </div>
                      <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-accent transition-colors">Coordinator — GCC Coding Club</h4>
                      <div className="text-txt-mid font-medium mb-6">Technical Leadership</div>
                      <ul className="text-txt-dim space-y-4">
                        <li className="flex items-start gap-3">
                          <span className="text-accent mt-1">▹</span>
                          <span className="leading-relaxed">Coordinating coding activities, technical events, and peer learning initiatives across the college</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-accent mt-1">▹</span>
                          <span className="leading-relaxed">Promoting programming and problem-solving skills among students through workshops and competitions</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-accent mt-1">▹</span>
                          <span className="leading-relaxed">Mentoring peers on DSA, web development, and machine learning fundamentals</span>
                        </li>
                      </ul>
                      <div className="flex flex-wrap gap-2 mt-6">
                        {['Leadership', 'Event Management', 'Mentoring', 'Community Building'].map(tag => (
                          <span key={tag} className="px-2.5 py-1 rounded-full bg-accent/5 border border-accent/15 text-accent font-mono text-[10px] tracking-wide">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Tech Expo Organizer */}
                  <div className="relative group">
                    <div className="absolute -left-[41px] top-1.5 h-4 w-4 rounded-full bg-bg border-2 border-accent group-hover:scale-125 group-hover:bg-accent transition-all duration-300 shadow-[0_0_10px_rgba(212,163,115,0.5)]"></div>
                    <div className="bg-bg2 border border-white/5 p-8 rounded-3xl group-hover:border-accent/30 transition-all duration-300 shadow-2xl">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent font-mono text-xs mb-6 border border-accent/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                        Completed
                      </div>
                      <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-accent transition-colors">Tech Expo Organizer</h4>
                      <div className="text-txt-mid font-medium mb-6">Event Management</div>
                      <ul className="text-txt-dim space-y-4">
                        <li className="flex items-start gap-3">
                          <span className="text-accent mt-1">▹</span>
                          <span className="leading-relaxed">Successfully organized and conducted a college-level Tech Expo with project showcases and technical demonstrations</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-accent mt-1">▹</span>
                          <span className="leading-relaxed">Facilitated student engagement through interactive demos, poster sessions, and live coding challenges</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                </div>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-2xl font-mono text-txt-mid mb-8 flex items-center gap-3">
                  <span className="text-accent">/</span> Recognition
                </h3>
                <div className="space-y-5">

                  {/* Featured: Tackathon Runner-Up */}
                  <div className="relative overflow-hidden rounded-3xl border border-amber-400/15 bg-[linear-gradient(135deg,rgba(28,25,23,0.98),rgba(139,108,71,0.25))] p-6 md:p-7 shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:border-amber-400/35 hover:shadow-[0_24px_50px_-24px_rgba(212,163,115,0.35)]">
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-300 via-accent to-orange-400"></div>
                    <div className="absolute -right-6 -top-8 text-amber-200/10">
                      <GiTrophyCup className="text-[10rem] rotate-12" />
                    </div>
                    <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1.5 text-xs font-bold text-amber-200">
                          Runner-Up
                        </div>
                        <h4 className="text-2xl font-black text-white">Tackathon Communication Competition</h4>
                        <p className="mt-3 max-w-xl text-sm leading-relaxed text-txt-mid md:text-base">
                          Secured Runner-Up position demonstrating strong presentation, teamwork, and communication skills under competitive pressure.
                        </p>
                      </div>
                      <div className="shrink-0 rounded-2xl border border-amber-400/20 bg-white/5 px-4 py-3 text-left sm:text-right">
                        <div className="text-xs font-mono uppercase tracking-widest text-txt-dim">Recognition</div>
                        <div className="mt-1 text-lg font-black text-amber-100">2nd Place</div>
                      </div>
                    </div>
                  </div>

                  {/* Featured: Hackathon Participant */}
                  <div className="relative overflow-hidden rounded-3xl border border-orange-400/15 bg-[linear-gradient(135deg,rgba(28,25,23,0.96),rgba(194,149,106,0.16))] p-6 md:p-7 shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:border-orange-400/35 hover:shadow-[0_24px_50px_-24px_rgba(194,149,106,0.35)]">
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-300 via-amber-300 to-accent"></div>
                    <div className="absolute -right-6 -top-8 text-orange-300/10">
                      <RiRocketLine className="text-[10rem] rotate-12" />
                    </div>
                    <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-400/10 px-3 py-1.5 text-xs font-bold text-orange-300">
                          Active Participant
                        </div>
                        <h4 className="text-2xl font-black text-white">15+ Hackathons</h4>
                        <p className="mt-3 max-w-xl text-sm leading-relaxed text-txt-mid md:text-base">
                          Participated in 15+ monthly hackathons, gaining hands-on experience in innovation, rapid prototyping, teamwork, and problem-solving.
                        </p>
                      </div>
                      <div className="shrink-0 rounded-2xl border border-orange-400/20 bg-orange-400/5 px-4 py-3 text-left sm:text-right">
                        <div className="text-xs font-mono uppercase tracking-widest text-txt-dim">Experience</div>
                        <div className="mt-1 text-lg font-black text-orange-200">15+ Events</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Small Card: GCC Coding Club */}
                    <div className="rounded-2xl border border-white/5 bg-bg2/80 p-5 transition-all duration-300 hover:border-accent/30 hover:bg-bg3/60">
                      <div className="mb-4 flex items-center justify-between gap-4">
                        <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-bold text-accent">Coordinator</span>
                        <RiCodeSSlashLine className="text-2xl text-accent/60" />
                      </div>
                      <h4 className="text-lg font-bold text-white">GCC Coding Club</h4>
                      <p className="mt-2 text-sm leading-relaxed text-txt-dim">Coordinating coding activities and technical events to foster programming culture among students.</p>
                    </div>

                    {/* Small Card: Tech Expo */}
                    <div className="rounded-2xl border border-white/5 bg-bg2/80 p-5 transition-all duration-300 hover:border-amber-600/30 hover:bg-bg3/60">
                      <div className="mb-4 flex items-center justify-between gap-4">
                        <span className="rounded-full border border-amber-600/20 bg-amber-600/10 px-3 py-1 text-xs font-bold text-amber-400">Organizer</span>
                        <RiTeamLine className="text-2xl text-amber-500/60" />
                      </div>
                      <h4 className="text-lg font-bold text-white">Tech Expo</h4>
                      <p className="mt-2 text-sm leading-relaxed text-txt-dim">Organized a college-level Tech Expo with project showcases and technical demonstrations.</p>
                    </div>

                    {/* Small Card: AI/ML Projects */}
                    <div className="rounded-2xl border border-white/5 bg-bg2/80 p-5 transition-all duration-300 hover:border-orange-500/30 hover:bg-bg3/60">
                      <div className="mb-4 flex items-center justify-between gap-4">
                        <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-400">Builder</span>
                        <RiRocketLine className="text-2xl text-orange-500/60" />
                      </div>
                      <h4 className="text-lg font-bold text-white">AI & ML Projects</h4>
                      <p className="mt-2 text-sm leading-relaxed text-txt-dim">Developed multiple projects in AI, ML, Computer Vision, and Full-Stack to solve real-world challenges.</p>
                    </div>

                    {/* Small Card: Problem Solver */}
                    <div className="rounded-2xl border border-white/5 bg-bg2/80 p-5 transition-all duration-300 hover:border-stone-400/30 hover:bg-bg3/60">
                      <div className="mb-4 flex items-center justify-between gap-4">
                        <span className="rounded-full border border-stone-400/20 bg-stone-400/10 px-3 py-1 text-xs font-bold text-stone-300">Innovator</span>
                        <RiAwardLine className="text-2xl text-stone-400/60" />
                      </div>
                      <h4 className="text-lg font-bold text-white">Rapid Prototyping</h4>
                      <p className="mt-2 text-sm leading-relaxed text-txt-dim">Consistent track record of building functional prototypes under time constraints across hackathons and competitions.</p>
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
      <ResumeModal />
    </div>
    </ResumeModalProvider>
  );
}

export default App;
