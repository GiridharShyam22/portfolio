import { motion } from 'framer-motion';
import { Send, ArrowUpRight, Mail, BriefcaseBusiness } from 'lucide-react';
import { useResumeModal } from '../context/ResumeModalContext';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

function ContactResumeButton() {
  const { open } = useResumeModal();
  return (
    <button
      onClick={open}
      className="group inline-flex w-full items-center justify-center gap-3 rounded-xl px-6 py-3.5 text-sm font-bold transition-all duration-300 sm:w-auto"
      style={{
        background: 'rgba(114,114,114,0.1)',
        border: '1px solid rgba(114,114,114,0.3)',
        color: '#b7b7b7',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(114,114,114,0.2)';
        e.currentTarget.style.borderColor = 'rgba(114,114,114,0.5)';
        e.currentTarget.style.color = '#fff';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(114,114,114,0.1)';
        e.currentTarget.style.borderColor = 'rgba(114,114,114,0.3)';
        e.currentTarget.style.color = '#b7b7b7';
        e.currentTarget.style.transform = '';
      }}
    >
      Resume <ArrowUpRight className="h-4 w-4" />
    </button>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-36 px-6 md:px-12 overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(114,114,114,0.1) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 20% 50%, rgba(39,39,39,0.2) 0%, transparent 50%)',
      }} />

      {/* Circuit board pattern */}
      <div className="absolute inset-0 pointer-events-none circuit-bg opacity-40" />

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 max-w-[40px]" style={{ background: 'linear-gradient(to right, transparent, rgba(114,114,114,0.6))' }} />
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-neutral-400/70">04 — Contact</span>
          </div>
        </motion.div>

        {/* Main contact panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, rgba(20,20,20,0.97) 0%, rgba(39,39,39,0.25) 50%, rgba(11,11,11,0.97) 100%)',
            border: '1px solid rgba(114,114,114,0.2)',
            boxShadow: '0 0 80px rgba(114,114,114,0.08), inset 0 0 80px rgba(39,39,39,0.1)',
          }}
        >
          {/* Top accent line */}
          <div className="absolute inset-x-0 top-0 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #727272, #171717, #727272, transparent)' }} />

          {/* Decorative corner ring */}
          <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full pointer-events-none" style={{ border: '1px solid rgba(114,114,114,0.08)' }} />
          <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full pointer-events-none" style={{ border: '1px solid rgba(114,114,114,0.06)' }} />

          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">

            {/* LEFT: Main CTA */}
            <div className="relative p-8 md:p-12 lg:p-16">
              {/* Available badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-bold tracking-widest uppercase"
                style={{
                  background: 'rgba(114,114,114,0.12)',
                  border: '1px solid rgba(114,114,114,0.3)',
                  color: '#b7b7b7',
                  boxShadow: '0 0 20px rgba(114,114,114,0.15)',
                }}
              >
                <BriefcaseBusiness className="w-3.5 h-3.5" />
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" style={{ boxShadow: '0 0 8px #ffffff' }} />
                Available for work
              </motion.div>

              <h2
                className="text-4xl md:text-5xl font-black leading-tight mb-6"
                style={{ fontFamily: 'Space Grotesk', color: '#eaeaea' }}
              >
                Let's Build{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #727272, #727272, #727272)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                  Something
                </span>
                {' '}Exceptional.
              </h2>

              <p className="text-base md:text-lg leading-relaxed max-w-lg mb-10" style={{ color: 'rgba(229,229,229,0.85)' }}>
                Whether it's a full-stack product, a machine learning system, or a high-impact collaboration — I bring precision, speed, and reliability to every project. Open to internships, freelance work, and full-time roles.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:giridharsyamsamsani@gmail.com"
                  id="contact-email-btn"
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-xl px-6 py-3.5 text-sm font-extrabold transition-all duration-300 sm:w-auto"
                  style={{
                    background: 'linear-gradient(135deg, #727272, #171717)',
                    boxShadow: '0 0 30px rgba(114,114,114,0.35), 0 4px 20px rgba(114,114,114,0.25)',
                    color: '#fff',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 45px rgba(114,114,114,0.55), 0 4px 30px rgba(114,114,114,0.4)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(114,114,114,0.35), 0 4px 20px rgba(114,114,114,0.25)';
                    e.currentTarget.style.transform = '';
                  }}
                >
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  Email me
                </a>
                <ContactResumeButton />
              </div>
            </div>

            {/* RIGHT: Contact info */}
            <div
              className="relative p-8 md:p-12 lg:p-10 border-t lg:border-t-0 lg:border-l"
              style={{ borderColor: 'rgba(114,114,114,0.1)', background: 'rgba(4,4,4,0.3)' }}
            >
              {/* Direct email card */}
              <div
                className="rounded-2xl p-5 mb-4"
                style={{
                  background: 'rgba(20,20,20,0.7)',
                  border: '1px solid rgba(114,114,114,0.15)',
                }}
              >
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] mb-2" style={{ color: 'rgba(229,229,229,0.5)' }}>
                  Direct Contact
                </div>
                <a
                  href="mailto:giridharsyamsamsani@gmail.com"
                  className="flex items-center gap-3 font-bold text-sm break-all transition-colors"
                  style={{ color: '#eaeaea' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#b7b7b7'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#eaeaea'; }}
                >
                  <Mail className="h-4 w-4 flex-shrink-0" style={{ color: '#727272' }} />
                  giridharsyamsamsani@gmail.com
                </a>
                <p className="mt-3 text-xs leading-relaxed" style={{ color: 'rgba(229,229,229,0.55)' }}>
                   Share the opportunity, project brief, or collaboration idea. I respond promptly and professionally.
                </p>
              </div>

              {/* Social links */}
              <div className="space-y-3">
                {[
                  {
                    href: 'https://www.linkedin.com/in/giridharshyam/',
                    icon: LinkedinIcon,
                    label: 'LinkedIn',
                    sub: 'linkedin.com/in/giridharshyam',
                    hoverColor: '#545454',
                    id: 'contact-linkedin',
                  },
                  {
                    href: 'https://github.com/GiridharShyam22',
                    icon: GithubIcon,
                    label: 'GitHub',
                    sub: 'github.com/GiridharShyam22',
                    hoverColor: '#fff',
                    id: 'contact-github',
                  },
                ].map(({ href, icon: Icon, label, sub, hoverColor, id }) => (
                  <a
                    key={label}
                    href={href}
                    id={id}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-sm font-bold transition-all duration-300"
                    style={{
                      background: 'rgba(20,20,20,0.5)',
                      border: '1px solid rgba(114,114,114,0.1)',
                      color: '#eaeaea',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${hoverColor}40`;
                      e.currentTarget.style.boxShadow = `0 0 20px ${hoverColor}15`;
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(114,114,114,0.1)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = '';
                    }}
                  >
                    <span className="flex items-center gap-3">
                      <Icon />
                      <div>
                        <div className="text-sm font-bold">{label}</div>
                        <div className="text-[10px] font-mono" style={{ color: 'rgba(229,229,229,0.5)' }}>{sub}</div>
                      </div>
                    </span>
                    <ArrowUpRight className="h-4 w-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
