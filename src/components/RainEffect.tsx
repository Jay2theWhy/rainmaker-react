import React, { useRef, useEffect } from "react";
import "./RainEffect.css";
import { createRainState, RainEffectState } from "./RainState";
import { useRainEffect } from "./useRainEffect";

interface Props {
    count?: number
    className?: string
}

export const RainEffect: React.FC<Props> = ({
    count = 1000,
    ...restProps
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const stateReference = useRef<RainEffectState>(createRainState({
        count,
    }));

    useRainEffect(canvasRef, {
        count,
    }, stateReference);

    return <canvas
        ref={canvasRef}
        {...{ count }}
        {...restProps}
    />
}