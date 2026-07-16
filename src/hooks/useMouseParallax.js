import { useRef, useCallback } from 'react';

/**
 * useMouseParallax — tracks mouse position and returns
 * normalized values for use in 3D CSS transforms.
 * Returns { ref, style } where style contains the current
 * 3D transform based on cursor position over the element.
 */
export function useMouseParallax(intensity = 1) {
  const ref = useRef(null);
  const frameRef = useRef(null);
  const stateRef = useRef({ rotX: 0, rotY: 0, tx: 0, ty: 0 });

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);  // -1 to 1
    const dy = (e.clientY - cy) / (rect.height / 2); // -1 to 1

    const targetRotX = -dy * 12 * intensity;
    const targetRotY = dx * 12 * intensity;
    const targetTx   = dx * 6 * intensity;
    const targetTy   = dy * 6 * intensity;

    // Smooth lerp toward target
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    const animate = () => {
      const s = stateRef.current;
      s.rotX += (targetRotX - s.rotX) * 0.12;
      s.rotY += (targetRotY - s.rotY) * 0.12;
      s.tx   += (targetTx - s.tx) * 0.12;
      s.ty   += (targetTy - s.ty) * 0.12;

      if (ref.current) {
        ref.current.style.transform =
          `perspective(1000px) rotateX(${s.rotX}deg) rotateY(${s.rotY}deg) translateZ(0px)`;
      }
      const stillMoving =
        Math.abs(targetRotX - s.rotX) > 0.01 ||
        Math.abs(targetRotY - s.rotY) > 0.01;
      if (stillMoving) frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
  }, [intensity]);

  const handleMouseLeave = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    const animate = () => {
      const s = stateRef.current;
      s.rotX += (0 - s.rotX) * 0.08;
      s.rotY += (0 - s.rotY) * 0.08;
      if (ref.current) {
        ref.current.style.transform =
          `perspective(1000px) rotateX(${s.rotX}deg) rotateY(${s.rotY}deg) translateZ(0px)`;
      }
      if (Math.abs(s.rotX) > 0.01 || Math.abs(s.rotY) > 0.01) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        if (ref.current) ref.current.style.transform = '';
      }
    };
    frameRef.current = requestAnimationFrame(animate);
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
}

/**
 * useGlobalParallax — simple hook that returns
 * normalized mouse position (0..1) relative to window.
 * Useful for multi-layer parallax where elements move at different speeds.
 */
export function useGlobalParallax() {
  const posRef = useRef({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback((e) => {
    posRef.current = {
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    };
  }, []);

  return { posRef, handleMouseMove };
}
