import * as THREE from "three";
import * as RAPIER from "@dimforge/rapier3d-compat";
import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { PointerLockControls, useKeyboardControls } from "@react-three/drei";
import {
  CapsuleCollider,
  RapierRigidBody,
  RigidBody,
  useRapier,
} from "@react-three/rapier";
import { IPos, IRot } from "../properties";

var SPEED = 2;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const rotation = new THREE.Vector3();

interface IPlayer {
  lerp?: any;
  pos?: IPos;
  rot?: IRot;
  speed?: number;
  tall?: number;
}

export function Player({
  lerp,
  pos = { x: 0, y: 10, z: 0 },
  rot = { x: 0, y: 0, z: 0 },
}: IPlayer) {
  const ref = useRef<RapierRigidBody | null>(null);
  lerp = THREE.MathUtils.lerp;
  const [jumping, setJumping] = useState(true);
  const rapier = useRapier();
  const [, get] = useKeyboardControls();
  const { camera: cameraInitial } = useThree();

  useEffect(() => {
    if (rot?.x == undefined || rot?.y == undefined || rot?.z == undefined) {
      cameraInitial.rotation.x = 0;
      cameraInitial.rotation.y = 0;
      cameraInitial.rotation.z = 0;
    } else {
      cameraInitial.rotation.x = rot.x;
      cameraInitial.rotation.y = rot.y;
      cameraInitial.rotation.z = rot.z;
    }
  }, [rot]);

  useFrame((state) => {
    const { forward, backward, left, right, jump, sit } = get() as any;
    const velocity = ref?.current?.linvel();

    //camera Update
    const position = ref?.current?.translation() as THREE.Vector3;
    state.camera.position.set(position?.x, position?.y, position?.z);

    //movemont
    frontVector.set(0, 0, backward - forward);
    sideVector.set(left - right, 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(state.camera.rotation);

    // Apply linear velocity to Player.
    ref?.current?.setLinvel(
      {
        x: direction.x,
        y: velocity?.y as number,
        z: direction.z,
      },
      true
    );

    // Jumping
    const world = rapier?.world;
    const ray = world?.castRay(
      new RAPIER.Ray(position, { x: 0, y: -1, z: 0 }),
      1.599,
      false
    );
    const grounded = ray && ray.collider && Math.abs(ray.toi) <= 1.7;

    if (jump && grounded && jumping) {
      ref?.current?.setLinvel({ x: 0, y: 5, z: 0 }, true);
      setJumping(false);
      setTimeout(() => setJumping(true), 500);
    }

    if (sit && grounded) {
      state.camera.position.set(position?.x, position?.y - 0.5, position?.z);
    }
  });

  return (
    <>
      <RigidBody
        ref={ref}
        colliders={false}
        mass={1}
        type="dynamic"
        position={
          pos?.x == undefined || pos?.y == undefined || pos?.z == undefined
            ? [0, 0, 0]
            : [pos.x, pos.y, pos.z]
        }
        enabledRotations={[false, false, false]}
      >
        <CapsuleCollider args={[1.3, 0.3]} rotation={[0, Math.PI, 0]} />
      </RigidBody>
      <PointerLockControls />
    </>
  );
}
