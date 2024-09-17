import { RefObject, MutableRefObject, useEffect } from 'react';
import { createRainState, RainEffectState } from './RainState';
import { drawRainEffect } from './drawRainEffect';

export interface Options {
    count: number
    width: number
    height: number
}

export function useRainEffect(
    canvasRef: RefObject<HTMLCanvasElement>,
    options: Options,
    stateReference: MutableRefObject<RainEffectState>,
) {
    const initialState = stateReference.current || createRainState({
        count: options.count,
        height: options.height,
        width: options.width,
    });
    
    if (options.count !== initialState.particles.length) {
        if (initialState.particles.length < options.count) {
            const { particles } = createRainState({
                count: options.count - initialState.particles.length,
                height: options.height,
                width: options.width,
            });
            initialState.particles = [...initialState.particles, ...particles]
        } else {
            initialState.particles.splice(0, initialState.particles.length - options.count)
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d')
        if (!context) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const setCanvasStyles = () => {
            context.strokeStyle = "rgba(174,194,224,1)";
            context.lineWidth = 1;
            context.lineCap = "round";
        }
        setCanvasStyles();

        const fallingSpeed: number = 30;
        const interval = 1000 / fallingSpeed;
        let lastTime = performance.now();

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

        // render
        animationFrameId = requestAnimationFrame(render);

        // Handle window resize
        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
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