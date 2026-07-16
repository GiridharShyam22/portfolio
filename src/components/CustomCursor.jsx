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
        dotRef.current.style.transform = `translate3d(${e.clientX - (parseInt(dotRef.current.style.width) / 2 || 5)}px, ${e.clientY - (parseInt(dotRef.current.style.width) / 2 || 5)}px, 0)`;
      }
    };

    /* RAF loop — ring follows with HIGH lerp (0.38) for minimal lag */
    const loop = () => {
      const LERP = 0.38; /* ← higher = faster ring response */
      ring.current.x += (mouse.current.x - ring.current.x) * LERP;
      ring.current.y += (mouse.current.y - ring.current.y) * LERP;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x - (parseInt(ringRef.current.style.width) / 2 || 20)}px, ${ring.current.y - (parseInt(ringRef.current.style.width) / 2 || 20)}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    /* Hover state helpers */
    const setHover = () => {
      if (isHovering.current) return;
      isHovering.current = true;
      if (dotRef.current) {
        dotRef.current.style.width = '14px';
        dotRef.current.style.height = '14px';
        dotRef.current.style.background = '#ffffff';
        dotRef.current.style.boxShadow = '0 0 16px #ffffff, 0 0 32px rgba(255,255,255,0.6)';
        dotRef.current.style.transform = dotRef.current.style.transform; /* keep pos */
      }
      if (ringRef.current) {
        ringRef.current.style.width = '56px';
        ringRef.current.style.height = '56px';
        ringRef.current.style.borderColor = 'rgba(255,255,255,0.7)';
        ringRef.current.style.background = 'rgba(255,255,255,0.1)';
      }
    };

    const clearHover = () => {
      if (!isHovering.current) return;
      isHovering.current = false;
      if (dotRef.current) {
        dotRef.current.style.width = '10px';
        dotRef.current.style.height = '10px';
        dotRef.current.style.background = '#ffffff';
        dotRef.current.style.boxShadow = '0 0 12px rgba(255,255,255,0.9)';
      }
      if (ringRef.current) {
        ringRef.current.style.width = '40px';
        ringRef.current.style.height = '40px';
        ringRef.current.style.borderColor = 'rgba(255,255,255,0.5)';
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
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: '#ffffff',
          boxShadow: '0 0 12px rgba(255,255,255,0.9)',
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
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.5)',
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
