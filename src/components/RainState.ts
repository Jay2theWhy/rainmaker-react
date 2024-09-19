export interface RainEffectState {
    width: number
    height: number
    droplets: DropletState[],
    splashes: SplashState[],
}

export interface DropletState{
    x: number;
    y: number;
    l: number;
    xs: number;
    ys: number;
}

export interface SplashState {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    alpha: number;
}

// create initial droplets
export function createRainState (options: { count: number }): RainEffectState {
    let width = window.innerWidth;
    let height = window.innerHeight;

    return {
        width,
        height,
        droplets: createDroplets(width, height, options.count),
        splashes: [],
    }
}

export function createDroplets(
    width: number,
    height: number,
    count: number,
): DropletState[] {
    let droplets: DropletState[] = []
    for (let i = 0; i < count; i++) {
        droplets.push({
            x: Math.random() * width,
            y: Math.random() * height,
            l: Math.random(),
            xs: -4 + Math.random() * 4 + 2,
            ys: Math.random() * 10 + 10,
        });
    }
    return droplets;
}