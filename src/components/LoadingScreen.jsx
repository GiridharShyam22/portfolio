import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LINES = [
  '> initializing portfolio.exe',
  '> loading Giridhar Shyam Samsani...',
  '> mounting AI/ML modules ✓',
  '> connecting full-stack pipelines ✓',
  '> compiling 5+ production projects ✓',
  '> system ready.',
];

export default function LoadingScreen({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let lineIdx = 0;
    const lineInterval = setInterval(() => {
      if (lineIdx < BOOT_LINES.length) {
        setVisibleLines((prev) => [...prev, BOOT_LINES[lineIdx]]);
        setProgress(Math.round(((lineIdx + 1) / BOOT_LINES.length) * 100));
        lineIdx++;
      } else {
        clearInterval(lineInterval);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 600);
        }, 300);
      }
    }, 180);
    return () => clearInterval(lineInterval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#020303' }}
        >
          {/* Background grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(104,105,110,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(104,105,110,0.04) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(104,105,110,0.1) 0%, transparent 70%)',
            }}
          />

          {/* Center logo */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-10"
          >
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-black font-mono text-white"
              style={{
                background: 'linear-gradient(135deg, #68696e, #0c1f5e)',
                boxShadow: '0 0 40px rgba(104,105,110,0.6), 0 0 80px rgba(104,105,110,0.2)',
              }}
            >
              GS
            </div>
            {/* Orbiting ring */}
            <div
              className="absolute -inset-3 rounded-full border border-[#68696e]/20"
              style={{ animation: 'spin 4s linear infinite' }}
            />
            <div
              className="absolute -inset-6 rounded-full border border-dashed border-[#68696e]/10"
              style={{ animation: 'spin 8s linear infinite reverse' }}
            />
          </motion.div>

          {/* Terminal window */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-full max-w-md mx-6 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(8,11,26,0.95)',
              border: '1px solid rgba(104,105,110,0.2)',
              boxShadow: '0 20px 60px rgba(3,4,14,0.8)',
            }}
          >
            {/* Terminal title bar */}
            <div
              className="flex items-center gap-2 px-4 py-3 border-b"
              style={{ borderColor: 'rgba(104,105,110,0.1)' }}
            >
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span
                className="ml-2 text-xs font-mono"
                style={{ color: 'rgba(121,134,203,0.5)' }}
              >
                portfolio.exe — bash
              </span>
            </div>

            {/* Boot lines */}
            <div className="p-4 min-h-[160px] space-y-1.5">
              {visibleLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs font-mono"
                  style={{
                    color:
                      line.includes('✓')
                        ? '#4ade80'
                        : line.includes('ready')
                        ? '#a5b4fc'
                        : 'rgba(121,134,203,0.8)',
                  }}
                >
                  {line}
                  {i === visibleLines.length - 1 && (
                    <span
                      className="inline-block w-2 h-3 ml-1 align-middle"
                      style={{
                        background: '#68696e',
                        animation: 'blink-cursor 1s step-end infinite',
                      }}
                    />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="px-4 pb-4">
              <div
                className="relative h-1 rounded-full overflow-hidden"
                style={{ background: 'rgba(104,105,110,0.1)' }}
              >
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #68696e, #0c1f5e, #68696e)',
                    boxShadow: '0 0 8px rgba(104,105,110,0.6)',
                  }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.15, ease: 'linear' }}
                />
              </div>
              <div
                className="flex justify-between mt-2 text-[10px] font-mono"
                style={{ color: 'rgba(121,134,203,0.4)' }}
              >
                <span>Loading</span>
                <span>{progress}%</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
