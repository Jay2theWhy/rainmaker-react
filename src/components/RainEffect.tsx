import React, { useRef, useEffect } from "react";
import "./RainEffect.css";
import { createRainState, RainEffectState } from "./RainState";
import { useRainEffect } from "./useRainEffect";

interface Props {
    count?: number
    fps?: number
    fallSpeed?: number
    jitterX?: number
    className?: string
}

export const RainEffect: React.FC<Props> = ({
    count = 1000,
    fps = 60,
    fallSpeed = 6,
    jitterX = 0.1,
    ...restProps
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const stateReference = useRef<RainEffectState>(createRainState({
        count,
        fps,
        fallSpeed,
        jitterX,
    }));

    useRainEffect(canvasRef, {
        count,
        fps,
        fallSpeed,
        jitterX,
    }, stateReference);

    return <canvas
        ref={canvasRef}
        {...{ count, fps }}
        {...restProps}
    />
}