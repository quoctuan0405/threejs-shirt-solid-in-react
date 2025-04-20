import { createEffect, createSignal, type ParentComponent } from "solid-js";

interface Props {
	height: number;
	onHeightChange?: (height: number) => void;
}

export const TopResizer: ParentComponent<Props> = (props) => {
	let container!: HTMLDivElement;

	const [isDragging, setIsDragging] = createSignal<boolean>(false);

	const onDrag = (e: MouseEvent) => {
		if (container) {
			const delta = container.getBoundingClientRect().top - e.pageY;
			props.onHeightChange?.(props.height + delta);
			setIsDragging(true);
		}
	};

	createEffect(() => {
		if (isDragging()) {
			document.body.style.cursor = "n-resize";
		} else {
			document.body.style.cursor = "auto";
		}
	});

	return (
		<div
			ref={container}
			style={{
				height: `${props.height}px`,
			}}
			class="relative w-full"
			classList={{
				"select-none": isDragging(),
			}}
		>
			{/* Handle */}
			<div
				class="absolute z-10 top-0 w-full h-2 cursor-n-resize duration-100"
				classList={{
					"hover:bg-blue-400": !isDragging(),
					"bg-blue-500": isDragging(),
				}}
				onMouseDown={() => {
					document.addEventListener("mousemove", onDrag);

					document.addEventListener("mouseup", () => {
						document.removeEventListener("mousemove", onDrag);
						setIsDragging(false);
					});
				}}
			/>

			{/* Children */}
			<div class="w-full h-full">{props.children}</div>
		</div>
	);
};
