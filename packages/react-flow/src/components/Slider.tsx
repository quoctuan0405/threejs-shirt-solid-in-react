import React, { useEffect, useRef, useState } from "react";
import { useRanger, type Ranger } from "@tanstack/react-ranger";
import { callbacks } from "..";

interface Props {
	initialValue: number;
	min: number;
	max: number;
	stepSize: number;
	onChange?: (value: number) => void;
}

export const Slider = React.memo<Props>(
	({ initialValue, min, max, stepSize, onChange }) => {
		const rangerRef = useRef<HTMLDivElement>(null);
		const [value, setValue] = useState<number>(initialValue);

		const rangerInstance = useRanger<HTMLDivElement>({
			getRangerElement: () => rangerRef.current,
			values: [value],
			min,
			max,
			stepSize,
			onChange: (instance: Ranger<HTMLDivElement>) => {
				onChange?.(instance.sortedValues[0]);
			},
			onDrag: (instance: Ranger<HTMLDivElement>) => {
				setValue(instance.sortedValues[0]);
			},
		});

		// Debounce
		useEffect(() => {
			const timeoutId = setTimeout(() => {
				onChange?.(value);
			}, 100);

			return () => clearTimeout(timeoutId);
		}, [value, onChange]);

		return (
			<div
				ref={rangerRef}
				className="relative select-none w-full h-2 bg-neutral-200 rounded-full"
			>
				{/* Segment */}
				{(() => {
					const { left, width } = rangerInstance.getSteps()[0];

					return (
						<div
							className="absolute h-full bg-blue-300 rounded-full"
							style={{ left: `${left}%`, width: `${width}%` }}
						/>
					);
				})()}

				{/* Handle */}
				{(() => {
					const { value, onKeyDownHandler, onMouseDownHandler, onTouchStart } =
						rangerInstance.handles()[0];

					return (
						<button
							type="button"
							className="absolute top-1/2 z-10 w-4 h-4 outline-none rounded-full bg-blue-400 cursor-grab"
							onKeyDown={onKeyDownHandler}
							onMouseDown={onMouseDownHandler}
							onTouchStart={onTouchStart}
							role="slider"
							aria-valuemin={rangerInstance.options.min}
							aria-valuemax={rangerInstance.options.max}
							aria-valuenow={value}
							style={{
								left: `${rangerInstance.getPercentageForValue(value)}%`,
								transform: "translate(-50%, -50%)",
							}}
						/>
					);
				})()}
			</div>
		);
	},
);
