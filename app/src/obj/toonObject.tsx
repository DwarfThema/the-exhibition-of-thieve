import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { theme } from "../properties";

export default function ToonObject({ src, ...props }: { src: string }) {
  const gltf = useGLTF(src) as GLTF;

  const meshs: Mesh[] = [];
  gltf.scene.traverse((obj) => {
    if (obj instanceof Mesh) {
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
            castShadow
            {...props}
          />
        );
      })}
    </>
  );
}
