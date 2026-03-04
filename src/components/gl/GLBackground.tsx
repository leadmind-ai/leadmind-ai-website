"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Effects } from "@react-three/drei";
import { Particles } from "./Particles";
import { VignetteShader } from "./shaders/vignetteShader";

type GLBackgroundProps = {
  hovering?: boolean;
  bgColor?: string;
};

export default function GLBackground({
  hovering = false,
  bgColor = "#1a365d",
}: GLBackgroundProps) {
  const [fallback, setFallback] = useState(false);

  if (fallback) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Canvas
        camera={{
          position: [1.26, 2.66, -1.82],
          fov: 50,
          near: 0.01,
          far: 300,
        }}
        onCreated={(state) => {
          state.gl.setClearColor(bgColor);
        }}
        gl={{ antialias: false, alpha: false }}
        onError={() => setFallback(true)}
      >
        <color attach="background" args={[bgColor]} />
        <Particles introspect={hovering} />
        <Effects multisamping={0} disableGamma>
          <shaderPass
            args={[VignetteShader]}
            uniforms-darkness-value={1.5}
            uniforms-offset-value={0.4}
          />
        </Effects>
      </Canvas>
    </div>
  );
}
