import { Options } from "./useRainEffect";

export interface RainEffectState {
  width: number;
  height: number;
  droplets: DropletState[];
  splashes: SplashState[];
  dropletStyle: string;
  bgStyle: string;
  noBackground: boolean;
  fallSpeed: number;
  wind: number;
  updateProps: (options: Options) => void;
  updateDroplets: (newCount: number, options: Options) => void;
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
      options
    ),
    splashes: [],
    dropletStyle: options.dropletStyle,
    bgStyle: options.bgStyle,
    noBackground: options.noBackground,
    fallSpeed: options.fallSpeed,
    wind: options.wind,
    updateProps,
    updateDroplets,
  };
}

export function createDroplets(
  width: number,
  height: number,
  options: Options,
): DropletState[] {
  let droplets: DropletState[] = [];
  for (let i = 0; i < options.count; i++) {
    droplets.push(createDroplet(width, height, options));
  }
  return droplets;
}

function createDroplet(
  width: number,
  height: number,
  options: Options
): DropletState {
  const { fallSpeed, jitterX, dropletLength, wind } = options;
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    l:
      Math.random() * (dropletLength - 0.75 * dropletLength) +
      0.75 * dropletLength,
    xs:
      Math.random() * fallSpeed * jitterX -
      (fallSpeed * jitterX) / 2 +
      wind,
    ys: (Math.random() * fallSpeed) / 2 + fallSpeed,
  };
}

function updateProps(this: RainEffectState, options: Options) {
  this.dropletStyle = options.dropletStyle
  this.bgStyle = options.bgStyle;
  this.noBackground = options.noBackground;
  this.fallSpeed = options.fallSpeed;
  this.wind = options.wind;

  // Adjust droplets
  this.updateDroplets(options.count, options);
}

function updateDroplets(this: RainEffectState, newCount: number, options: Options) {
  const currentCount = this.droplets.length;
  if (newCount > currentCount) {
    for (let i = 0; i < newCount - currentCount; i++) {
      this.droplets.push(createDroplet(this.width, this.height, options))
    }
  } else if (newCount < currentCount) {
    // remove excess droplets
    this.droplets.splice(newCount, currentCount - newCount);
  }

  // Update existing droplets
  for (const droplet of this.droplets) {
    droplet.xs =
      Math.random() * options.fallSpeed * options.jitterX -
      (options.fallSpeed * options.jitterX) / 2 +
      options.wind;
    droplet.ys = (Math.random() * options.fallSpeed) / 2 + options.fallSpeed;
    droplet.l =
      Math.random() * (options.dropletLength - 0.75 * options.dropletLength) +
      0.75 * options.dropletLength;
  }
}