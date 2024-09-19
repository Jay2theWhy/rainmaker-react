import { Options } from "./useRainEffect";

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
export function createRainState (options: Options): RainEffectState {
    let width = window.innerWidth;
    let height = window.innerHeight;

    return {
        width,
        height,
        droplets: createDroplets(width, height, options.count, options.fallSpeed, options.jitterX),
        splashes: [],
    }
}

export function createDroplets(
    width: number,
    height: number,
    count: number,
    fallSpeed: number,
    jitterX: number,
): DropletState[] {
    let droplets: DropletState[] = []
    for (let i = 0; i < count; i++) {
        droplets.push({
            x: Math.random() * width,
            y: Math.random() * height,
            l: Math.random(),
            xs: Math.random() * fallSpeed * jitterX - fallSpeed * jitterX / 2,
            ys: Math.random() * fallSpeed / 2 + fallSpeed,
        });
    }
    return droplets;
}