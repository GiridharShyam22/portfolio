import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * ScreenshotReel — infinite auto-scrolling image reel with drag/swipe support.
 *
 * Behavior:
 *  - Auto-scrolls left at `speed` px/s
 *  - Pauses when hovered (mouse over, no drag)
 *  - Follows user drag/swipe distance and direction
 *  - Resumes auto-scroll when released
 */
export default function ScreenshotReel({
  images = [],        // [{ src, alt }]
  speed = 40,         // px per second
  height = 280,       // uniform image height
  gap = 20,           // gap between images
  fadeColor = '#0a0a0a',
  borderClass = '',
  glowColor = 'rgba(255,255,255,0.05)',
  ariaLabel = 'Screenshot gallery',
}) {
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);
  const offsetRef = useRef(0);
  const seqWidthRef = useRef(0);

  // Interaction state
  const [isHovered, setIsHovered] = useState(false);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragOffsetStart = useRef(0);

  // Measure one copy of images to know where to wrap
  const measureSeq = useCallback(() => {
    if (!trackRef.current) return;
    const firstList = trackRef.current.querySelector('[data-copy="0"]');
    if (firstList) {
      seqWidthRef.current = firstList.getBoundingClientRect().width;
    }
  }, []);

  useEffect(() => {
    measureSeq();
    const ro = new ResizeObserver(measureSeq);
    if (containerRef.current) ro.observe(containerRef.current);
    // Also re-measure when images load
    const imgs = trackRef.current?.querySelectorAll('img') ?? [];
    let remaining = imgs.length;
    const onLoad = () => { remaining--; if (remaining <= 0) measureSeq(); };
    imgs.forEach(img => {
      if (img.complete) onLoad();
      else {
        img.addEventListener('load', onLoad, { once: true });
        img.addEventListener('error', onLoad, { once: true });
      }
    });
    return () => ro.disconnect();
  }, [images, measureSeq]);

  // Animation loop
  useEffect(() => {
    const animate = (timestamp) => {
      if (lastTimeRef.current === null) lastTimeRef.current = timestamp;
      const dt = Math.max(0, timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      const seq = seqWidthRef.current;

      // Only auto-advance if not hovered and not dragging
      if (!isHovered && !isDragging.current && seq > 0) {
        offsetRef.current += speed * dt;
        offsetRef.current = ((offsetRef.current % seq) + seq) % seq;
      }

      if (trackRef.current && seq > 0) {
        trackRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
    };
  }, [speed, isHovered]);

  // Mouse drag handlers
  const onPointerDown = useCallback((e) => {
    // Only primary button
    if (e.button && e.button !== 0) return;
    isDragging.current = true;
    dragStartX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    dragOffsetStart.current = offsetRef.current;
    // Prevent text selection during drag
    e.preventDefault();
  }, []);

  const onPointerMove = useCallback((e) => {
    if (!isDragging.current) return;
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const delta = dragStartX.current - clientX; // positive = swiped left
    const seq = seqWidthRef.current;
    if (seq > 0) {
      offsetRef.current = ((dragOffsetStart.current + delta) % seq + seq) % seq;
    }
  }, []);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  // Attach touch/mouse listeners
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener('mousedown', onPointerDown);
    el.addEventListener('touchstart', onPointerDown, { passive: false });
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('touchmove', onPointerMove, { passive: false });
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchend', onPointerUp);

    return () => {
      el.removeEventListener('mousedown', onPointerDown);
      el.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchend', onPointerUp);
    };
  }, [onPointerDown, onPointerMove, onPointerUp]);

  // How many copies do we need to fill the viewport + headroom
  const copies = 4;

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden select-none"
      style={{ height: `${height + 20}px`, cursor: isDragging.current ? 'grabbing' : 'grab' }}
      role="region"
      aria-label={ariaLabel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); isDragging.current = false; }}
    >
      {/* Fade edges */}
      <div
        className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
        style={{
          width: 'clamp(24px, 8%, 100px)',
          background: `linear-gradient(to right, ${fadeColor} 0%, transparent 100%)`,
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
        style={{
          width: 'clamp(24px, 8%, 100px)',
          background: `linear-gradient(to left, ${fadeColor} 0%, transparent 100%)`,
        }}
      />

      {/* Scrolling track */}
      <div
        ref={trackRef}
        className="flex items-center will-change-transform"
        style={{ gap: `${gap}px`, paddingTop: '10px' }}
      >
        {Array.from({ length: copies }, (_, copyIdx) => (
          <div
            key={`copy-${copyIdx}`}
            data-copy={copyIdx}
            className="flex items-center shrink-0"
            style={{ gap: `${gap}px`, paddingRight: `${gap}px` }}
          >
            {images.map((img, i) => (
              <div
                key={`${copyIdx}-${i}`}
                className={`shrink-0 rounded-xl overflow-hidden ${borderClass} transition-all duration-300 hover:border-white/30`}
                style={{
                  height: `${height}px`,
                  boxShadow: `0 8px 32px ${glowColor}, 0 4px 12px rgba(0,0,0,0.4)`,
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt || ''}
                  className="h-full w-auto object-contain"
                  loading="lazy"
                  draggable={false}
                  style={{ pointerEvents: 'none' }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
