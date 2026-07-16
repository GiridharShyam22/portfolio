import { motion } from 'framer-motion';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative py-10 px-6 md:px-12 overflow-hidden">
      {/* Top divider */}
      <div className="section-divider mb-8" />

      {/* Subtle glow */}
      <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 100% at 50% 100%, rgba(29,32,102,0.12) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Logo / name */}
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black font-mono text-white"
              style={{
                background: 'linear-gradient(135deg, #4f6ef7, #7c4fff)',
                boxShadow: '0 0 16px rgba(79,110,247,0.3)',
              }}
            >
              GS
            </div>
            <span className="font-bold text-sm" style={{ color: 'rgba(232,234,246,0.8)' }}>Giridhar Shyam</span>
          </div>

          {/* Center: copyright */}
          <p className="text-xs font-mono text-center" style={{ color: 'rgba(121,134,203,0.4)' }}>
            © {year} Giridhar Shyam Samsani · Built with React + Three.js
          </p>

          {/* Right: links */}
          <div className="flex items-center gap-5">
            {[
              { label: 'GitHub', href: 'https://github.com/GiridharShyam22' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/giridharshyam/' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono transition-colors duration-200"
                style={{ color: 'rgba(121,134,203,0.45)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#a5b4fc'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(121,134,203,0.45)'; }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
