import { MeshCollider, RigidBody } from "@react-three/rapier";

export function Ground({ children }: { children: React.ReactNode }) {
  return (
    <RigidBody type="fixed" colliders={false}>
      <MeshCollider type="trimesh">{children}</MeshCollider>
    </RigidBody>
  );
}
