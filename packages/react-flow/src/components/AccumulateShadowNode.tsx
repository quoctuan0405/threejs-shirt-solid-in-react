import { useCallback } from "react";
import { Card } from "./Card";
import { Handle, Position } from "@xyflow/react";
import { callbacks, initialValue } from "..";
import { Slider } from "./Slider";

export const AccumulateShadowNode: React.FC = () => {
	const onChange = useCallback((value: number) => {
		callbacks?.onAccumulateShadowFrameChange?.(value);
	}, []);

	return (
		<>
			<Handle type="target" position={Position.Left} />

			<Card
				header="Accumulate shadow"
				body={
					<Slider
						initialValue={initialValue?.accumulateShadowFrame || 20}
						min={0}
						max={100}
						stepSize={1}
						onChange={onChange}
					/>
				}
			/>

			<Handle type="source" position={Position.Right} />
		</>
	);
};
