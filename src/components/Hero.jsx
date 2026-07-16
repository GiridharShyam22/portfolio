import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Zap, Code2, Brain, Globe, Download, ArrowRight } from 'lucide-react';
import { useResumeModal } from '../context/ResumeModalContext';
import heroImg from '../assets/hero.jpg';

const HeroScene = lazy(() => import('./3d/HeroScene'));

/* ── Typewriter Hook ─────────────────────── */
function useTypewriter(words, speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout;
    if (!deleting && charIdx < word.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === word.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    }
    setDisplayed(word.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

const roles = [
  'AI/ML Developer',
  'Full-Stack Engineer',
  'Computer Vision Engineer',
  'Problem Solver',
  'building intelligent systems',
];

const skills = [
  { icon: Brain, label: 'AI & ML', sub: 'TensorFlow · OpenCV · scikit-learn' },
  { icon: Code2, label: 'Full-Stack', sub: 'React · Node · FastAPI' },
  { icon: Globe, label: 'Systems', sub: 'MongoDB · PostgreSQL · Docker' },
  { icon: Zap, label: 'Real-time', sub: 'Socket.io · WebRTC · WebSockets' },
];

/* ════════════════════════════════════════
   HOLOGRAPHIC AVATAR with 3D mouse tilt
════════════════════════════════════════ */
function HoloAvatar({ imgSrc }) {
  const containerRef = useRef(null);
  const glareRef = useRef(null);
  const rafRef = useRef(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  /* smooth spring tilt */
  useEffect(() => {
    const tick = () => {
      currentRotation.current.x +=
        (targetRotation.current.x - currentRotation.current.x) * 0.08;
      currentRotation.current.y +=
        (targetRotation.current.y - currentRotation.current.y) * 0.08;

      if (containerRef.current) {
        containerRef.current.style.transform = `
          perspective(900px)
          rotateX(${currentRotation.current.x}deg)
          rotateY(${currentRotation.current.y}deg)
        `;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    targetRotation.current = { x: -dy * 12, y: dx * 16 };

    /* glare follows cursor */
    if (glareRef.current) {
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      glareRef.current.style.background = `
        radial-gradient(circle at ${px}% ${py}%,
          rgba(255,255,255,0.12) 0%,
          rgba(79,110,247,0.08) 35%,
          transparent 65%
        )
      `;
    }
  };

  const onMouseLeave = () => {
    targetRotation.current = { x: 0, y: 0 };
    if (glareRef.current) glareRef.current.style.background = 'none';
  };

  return (
    <div
      className="relative"
      style={{ width: 'clamp(260px, 36vw, 400px)', height: 'clamp(260px, 36vw, 400px)' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* ── Outer slow ring ── */}
      <div
        className="absolute rounded-full"
        style={{
          inset: '-36px',
          border: '1px solid rgba(79,110,247,0.2)',
          animation: 'orbit-cw 10s linear infinite',
        }}
      >
        {/* dot on ring */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
          style={{
            background: '#00b4ff',
            boxShadow: '0 0 10px #00b4ff, 0 0 20px rgba(0,180,255,0.6)',
          }}
        />
      </div>

      {/* ── Middle dashed ring ── */}
      <div
        className="absolute rounded-full border border-dashed"
        style={{
          inset: '-18px',
          borderColor: 'rgba(124,79,255,0.22)',
          animation: 'orbit-ccw 14s linear infinite',
        }}
      >
        <div
          className="absolute bottom-0 right-1/4 -translate-y-1/2 translate-x-1/2 w-2 h-2 rounded-full"
          style={{
            background: '#7c4fff',
            boxShadow: '0 0 8px #7c4fff',
          }}
        />
      </div>

      {/* ── Inner fast ring ── */}
      <div
        className="absolute rounded-full"
        style={{
          inset: '-6px',
          border: '1px solid rgba(79,110,247,0.12)',
          animation: 'orbit-cw 6s linear infinite',
        }}
      />

      {/* ── Main image card ── */}
      <div
        ref={containerRef}
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d', transition: 'none', willChange: 'transform' }}
      >
        {/* Corner brackets */}
        {[
          { cls: 'top-2 left-2 border-t-2 border-l-2' },
          { cls: 'top-2 right-2 border-t-2 border-r-2' },
          { cls: 'bottom-2 left-2 border-b-2 border-l-2' },
          { cls: 'bottom-2 right-2 border-b-2 border-r-2' },
        ].map(({ cls }, i) => (
          <div
            key={i}
            className={`absolute w-6 h-6 z-20 pointer-events-none ${cls}`}
            style={{ borderColor: 'rgba(79,110,247,0.8)' }}
          />
        ))}

        {/* Photo container */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            boxShadow:
              '0 0 0 1px rgba(79,110,247,0.25), 0 0 50px rgba(79,110,247,0.35), 0 0 100px rgba(29,32,102,0.5), inset 0 0 40px rgba(29,32,102,0.3)',
          }}
        >
          {/* Photo */}
          <img
            src={imgSrc}
            alt="Giridhar Shyam"
            className="w-full h-full object-cover object-top"
            style={{ transform: 'translateZ(0)' }}
          />

          {/* Holographic color overlay */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-screen"
            style={{
              background:
                'linear-gradient(135deg, rgba(79,110,247,0.15) 0%, transparent 40%, rgba(124,79,255,0.1) 80%)',
            }}
          />

          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(79,110,247,0.04) 3px, rgba(79,110,247,0.04) 4px)',
              opacity: 0.8,
            }}
          />

          {/* Glare layer */}
          <div
            ref={glareRef}
            className="absolute inset-0 pointer-events-none rounded-2xl transition-none z-10"
          />

          {/* Bottom vignette */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
            style={{
              background:
                'linear-gradient(to top, rgba(8,11,26,0.7), transparent)',
            }}
          />
        </div>

        {/* Depth layer — "3D depth" effect */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            transform: 'translateZ(-8px)',
            background: 'rgba(79,110,247,0.08)',
            boxShadow: '0 0 40px rgba(79,110,247,0.2)',
          }}
        />
      </div>

      {/* ── Floating badge: Open to work ── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="absolute -top-5 -right-5 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold font-mono z-30"
        style={{
          background: 'linear-gradient(135deg, rgba(8,11,26,0.98), rgba(15,18,48,0.95))',
          border: '1px solid rgba(74,222,128,0.4)',
          boxShadow: '0 0 18px rgba(74,222,128,0.2)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <span
          className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0"
          style={{ boxShadow: '0 0 8px #4ade80', animation: 'pulse-glow-cyan 2s ease-in-out infinite' }}
        />
        <span className="text-green-300">Open to Work</span>
      </motion.div>

      {/* ── Floating badge: Hackathons ── */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="absolute -bottom-5 -left-5 px-3 py-2 rounded-xl text-center z-30"
        style={{
          background: 'linear-gradient(135deg, rgba(8,11,26,0.98), rgba(29,32,102,0.9))',
          border: '1px solid rgba(0,180,255,0.35)',
          boxShadow: '0 0 16px rgba(0,180,255,0.2)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="text-xl font-black" style={{ color: '#00b4ff' }}>15+</div>
        <div className="text-[9px] font-mono uppercase tracking-widest" style={{ color: 'rgba(121,134,203,0.7)' }}>Hackathons</div>
      </motion.div>

      {/* ── Floating badge: Projects ── */}
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute -bottom-5 -right-5 px-3 py-2 rounded-xl text-center z-30"
        style={{
          background: 'linear-gradient(135deg, rgba(8,11,26,0.98), rgba(29,32,102,0.9))',
          border: '1px solid rgba(124,79,255,0.35)',
          boxShadow: '0 0 16px rgba(124,79,255,0.2)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="text-xl font-black" style={{ color: '#a78bfa' }}>5+</div>
        <div className="text-[9px] font-mono uppercase tracking-widest" style={{ color: 'rgba(121,134,203,0.7)' }}>Projects</div>
      </motion.div>

      {/* ── HUD scan line animation ── */}
      <div
        className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-20"
        style={{ inset: '0' }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-100%',
            left: 0,
            right: 0,
            height: '40%',
            background:
              'linear-gradient(to bottom, transparent, rgba(79,110,247,0.04) 50%, transparent)',
            animation: 'hud-scan 4s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  );
}

/* ── Hero Resume Button ── */
function HeroResumeButton() {
  const { open } = useResumeModal();
  return (
    <button
      onClick={open}
      id="hero-resume-btn"
      className="relative group px-7 py-3.5 rounded-xl font-bold text-sm overflow-hidden transition-all duration-300 flex items-center gap-2"
      style={{
        background: 'linear-gradient(135deg, #4f6ef7, #7c4fff)',
        boxShadow: '0 0 30px rgba(79,110,247,0.4), 0 4px 20px rgba(79,110,247,0.3)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow =
          '0 0 45px rgba(79,110,247,0.65), 0 4px 30px rgba(79,110,247,0.5)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow =
          '0 0 30px rgba(79,110,247,0.4), 0 4px 20px rgba(79,110,247,0.3)';
        e.currentTarget.style.transform = '';
      }}
    >
      <Download className="w-4 h-4 text-white" />
      <span className="relative z-10 text-white">View Resume</span>
      <svg
        className="w-4 h-4 text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </button>
  );
}

/* ── Main Hero ─────────────────────────────── */
export default function Hero() {
  const role = useTypewriter(roles, 75, 2000);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-20 px-6 md:px-12 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at 50% 0%, rgba(29,32,102,0.4) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(79,110,247,0.08) 0%, transparent 50%)',
        }}
      />

      {/* Three.js background scene (subtle, behind everything) */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Content grid */}
      <div className="max-w-7xl w-full mx-auto grid md:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">

        {/* ── LEFT: Text Content ─────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-5 order-last md:order-first"
        >
          {/* Status + eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3 flex-wrap"
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold font-mono tracking-wide"
              style={{
                background: 'rgba(74,222,128,0.08)',
                border: '1px solid rgba(74,222,128,0.3)',
                color: '#4ade80',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-green-400"
                style={{ boxShadow: '0 0 8px #4ade80', animation: 'pulse-glow-cyan 2s ease-in-out infinite' }}
              />
              Open to Work
            </div>
            <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(79,110,247,0.6)' }}>
              AI/ML · Full-Stack
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="leading-none tracking-tight"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(2.8rem, 6vw, 5rem)',
              fontWeight: 800,
            }}
          >
            <span className="block text-white" style={{ textShadow: '0 0 60px rgba(79,110,247,0.3)' }}>
              Giridhar
            </span>
            <span
              className="block"
              style={{
                background: 'linear-gradient(135deg, #8899ff 0%, #4f6ef7 40%, #00b4ff 80%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Shyam.
            </span>
          </motion.h1>

          {/* Eyebrow mono */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-mono text-xs tracking-[0.2em] uppercase"
            style={{ color: 'rgba(79,110,247,0.65)' }}
          >
            // ai & ml developer · full-stack engineer
          </motion.div>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="h-8 flex items-center"
          >
            <span className="font-mono text-base md:text-lg" style={{ color: 'rgba(165,180,252,0.9)' }}>
              {'> '}
              {role}
              <span
                className="inline-block w-0.5 h-5 bg-cyan-400 ml-0.5 align-middle"
                style={{ animation: 'blink-cursor 1s step-end infinite' }}
              />
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-sm md:text-base leading-relaxed max-w-xl"
            style={{ color: 'rgba(121,134,203,0.9)' }}
          >
            Passionate about building intelligent systems — from ML pipelines and computer vision to full-stack applications. Turning complex problems into elegant, scalable solutions.
          </motion.p>

          {/* Skill panels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 gap-2.5"
          >
            {skills.map(({ icon: Icon, label, sub }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.65 + i * 0.07 }}
                className="group flex items-center gap-3 p-3 rounded-xl cursor-default transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(29,32,102,0.3), rgba(8,11,26,0.6))',
                  border: '1px solid rgba(79,110,247,0.12)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    'linear-gradient(135deg, rgba(29,32,102,0.6), rgba(15,18,48,0.8))';
                  e.currentTarget.style.borderColor = 'rgba(79,110,247,0.4)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(79,110,247,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    'linear-gradient(135deg, rgba(29,32,102,0.3), rgba(8,11,26,0.6))';
                  e.currentTarget.style.borderColor = 'rgba(79,110,247,0.12)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(79,110,247,0.15)',
                    border: '1px solid rgba(79,110,247,0.2)',
                  }}
                >
                  <Icon className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white/90">{label}</div>
                  <div className="text-[10px] font-mono leading-tight" style={{ color: 'rgba(121,134,203,0.6)' }}>
                    {sub}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="flex flex-wrap gap-3"
          >
            <HeroResumeButton />
            <a
              href="#projects"
              id="hero-projects-link"
              className="group px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2"
              style={{
                background: 'rgba(29,32,102,0.2)',
                border: '1px solid rgba(79,110,247,0.25)',
                color: 'rgba(137,150,204,0.9)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(29,32,102,0.4)';
                e.currentTarget.style.borderColor = 'rgba(79,110,247,0.5)';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(29,32,102,0.2)';
                e.currentTarget.style.borderColor = 'rgba(79,110,247,0.25)';
                e.currentTarget.style.color = 'rgba(137,150,204,0.9)';
                e.currentTarget.style.transform = '';
              }}
            >
              Explore Projects
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Holographic Photo ──────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center md:justify-end items-center order-first md:order-last"
          style={{ paddingTop: '2rem', paddingBottom: '2rem' }}
        >
          <HoloAvatar imgSrc={heroImg} />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group cursor-pointer z-20"
      >
        <span
          className="font-mono text-[10px] tracking-[0.3em] uppercase"
          style={{ color: 'rgba(121,134,203,0.4)' }}
        >
          Scroll
        </span>
        <div className="w-px h-10 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-b from-blue-400/60 to-transparent"
            style={{ animation: 'float-bob 2s ease-in-out infinite' }}
          />
        </div>
      </motion.a>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(3,4,14,0.8))' }}
      />
    </section>
  );
}
