import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

function DockItem({ icon: Icon, label, href, id, activeId, mouseX, external, onAction }) {
  const ref = useRef(null);
  const isActive = id === activeId;

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 84, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const sharedClass = `relative flex aspect-square items-center justify-center rounded-full backdrop-blur-xl border group shadow-lg transition-colors ${
    isActive
      ? 'bg-accent/80 border-accent text-white shadow-[0_0_20px_rgba(212,163,115,0.6)]'
      : external
        ? 'bg-amber-400/10 border-amber-300/30 text-amber-100 hover:bg-amber-400 hover:border-amber-300 hover:text-bg'
        : 'bg-white/10 border-white/20 text-white/80 hover:bg-accent hover:border-accent'
  }`;

  const children = (
    <>
      <Icon className={`w-1/2 h-1/2 transition-colors ${isActive ? 'text-white' : external ? 'group-hover:text-bg' : 'group-hover:text-white'}`} />
      <span className={`absolute -top-10 left-1/2 -translate-x-1/2 font-bold text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl ${
        external ? 'bg-amber-400 text-bg' : 'bg-accent text-bg'
      }`}>
        {label}
      </span>
    </>
  );

  if (onAction) {
    return (
      <motion.button
        ref={ref}
        aria-label={label}
        onClick={onAction}
        style={{ width }}
        className={sharedClass}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <motion.a
      href={href}
      ref={ref}
      aria-label={label}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      style={{ width }}
      className={sharedClass}
    >
      {children}
    </motion.a>
  );
}

export default function Dock({ items, activeId }) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="flex max-w-[calc(100vw-1.5rem)] items-center justify-center gap-2 rounded-3xl border border-white/20 bg-bg2/90 px-3 py-3 shadow-[0_0_50px_rgba(212,163,115,0.15)] ring-1 ring-white/5 backdrop-blur-3xl sm:gap-3 sm:px-5 sm:py-4 md:gap-5 md:px-7 md:py-5"
    >
      {items.map((item, i) => (
        <DockItem key={i} {...item} activeId={activeId} mouseX={mouseX} />
      ))}
    </div>
  );
}
