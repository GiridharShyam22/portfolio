import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

function DockItem({ icon: Icon, label, href, id, activeId, mouseX, external }) {
  const ref = useRef(null);
  const isActive = id === activeId;

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [36, 72, 36]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.a
      href={href}
      ref={ref}
      aria-label={label}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      style={isActive ? undefined : { width }}
      className={`relative flex h-9 items-center justify-center rounded-full border backdrop-blur-xl group shadow-lg transition-all duration-300 sm:h-10 ${
        isActive 
          ? 'w-auto px-3.5 sm:px-4 bg-accent/90 border-accent text-white shadow-[0_0_24px_rgba(59,158,255,0.65)] gap-2' 
          : external
            ? 'aspect-square bg-emerald-400/10 border-emerald-300/30 text-emerald-100 hover:bg-emerald-400 hover:border-emerald-300 hover:text-bg'
            : 'aspect-square bg-white/10 border-white/20 text-white/80 hover:bg-accent hover:border-accent'
      }`}
    >
      <Icon className={`shrink-0 transition-colors ${isActive ? 'h-4 w-4 text-white sm:h-5 sm:w-5' : external ? 'h-1/2 w-1/2 group-hover:text-bg' : 'h-1/2 w-1/2 group-hover:text-white'}`} />
      {isActive && (
        <span className="hidden text-xs font-extrabold sm:inline">
          {label}
        </span>
      )}
      <span className={`absolute -top-10 left-1/2 -translate-x-1/2 font-bold text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl ${isActive ? 'hidden' : ''} ${
        external ? 'bg-emerald-400 text-bg' : 'bg-accent text-white'
      }`}>
        {label}
      </span>
    </motion.a>
  );
}

export default function Dock({ items, activeId }) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="flex max-w-[calc(100vw-1.5rem)] items-center justify-center gap-2 rounded-3xl border border-white/20 bg-bg2/90 px-3 py-3 shadow-[0_0_50px_rgba(59,158,255,0.2)] ring-1 ring-white/5 backdrop-blur-3xl sm:gap-3 sm:px-5 sm:py-4 md:gap-4 md:px-6"
    >
      {items.map((item, i) => (
        <DockItem key={i} {...item} activeId={activeId} mouseX={mouseX} />
      ))}
    </div>
  );
}
