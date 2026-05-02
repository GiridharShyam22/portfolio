import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import ProfileCard from '../reactbits/ProfileCard';
import EvilEye from '../reactbits/EvilEye';
import StarBorder from '../reactbits/StarBorder';
import heroImg from '../assets/hero.jpg';
import { useResumeModal } from '../context/ResumeModalContext';

const allSkills = ['React.js', 'Node.js', 'FastAPI', 'Flutter', 'TensorFlow', 'PostgreSQL', 'MongoDB', 'React Native', 'Scikit-Learn', 'Power BI'];
const VISIBLE_COUNT = 6;

function HeroResumeButton() {
  const { open } = useResumeModal();
  return (
    <button
      onClick={open}
      className="px-8 py-4 rounded-xl bg-accent text-white font-bold hover:brightness-110 transition-all shadow-[0_0_30px_rgba(59,158,255,0.3)] hover:shadow-[0_0_40px_rgba(59,158,255,0.5)] flex items-center gap-2"
      style={{ textShadow: 'none' }}
    >
      View Resume ↗
    </button>
  );
}

export default function Hero() {
  const [showAll, setShowAll] = useState(false);
  const visibleSkills = showAll ? allSkills : allSkills.slice(0, VISIBLE_COUNT);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 pb-48 px-6 md:px-12 overflow-hidden">

      {/* EvilEye — full-screen background, visible and dominant */}
      <div className="absolute inset-0 z-0">
        <EvilEye
          eyeColor="#3b9eff"
          intensity={0.6}
          pupilSize={1.25}
          irisWidth={0.15}
          glowIntensity={0.4}
          scale={0.75}
          noiseScale={1.5}
          pupilFollow={1.4}
          flameSpeed={1.0}
          backgroundColor="#03060e"
        />
      </div>

      {/* Left-side vignette — fades from solid bg to transparent so text is readable */}
      <div 
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(to right, #03060e 5%, rgba(3,6,14,0.85) 25%, rgba(3,6,14,0.4) 50%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-[2]">

        {/* Text Content — clean typography with text-shadow for contrast */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-10"
          style={{ textShadow: '0 2px 20px rgba(3,6,14,0.8)' }}
        >
          <div className="font-mono text-accent text-sm tracking-widest uppercase">
            // full-stack developer · ml engineer · agentic ai builder
          </div>

          <h1 className="text-4xl md:text-7xl font-extrabold tracking-normal leading-tight md:leading-snug" style={{ textShadow: '0 4px 30px rgba(3,6,14,0.9)' }}>
            Sri Ram <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400" style={{ textShadow: 'none' }}>Charan.</span>
          </h1>

          <p className="text-lg md:text-xl text-txt-mid max-w-2xl leading-loose">
            I build web products, ML-backed systems, and agentic AI workflows end to end. My work connects React interfaces, Node.js and FastAPI backends, Python ML pipelines, Flutter apps, and LLM agents into usable products.
          </p>

          {/* Skill Chips */}
          <div className="flex flex-wrap gap-3 mt-2 items-center">
            {visibleSkills.map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                style={{ textShadow: 'none' }}
              >
                <StarBorder
                  as="div"
                  color="#3b9eff"
                  speed={`${3 + (i % 4)}s`}
                  thickness={1.5}
                  innerClass="px-4 py-2 bg-bg2/80 backdrop-blur-md text-sm font-mono text-txt-mid hover:text-accent transition-all duration-300"
                >
                  {skill}
                </StarBorder>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ textShadow: 'none' }}
            >
              <StarBorder
                as="button"
                color="#a855f7"
                speed="4s"
                thickness={1.5}
                onClick={() => setShowAll(!showAll)}
                innerClass="px-4 py-2 bg-bg2/80 backdrop-blur-md text-sm font-mono text-accent hover:bg-accent/10 transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
              >
                {showAll ? 'Less' : `+${allSkills.length - VISIBLE_COUNT} more`}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
              </StarBorder>
            </motion.div>
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            <HeroResumeButton />
            <a href="#projects" className="px-8 py-4 rounded-xl bg-bg2/80 backdrop-blur-md border border-accent-dim/50 text-txt font-bold hover:bg-bg3 hover:border-accent-dim transition-all flex items-center gap-2" style={{ textShadow: 'none' }}>
              View Projects
            </a>
          </div>
        </motion.div>

        {/* ProfileCard — sits naturally on the right, eye shows through behind it */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center lg:justify-end h-[420px] md:h-[540px] w-full"
        >
          <ProfileCard
            name="Sri Ram Charan Nalla"
            title="Full-Stack, ML & Agentic AI"
            handle="Charan512"
            status="Open to Work"
            contactText="Hire Me"
            avatarUrl={heroImg}
            miniAvatarUrl="/favicon.svg"
            showUserInfo={true}
            enableTilt={true}
            onContactClick={() => window.location.href = '#contact'}
          />
        </motion.div>

      </div>

      {/* Scroll Down Indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-txt-dim hover:text-accent transition-colors cursor-pointer z-20"
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.a>
    </section>
  );
}
