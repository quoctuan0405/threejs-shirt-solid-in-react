import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import state from "../store";

export const Shirt: React.FC = () => {
  const snapshot = useSnapshot(state);

  const { nodes, materials } = useGLTF("/shirt_baked.glb");
  const logoTexture = useTexture(snapshot.logoDecal);

  useFrame((_state, delta) => {
    // @ts-ignore
    easing.dampC(materials.lambert1.color, snapshot.color, 0.25, delta);
  });

  return (
    <group key={JSON.stringify(snapshot)}>
      <mesh
        castShadow
        // @ts-ignore
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        <Decal
          position={[0, 0.04, 0.15]}
          rotation={[0, 0, 0]}
          scale={0.15}
          map={logoTexture}
          depthTest={false}
        />
      </mesh>
    </group>
  );
};
