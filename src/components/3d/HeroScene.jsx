import { useEffect, useRef } from 'react';

export default function HeroScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Handle window resize
    const resizeCanvas = () => {
      // Use parent container dimensions instead of window to stay contained
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    
    // Initial size
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Characters for the rain (Binary + Tech Symbols)
    const chars = '01010101010101010101{}[]/<>';
    const charArray = chars.split('');

    const fontSize = 16;
    let columns = Math.floor(canvas.width / fontSize);

    // Array to track the Y coordinate of each drop
    let drops = Array(columns).fill(1);

    // Drawing function
    let lastDrawTime = 0;
    const fps = 30;
    const interval = 1000 / fps;

    const render = (timestamp) => {
      animationFrameId = requestAnimationFrame(render);

      // Throttle frame rate
      if (timestamp - lastDrawTime < interval) return;
      lastDrawTime = timestamp;

      // Update columns if canvas resized
      const currentColumns = Math.floor(canvas.width / fontSize);
      if (currentColumns !== columns) {
        columns = currentColumns;
        drops = Array(columns).fill(1);
      }

      // Draw semi-transparent black background to create trail effect
      ctx.fillStyle = 'rgba(11, 11, 11, 0.15)'; // Trail length determined by opacity
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];

        // Randomly make leading characters bright white, tail is gray
        if (Math.random() > 0.95) {
          ctx.fillStyle = '#ffffff'; // Bright white head
        } else {
          ctx.fillStyle = '#52525b'; // Darker gray tail
        }

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop randomly after it crosses the screen
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden" style={{ background: '#0b0b0b' }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-60"
        style={{ filter: 'blur(0.5px)' }}
      />
      {/* Vignette/gradient overlay to fade the rain at the edges and under text */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0b0b0b_100%)] pointer-events-none" />
    </div>
  );
}
