import { ParticleState } from './RainState';

export type DrawState = {
    context: CanvasRenderingContext2D
    particles: ParticleState[]
    width: number
    height: number
}

export function drawRainEffect({
    context,
    particles,
    width,
    height,
}: DrawState) {
    const move = () => {
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.xs;
            p.y += p.ys;
            if (p.y > height) {
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
    };

    context.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        context.beginPath();
        context.moveTo(p.x, p.y);
        context.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
        context.stroke();
    }
    move();
}