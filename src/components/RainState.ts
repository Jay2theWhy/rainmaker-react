import { Options } from "./useRainEffect";

export interface RainEffectState {
  width: number;
  height: number;
  droplets: DropletState[];
  splashes: SplashState[];
  dropletStyle: string;
  bgStyle: string;
  noBackground: boolean;
}

export interface DropletState {
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
export function createRainState(options: Options): RainEffectState {
  let width = window.innerWidth;
  let height = window.innerHeight;

  return {
    width,
    height,
    droplets: createDroplets(
      width,
      height,
      options.count,
      options.fallSpeed,
      options.jitterX,
      options.dropletLength,
      options.wind
    ),
    splashes: [],
    dropletStyle: options.dropletStyle,
    bgStyle: options.bgStyle,
    noBackground: options.noBackground,
  };
}

export function createDroplets(
  width: number,
  height: number,
  count: number,
  fallSpeed: number,
  jitterX: number,
  dropletLength: number,
  wind: number
): DropletState[] {
  let droplets: DropletState[] = [];
  for (let i = 0; i < count; i++) {
    droplets.push({
      x: Math.random() * width,
      y: Math.random() * height,
      l:
        Math.random() * (dropletLength - 0.75 * dropletLength) +
        0.75 * dropletLength, // vary length +/- 25%
      xs:
        Math.random() * fallSpeed * jitterX - (fallSpeed * jitterX) / 2 + wind,
      ys: (Math.random() * fallSpeed) / 2 + fallSpeed,
    });
  }
  return droplets;
}
