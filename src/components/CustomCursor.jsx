import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: -200, y: -200 });
  const ring = useRef({ x: -200, y: -200 });
  const rafRef = useRef(null);
  const isHovering = useRef(false);

  useEffect(() => {
    /* Skip on touch-only devices */
    if (window.matchMedia('(pointer: coarse)').matches) return;

    /* Hide default cursor globally */
    const styleEl = document.createElement('style');
    styleEl.textContent = '*, *::before, *::after { cursor: none !important; }';
    document.head.appendChild(styleEl);

    /* Track raw mouse position — dot moves INSTANTLY */
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
      }
    };

    /* RAF loop — ring follows with HIGH lerp (0.38) for minimal lag */
    const loop = () => {
      const LERP = 0.38; /* ← higher = faster ring response */
      ring.current.x += (mouse.current.x - ring.current.x) * LERP;
      ring.current.y += (mouse.current.y - ring.current.y) * LERP;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x - 18}px, ${ring.current.y - 18}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    /* Hover state helpers */
    const setHover = () => {
      if (isHovering.current) return;
      isHovering.current = true;
      if (dotRef.current) {
        dotRef.current.style.width = '10px';
        dotRef.current.style.height = '10px';
        dotRef.current.style.background = '#00b4ff';
        dotRef.current.style.boxShadow = '0 0 14px #00b4ff, 0 0 28px rgba(0,180,255,0.5)';
        dotRef.current.style.transform = dotRef.current.style.transform; /* keep pos */
      }
      if (ringRef.current) {
        ringRef.current.style.width = '44px';
        ringRef.current.style.height = '44px';
        ringRef.current.style.borderColor = 'rgba(0,180,255,0.55)';
        ringRef.current.style.background = 'rgba(0,180,255,0.04)';
      }
    };

    const clearHover = () => {
      if (!isHovering.current) return;
      isHovering.current = false;
      if (dotRef.current) {
        dotRef.current.style.width = '8px';
        dotRef.current.style.height = '8px';
        dotRef.current.style.background = '#4f6ef7';
        dotRef.current.style.boxShadow = '0 0 8px rgba(79,110,247,0.8)';
      }
      if (ringRef.current) {
        ringRef.current.style.width = '36px';
        ringRef.current.style.height = '36px';
        ringRef.current.style.borderColor = 'rgba(79,110,247,0.45)';
        ringRef.current.style.background = 'transparent';
      }
    };

    const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, [tabindex]';

    /* Event delegation — single pair of listeners on document */
    const onMouseOver = (e) => {
      if (e.target.closest(INTERACTIVE)) setHover();
    };
    const onMouseOut = (e) => {
      if (e.target.closest(INTERACTIVE)) clearHover();
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });

    return () => {
      document.head.removeChild(styleEl);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* ── Inner dot — moves instantly with mouse ── */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#4f6ef7',
          boxShadow: '0 0 8px rgba(79,110,247,0.8)',
          pointerEvents: 'none',
          zIndex: 999999,
          willChange: 'transform',
          transition: 'width 0.15s ease, height 0.15s ease, background 0.15s ease, box-shadow 0.15s ease',
          transform: 'translate3d(-200px, -200px, 0)',
        }}
      />
      {/* ── Outer ring — follows with controlled lag ── */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '1.5px solid rgba(79,110,247,0.45)',
          background: 'transparent',
          pointerEvents: 'none',
          zIndex: 999998,
          willChange: 'transform',
          transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background 0.2s ease',
          transform: 'translate3d(-200px, -200px, 0)',
        }}
      />
    </>
  );
}
