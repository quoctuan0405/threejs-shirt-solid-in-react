import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";
import { useSnapshot } from "valtio";
import state from "../store";

export const Backdrop: React.FC = () => {
	// State
	const snapshot = useSnapshot(state);
	return (
		<AccumulativeShadows
			position={[0, 0, -0.14]}
			temporal
			alphaTest={0.85}
			scale={4}
			frames={snapshot.accumulateShadowFrame}
			rotation={[Math.PI / 2, 0, 0]}
		>
			<RandomizedLight
				amount={4}
				radius={9}
				ambient={1}
				intensity={snapshot.randomizeLight1Intensity}
				position={[4, 4, -10]}
			/>

			<RandomizedLight
				amount={4}
				radius={5}
				ambient={1}
				intensity={snapshot.randomizeLight2Intensity}
				position={[0, 0, -5]}
			/>
		</AccumulativeShadows>
	);
};
