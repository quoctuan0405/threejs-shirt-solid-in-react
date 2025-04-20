import { useCallback } from "react";
import { Card } from "./Card";
import { Handle, Position } from "@xyflow/react";
import { callbacks, initialValue } from "..";
import { Slider } from "./Slider";

export const AmbientLightNode: React.FC = () => {
	const onChange = useCallback((value: number) => {
		callbacks?.onAmbientLightingIntensityChange?.(value);
	}, []);

	return (
		<>
			<Card
				header="Ambient light"
				body={
					<Slider
						initialValue={initialValue?.ambientLightIntensity || 1}
						min={0}
						max={5}
						stepSize={0.01}
						onChange={onChange}
					/>
				}
			/>

			<Handle type="source" position={Position.Right} />
		</>
	);
};
