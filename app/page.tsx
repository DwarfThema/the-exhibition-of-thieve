"use client";

import * as THREE from "three";
import {
  Environment,
  KeyboardControls,
  OrbitControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import MainScene from "./src/mainScene";
import { Suspense } from "react";
import ToonObject from "./src/obj/toonObject";

export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-between bg-black">
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "w", "W"] },
          { name: "backward", keys: ["ArrowDown", "s", "S"] },
          { name: "left", keys: ["ArrowLeft", "a", "A"] },
          { name: "right", keys: ["ArrowRight", "d", "D"] },
          { name: "jump", keys: ["Space"] },
          { name: "sit", keys: ["v"] },
        ]}
      >
        <Canvas shadows>
          <OrbitControls makeDefault />
          <Suspense fallback={null}>
            <MainScene />
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </main>
  );
}
