import React, { useEffect, useRef } from 'react';

const LuminousBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let width, height;

        let beams = [];
        let particles = [];

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            init();
        };

        class Beam {
            constructor() {
                this.x = Math.random() * width;
                this.width = Math.random() * 15 + 2;
                this.alpha = Math.random() * 0.08 + 0.02; // Reduced base brightness
                this.length = Math.random() * height * 0.4 + height * 0.1; // Reduced length
                this.phase = Math.random() * Math.PI * 2;
                this.speed = Math.random() * 0.02 + 0.01;
                // Add a slightly blue tint to some beams
                this.isBlue = Math.random() > 0.7;
            }

            draw() {
                const currentAlpha = Math.max(0, this.alpha + Math.sin(this.phase) * 0.05);
                const gradient = ctx.createLinearGradient(this.x, 0, this.x, this.length);
                
                const color = this.isBlue ? '150, 200, 255' : '255, 255, 255';
                
                gradient.addColorStop(0, `rgba(${color}, ${currentAlpha * 1.5})`); // Brighter at top but less intense
                gradient.addColorStop(0.2, `rgba(${color}, ${currentAlpha * 0.8})`);
                gradient.addColorStop(1, `rgba(${color}, 0)`);

                ctx.fillStyle = gradient;
                ctx.fillRect(this.x - this.width / 2, 0, this.width, this.length);
                this.phase += this.speed;
            }
        }

        class Particle {
            constructor() {
                this.reset(true);
            }

            reset(initial = false) {
                this.x = Math.random() * width;
                this.y = initial ? Math.random() * height : -10;
                // Mostly tiny particles, some slightly larger
                this.size = Math.random() < 0.9 ? Math.random() * 1.5 + 0.5 : Math.random() * 3 + 1;
                this.speedY = Math.random() * 1.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.alpha = Math.random() * 0.5 + 0.1; // Reduced particle brightness
                this.isBlue = Math.random() > 0.8;
            }

            update() {
                this.y += this.speedY;
                this.x += this.speedX;
                // Wobble slightly
                this.x += Math.sin(this.y * 0.02) * 0.5;
                
                if (this.y > height || this.x < 0 || this.x > width) {
                    this.reset();
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                const color = this.isBlue ? '150, 200, 255' : '255, 255, 255';
                ctx.fillStyle = `rgba(${color}, ${this.alpha})`;
                
                // Add glow to larger particles
                if (this.size > 2) {
                    ctx.shadowBlur = 5;
                    ctx.shadowColor = `rgba(${color}, 1)`;
                } else {
                    ctx.shadowBlur = 0;
                }
                
                ctx.fill();
            }
        }

        const init = () => {
            beams = [];
            particles = [];
            // Number of beams scales with screen width
            const beamCount = Math.floor(width / 15);
            for (let i = 0; i < beamCount; i++) beams.push(new Beam());
            
            const particleCount = Math.floor(width / 4);
            for (let i = 0; i < particleCount; i++) particles.push(new Particle());
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            
            // Add a very subtle dark blue/grey gradient base (optional, depending on CSS)
            // But usually we leave it transparent and let the CSS handle the base dark color
            
            ctx.globalCompositeOperation = 'screen';

            beams.forEach(b => b.draw());
            
            // Reset shadow for beams so they don't lag, only use on particles
            ctx.shadowBlur = 0; 
            
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            ctx.globalCompositeOperation = 'source-over';
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ width: '100%', height: '100%' }}
        />
    );
};

export default LuminousBackground;
