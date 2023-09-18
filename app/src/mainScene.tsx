import { Physics } from "@react-three/rapier";
import { Ground } from "./ground";
import ChurchCol from "./church/churchCol";
import { Player } from "./church/player";
import { useControls } from "leva";
import { Environment, Gltf, OrbitControls } from "@react-three/drei";
import Church from "./church/church";
import ToonObject from "./obj/toonObject";
import { DoubleSide, Object3D } from "three";
import { useRef } from "react";

export default function MainScene() {
  const { objX, objY, objZ, power } = useControls({
    objX: { value: 0, step: 0.5 },
    objY: { value: 24, step: 0.5 },
    objZ: { value: -120, step: 0.5 },
    power: { value: 500, min: 0, step: 0.1 },
  });

  return (
    <>
      <mesh scale={1} position={[objX, objY, objZ]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <pointLight position={[0, 25, -5]} intensity={2000} />
      <group name="innerLit">
        <pointLight
          name="centerLit"
          position={[0, 25, -70]}
          intensity={1000}
          shadow-mapSize-width={512 * 2}
          shadow-mapSize-height={512 * 2}
          shadow-bias={-0.0005}
          receiveShadow
          castShadow
        />
        <pointLight
          name="angelLit"
          position={[objX, objY, objZ]}
          intensity={power}
          shadow-mapSize-width={512 * 2}
          shadow-mapSize-height={512 * 2}
          shadow-bias={-0.0005}
          receiveShadow
          castShadow
        />
      </group>
      <Physics gravity={[0, -0.5, 0]}>
        <Church />
        <ToonObject src="/models/obj_Lion.gltf" />
        <ToonObject src="/models/obj_angel.gltf" />
        <ToonObject src="/models/obj_LyingWoman.gltf" />
        <Ground>
          <ChurchCol />
        </Ground>
        <Player pos={{ x: 0, y: 1, z: 0 }} rot={{ x: 0, y: 0, z: 0 }} />
      </Physics>
    </>
  );
}
