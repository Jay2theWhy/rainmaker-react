import { DropletState, SplashState } from './RainState';

export type DrawState = {
    context: CanvasRenderingContext2D
    droplets: DropletState[]
    splashes: SplashState[]
    width: number
    height: number
    dropletStyle: string
    noBackground: boolean
    bgStyle: string
}

export function drawRainEffect({
    context,
    droplets,
    splashes,
    width,
    height,
    dropletStyle,
    noBackground,
    bgStyle,
}: DrawState) {
    const createSplash = (x: number, y: number) => {
        const numSplashParticles = 5 + Math.floor(Math.random() * 5);
        for (let i = 0; i < numSplashParticles; i++) {
            const angle = Math.PI + (Math.random() * Math.PI);
            const speed = Math.random() * 2 + 1;
            splashes.push({
                x: x,
                y: y - 2, // slightly above the ground
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                radius: Math.random() * 1 + 0.5,
                alpha: 0.5 + Math.random() * 0.5,
            });
        }
    }

    const move = () => {
        for (let i = 0; i < droplets.length; i++) {
            const droplet = droplets[i];
            droplet.x += droplet.xs;
            droplet.y += droplet.ys;

            // move droplet when it falls off-screen
            if (droplet.y > height) {
                createSplash(droplet.x, height);
                droplet.x = Math.random() * width;
                droplet.y = -20;
            } else if (droplet.x > width) {
                droplet.y = Math.random() * height;
                droplet.x = 0;
            } else if (droplet.x < 0) {
                droplet.y = Math.random() * height;
                droplet.x = width;
            }
        }
    }

    if (!noBackground) {
        context.fillStyle = bgStyle;
        context.fillRect(0, 0, width, height);
    } else {
        context.clearRect(0, 0, width, height)
    }

    for (let i = 0; i < droplets.length; i++) {
        const droplet = droplets[i];
        context.beginPath();
        context.moveTo(droplet.x, droplet.y);
        context.lineTo(droplet.x + droplet.l * droplet.xs, droplet.y + droplet.l * droplet.ys);
        context.stroke();
        context.closePath();
    }

    for (let i = 0; i < splashes.length; i++) {
        const s = splashes[i];
        context.beginPath();
        context.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        // context.fillStyle = `rgba(174,194,224,${s.alpha})`;
        context.fillStyle = dropletStyle;
        context.fill();
        context.closePath();
        s.x += s.vx;
        s.y += s.vy;
        s.radius -= 0.005;
        s.alpha -= 0.05;

        if (s.alpha <= 0 || s.radius <= 0) {
            splashes.splice(i, 1);
        }
    }
    move();
}