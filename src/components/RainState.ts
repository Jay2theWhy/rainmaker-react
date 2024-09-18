export interface RainEffectState {
    width: number
    height: number
    particles: ParticleState[]
}

export interface ParticleState {
    x: number;
    y: number;
    l: number;
    xs: number;
    ys: number;
}

export function createRainState (options: { count: number }): RainEffectState {
    let width = window.innerWidth;
    let height = window.innerHeight;

    return {
        width,
        height,
        particles: createParticles(width, height, options.count),
    }

}

export function createParticles(
    width: number,
    height: number,
    count: number,
): ParticleState[] {
    let particles: ParticleState[] = []
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            l: Math.random(),
            xs: -4 + Math.random() * 4 + 2,
            ys: Math.random() * 10 + 10,
        });
    }
    return particles
}