import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { theme } from "../properties";

export default function Church({ ...props }) {
  const gltf = useGLTF("/models/church.gltf") as GLTF;

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
            position={mesh.position}
            receiveShadow={true}
            castShadow={true}
            {...props}
          >
            <meshToonMaterial color={theme.mainColor} />
          </mesh>
        );
      })}
    </>
  );
}
