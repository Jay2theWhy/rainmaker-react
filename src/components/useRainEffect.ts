import { RefObject, MutableRefObject, useEffect } from "react";
import { createRainState, RainEffectState } from "./RainState";
import { drawRainEffect } from "./drawRainEffect";

export interface Options {
  count: number;
  fps: number;
  fallSpeed: number;
  jitterX: number;
  dropletLength: number;
  dropletWidth: number;
  dropletStyle: string;
  wind: number;
  bgStyle: string;
  noBackground: boolean;
}

export function useRainEffect(
  canvasRef: RefObject<HTMLCanvasElement>,
  options: Options,
  stateReference: MutableRefObject<RainEffectState>
) {
  const initialState =
    stateReference.current ||
    createRainState({
      count: options.count,
      fps: options.fps,
      fallSpeed: options.fallSpeed,
      jitterX: options.jitterX,
      dropletLength: options.dropletLength,
      dropletWidth: options.dropletWidth,
      dropletStyle: options.dropletStyle,
      wind: options.wind,
      bgStyle: options.bgStyle,
      noBackground: options.noBackground,
    });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = initialState.width;
    canvas.height = initialState.height;

    const setCanvasStyles = () => {
      context.strokeStyle = options.dropletStyle;
      context.lineWidth = options.dropletWidth;
      context.lineCap = "round";
    };
    setCanvasStyles();

    const interval = 1000 / options.fps;
    let lastTime = performance.now();

    // render
    let animationFrameId: number;
    const render = (now: number) => {
      animationFrameId = requestAnimationFrame(render);
      const delta: number = now - lastTime;
      if (delta >= interval) {
        lastTime = now - (delta % interval);
        drawRainEffect({
          context,
          ...initialState,
        });
      }
    };
    animationFrameId = requestAnimationFrame(render);

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initialState.width = canvas.width;
      initialState.height = canvas.height;
      setCanvasStyles();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  });
}
