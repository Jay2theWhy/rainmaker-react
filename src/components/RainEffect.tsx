import React, { useRef, useEffect } from "react";
import "./RainEffect.css";
import { createRainState, RainEffectState } from "./RainState";
import { useRainEffect } from "./useRainEffect";

interface Props {
    width?: number
    height?: number
    count?: number
    className?: string
}

export const RainEffect: React.FC<Props> = ({
    width = window.innerWidth,
    height = window.innerHeight,
    count = 1000,
    ...restProps
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const stateReference = useRef<RainEffectState>(createRainState({
        height,
        width,
        count,
    }));

    useRainEffect(canvasRef, {
        width,
        height,
        count,
    }, stateReference);

    return <canvas
        ref={canvasRef}
        {...{ width, height }}
        {...restProps}
    />
}