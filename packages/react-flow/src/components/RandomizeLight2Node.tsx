import { useCallback } from "react";
import { Card } from "./Card";
import { Handle, Position } from "@xyflow/react";
import { callbacks, initialValue } from "..";
import { Slider } from "./Slider";

export const RandomizeLight2Node: React.FC = () => {
	const onChange = useCallback((value: number) => {
		callbacks?.onRandomizeLight2IntensityChange?.(value);
	}, []);

	return (
		<>
			<Card
				header="Randomize light 2"
				body={
					<Slider
						initialValue={initialValue?.randomizeLight2Intensity || 1.5}
						min={0}
						max={3}
						stepSize={0.01}
						onChange={onChange}
					/>
				}
			/>

			<Handle type="source" position={Position.Right} />
		</>
	);
};
