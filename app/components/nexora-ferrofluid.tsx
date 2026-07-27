"use client";

import Ferrofluid from "./react-bits/Backgrounds/Ferrofluid/Ferrofluid";

export function NexoraFerrofluid() {
  return (
    <div className="nx-route-ferrofluid" aria-hidden="true">
      <Ferrofluid
        colors={["#2AAEBF", "#2563EB", "#6F27F5"]}
        speed={0.2}
        scale={1.35}
        turbulence={0.9}
        fluidity={0.16}
        rimWidth={0.24}
        sharpness={2.2}
        shimmer={0.9}
        glow={1.65}
        opacity={0.62}
        flowDirection="right"
        mouseInteraction={false}
      />
    </div>
  );
}
