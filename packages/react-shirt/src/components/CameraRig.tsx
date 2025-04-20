import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import type { Group, Object3DEventMap } from "three";
import { useSnapshot } from "valtio";
import state from "../store";

interface Props {
	children?: React.ReactNode;
}

export const CameraRig: React.FC<Props> = ({ children }) => {
	// State
	const snapshot = useSnapshot(state);

	// Ref
	const group = useRef<Group<Object3DEventMap>>(null);

	// Easing smoothly
	useFrame((state, delta) => {
		// Set the initial position of the model
		easing.damp3(state.camera.position, [0, 0, snapshot.cameraZ], 0.25, delta);

		// Set the model rotation smoothly
		if (group.current) {
			easing.dampE(
				group.current.rotation,
				[state.pointer.y / 5, -state.pointer.x / 2.5, 0],
				0.25,
				delta,
			);
		}
	});

	return <group ref={group}>{children}</group>;
};
