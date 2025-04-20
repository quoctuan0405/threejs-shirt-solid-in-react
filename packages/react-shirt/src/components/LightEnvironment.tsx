import { Environment } from "@react-three/drei";
import { useSnapshot } from "valtio";
import state from "../store";
import { useRef } from "react";
import type { AmbientLight } from "three";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

export const LightEnvironment: React.FC = () => {
	// State
	const snapshot = useSnapshot(state);

	// Ref
	const ambientLight = useRef<AmbientLight>(null);

	// Easing smoothly
	useFrame((_state, delta) => {
		if (ambientLight.current) {
			easing.damp(
				ambientLight.current,
				"intensity",
				snapshot.ambientLightIntensity,
				0.25,
				delta,
			);
		}
	});

	return (
		<>
			<ambientLight ref={ambientLight} />
			<Environment preset="city" />
		</>
	);
};
