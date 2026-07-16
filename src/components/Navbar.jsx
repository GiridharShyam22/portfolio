import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'home',       label: 'Home' },
  { id: 'about',      label: 'About' },
  { id: 'projects',   label: 'Projects' },
  { id: 'experience', label: 'Journey' },
  { id: 'contact',    label: 'Contact' },
];

export default function Navbar() {
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      // Determine active section
      const sections = NAV_ITEMS.map(({ id }) => document.getElementById(id)).filter(Boolean);
      const scrollY = window.scrollY + window.innerHeight * 0.3;
      let current = 'home';
      sections.forEach((sec) => {
        if (sec.offsetTop <= scrollY) current = sec.id;
      });
      setActive(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Nav */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1 px-3 py-2 rounded-2xl"
        style={{
          background: scrolled
            ? 'linear-gradient(135deg, rgba(15,18,48,0.92), rgba(8,11,26,0.95))'
            : 'linear-gradient(135deg, rgba(15,18,48,0.7), rgba(8,11,26,0.8))',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(232,228,235,0.2)',
          boxShadow: scrolled
            ? '0 8px 40px rgba(3,4,14,0.6), 0 0 0 1px rgba(232,228,235,0.08), inset 0 1px 0 rgba(255,255,255,0.04)'
            : '0 4px 20px rgba(3,4,14,0.3)',
          transition: 'all 0.4s ease',
        }}
        aria-label="Main navigation"
      >
        {/* Logo mark */}
        <a
          href="#home"
          id="nav-logo"
          className="mr-3 flex items-center justify-center w-8 h-8 rounded-lg text-xs font-black font-mono text-white"
          style={{
            background: 'linear-gradient(135deg, #e8e4eb, #dbc0f0)',
            boxShadow: '0 0 16px rgba(232,228,235,0.4)',
          }}
        >
          GS
        </a>

        {NAV_ITEMS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            id={`nav-${id}`}
            className="relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
            style={{
              color: active === id ? '#e8eaf6' : 'rgba(121,134,203,0.8)',
            }}
            onClick={() => setActive(id)}
          >
            {/* Active indicator */}
            {active === id && (
              <motion.div
                layoutId="nav-active"
                className="absolute inset-0 rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(29,32,102,0.8), rgba(232,228,235,0.2))',
                  border: '1px solid rgba(232,228,235,0.35)',
                  boxShadow: '0 0 16px rgba(232,228,235,0.2)',
                }}
                transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
              />
            )}
            <span className="relative z-10">{label}</span>
          </a>
        ))}

        {/* CTA */}
        <a
          href="#contact"
          id="nav-hire-cta"
          className="ml-3 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200"
          style={{
            background: 'linear-gradient(135deg, rgba(232,228,235,0.2), rgba(219,192,240,0.15))',
            border: '1px solid rgba(232,228,235,0.4)',
            color: '#a5b4fc',
            boxShadow: '0 0 12px rgba(232,228,235,0.15)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(232,228,235,0.35), rgba(219,192,240,0.3))';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(232,228,235,0.3)';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(232,228,235,0.2), rgba(219,192,240,0.15))';
            e.currentTarget.style.boxShadow = '0 0 12px rgba(232,228,235,0.15)';
            e.currentTarget.style.color = '#a5b4fc';
          }}
        >
          Hire Me ↗
        </a>
      </motion.nav>

      {/* Mobile Nav */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 md:hidden">
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex items-center gap-1 px-3 py-2.5 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(15,18,48,0.96), rgba(8,11,26,0.98))',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(232,228,235,0.25)',
            boxShadow: '0 -4px 40px rgba(3,4,14,0.6), 0 0 0 1px rgba(232,228,235,0.06)',
          }}
        >
          {NAV_ITEMS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              id={`mobile-nav-${id}`}
              className="relative px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200"
              style={{ color: active === id ? '#e8eaf6' : 'rgba(121,134,203,0.6)' }}
              onClick={() => setActive(id)}
            >
              {active === id && (
                <motion.div
                  layoutId="mobile-nav-active"
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(29,32,102,0.8), rgba(232,228,235,0.2))',
                    border: '1px solid rgba(232,228,235,0.3)',
                  }}
                  transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </a>
          ))}
        </motion.div>
      </div>
    </>
  );
}
