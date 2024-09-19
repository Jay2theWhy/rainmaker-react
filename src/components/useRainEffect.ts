import { RefObject, MutableRefObject, useEffect } from 'react';
import { createRainState, RainEffectState } from './RainState';
import { drawRainEffect } from './drawRainEffect';

export interface Options {
    count: number
    fps: number
}

export function useRainEffect(
    canvasRef: RefObject<HTMLCanvasElement>,
    options: Options,
    stateReference: MutableRefObject<RainEffectState>,
) {
    const initialState = stateReference.current || createRainState({
        count: options.count,
        fps: options.fps,
    });
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d')
        if (!context) return;

        canvas.width = initialState.width;
        canvas.height = initialState.height;

        const setCanvasStyles = () => {
            context.strokeStyle = "rgba(174,194,224,1)";
            context.lineWidth = 1;
            context.lineCap = "round";
        }
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
                    ...initialState
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