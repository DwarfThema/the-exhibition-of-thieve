import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { theme } from "../properties";

export default function ChurchCol({ ...props }) {
  const gltf = useGLTF("/models/ground.gltf") as GLTF;

  const meshs: Mesh[] = [];
  gltf.scene.traverse((obj) => {
    if (obj instanceof Mesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
      meshs.push(obj);
    }
  });

  return (
    <>
      {meshs.map((mesh, index) => {
        return (
          <mesh
            key={index}
            geometry={mesh.geometry}
            material={mesh.material}
            position={mesh.position}
            receiveShadow={true}
          >
            {mesh.name === "Ground_Col" ? null : (
              <meshToonMaterial color={theme.mainColor} />
            )}
          </mesh>
        );
      })}
    </>
  );
}
