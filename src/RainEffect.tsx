import React, { useRef } from "react";
import "./RainEffect.css";
import { createRainState, RainEffectState } from "./RainState";
import { useRainEffect } from "./useRainEffect";

interface Props {
  count?: number;
  fps?: number;
  fallSpeed?: number;
  jitterX?: number;
  dropletLength?: number;
  dropletWidth?: number;
  dropletStyle?: string;
  wind?: number;
  bgStyle?: string;
  noBackground?: boolean;
  className?: string;
}

export const RainEffect: React.FC<Props> = ({
  count = 1000,
  fps = 60,
  fallSpeed = 6,
  jitterX = 0.1,
  dropletLength = 3,
  dropletWidth = 2,
  dropletStyle = "rgba(43, 133, 194, 0.6)",
  wind = 0,
  bgStyle = "rgb(64, 93, 112)",
  noBackground = false,
  ...restProps
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateReference = useRef<RainEffectState>(
    createRainState({
      count,
      fps,
      fallSpeed,
      jitterX,
      dropletLength,
      dropletWidth,
      dropletStyle,
      wind,
      bgStyle,
      noBackground,
    })
  );

  useRainEffect(
    canvasRef,
    {
      count,
      fps,
      fallSpeed,
      jitterX,
      dropletLength,
      dropletWidth,
      dropletStyle,
      wind,
      bgStyle,
      noBackground,
    },
    stateReference
  );

  return <canvas ref={canvasRef} {...{ count, fps }} {...restProps} />;
};
