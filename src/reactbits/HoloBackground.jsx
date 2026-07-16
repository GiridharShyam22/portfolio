import { useEffect, useRef } from 'react';

const HoloBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let width, height;
        let particles = [];

        // Configuration
        const particleCount = 60; // Professional, not too busy
        const connectionDistance = 150;
        const moveSpeed = 0.3;

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * moveSpeed;
                this.vy = (Math.random() - 0.5) * moveSpeed;
                this.size = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(212, 163, 115, 0.5)'; // Portfolio Accent Amber (#d4a373)
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw Particles and Connections
            particles.forEach((p, index) => {
                p.update();
                p.draw();

                // Connections
                for (let i = index + 1; i < particles.length; i++) {
                    const p2 = particles[i];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(212, 163, 115, ${0.15 * (1 - distance / connectionDistance)})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });

            // Draw "Holo Grid" Overlay (Subtle Data Plane)
            ctx.save();
            const time = Date.now() * 0.0005;
            const scanY = (Math.sin(time) * 0.5 + 0.5) * height;

            const scanGradient = ctx.createLinearGradient(0, scanY - 20, 0, scanY + 20);
            scanGradient.addColorStop(0, 'rgba(2,3,3,0)');
            scanGradient.addColorStop(0.5, 'rgba(212, 163, 115, 0.1)');
            scanGradient.addColorStop(1, 'rgba(2,3,3,0)');

            ctx.fillStyle = scanGradient;
            ctx.fillRect(0, scanY - 50, width, 100);
            ctx.restore();

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        resize();
        init();
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
            style={{
                width: '100%',
                height: '100%',
            }}
        />
    );
};

export default HoloBackground;
