import { createSignal, onCleanup, onMount } from "solid-js";

export const createWindowHeight = () => {
	const [screenHeight, setScreenHeight] = createSignal<number>(
		window.innerHeight,
	);

	onMount(() => {
		const resizeHandler = () => {
			setScreenHeight(window.innerHeight);
		};

		window.addEventListener("resize", resizeHandler);

		onCleanup(() => {
			window.removeEventListener("resize", resizeHandler);
		});
	});

	return screenHeight;
};
