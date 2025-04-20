import { useCallback } from "react";
import { Card } from "./Card";
import { Handle, Position } from "@xyflow/react";
import { callbacks, initialValue } from "..";
import { Slider } from "./Slider";

export const CameraNode: React.FC = () => {
	const onChange = useCallback((value: number) => {
		callbacks?.onCameraZChange?.(value);
	}, []);

	return (
		<>
			<Handle type="target" position={Position.Left} />

			<Card
				header="Camera"
				body={
					<div className="w-40">
						<Slider
							initialValue={initialValue?.cameraZ || 2}
							min={0.75}
							max={5}
							stepSize={0.01}
							onChange={onChange}
						/>
					</div>
				}
			/>
		</>
	);
};
