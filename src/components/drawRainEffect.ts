import { ParticleState, SplashState } from './RainState';

export type DrawState = {
    context: CanvasRenderingContext2D
    particles: ParticleState[]
    splashes: SplashState[]
    width: number
    height: number
}

export function drawRainEffect({
    context,
    particles,
    splashes,
    width,
    height,
}: DrawState) {
    const createSplash = (x: number, y: number) => {
        const numParticles = 5 + Math.floor(Math.random() * 5);
        for (let i = 0; i < numParticles; i++) {
            const angle = Math.PI + (Math.random() * Math.PI);
            const speed = Math.random() * 2 + 1;
            splashes.push({
                x: x,
                y: y - 2,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                radius: Math.random() * 1 + 0.5,
                alpha: 0.5 + Math.random() * 0.5,
            });
        }
    }

    const move = () => {
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.xs;
            p.y += p.ys;

            if (p.y > height) {
                createSplash(p.x, height);

                p.x = Math.random() * width;
                p.y = -20;
            } else if (p.x > width) {
                p.y = Math.random() * height;
                p.x = 0;
            } else if (p.x < 0) {
                p.y = Math.random() * height;
                p.x = width;
            }
        }
    }

    context.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        context.beginPath();
        context.moveTo(p.x, p.y);
        context.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
        context.stroke();
    }

    for (let i = 0; i < splashes.length; i++) {
        const s = splashes[i];
        context.beginPath();
        context.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(174,194,224,${s.alpha})`;
        context.fill();
        s.x += s.vx;
        s.y += s.vy;
        s.radius -= 0.3;
        s.alpha -= 0.2;

        if (s.alpha <= 0 || s.radius <= 0) {
            splashes.splice(i, 1);
        }
    }
    move();
}