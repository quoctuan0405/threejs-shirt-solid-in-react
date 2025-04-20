import { createEffect, createSignal, on, onMount, Show } from "solid-js";
import "./App.css";
import { type ReturnCallbacks, mount as mountShirt } from "react-shirt";
import { mount as mountFlow } from "react-flow";
import { Sidebar } from "./components/Sidebar";
import {
	setAccumulateShadowFrame,
	setAmbientLightIntensity,
	setCameraZ,
	setRandomizeLight1Intensity,
	setRandomizeLight2Intensity,
	store,
} from "./store";
import { TopResizer } from "./components/TopResizer";
import { createWindowHeight } from "./hooks/createWindowHeight";

const App = () => {
	// Container
	let shirtContainer!: HTMLDivElement;
	let flowContainer!: HTMLDivElement;

	// Callback to pass data from main Solid app to react shirt
	let onColorChange: ReturnCallbacks["onColorChange"];
	let onLogoUpload: ReturnCallbacks["onLogoUpload"];
	let onAmbientLightingIntensityChange: ReturnCallbacks["onAmbientLightingIntensityChange"];
	let onRandomizeLight1IntensityChange: ReturnCallbacks["onRandomizeLight1IntensityChange"];
	let onRandomizeLight2IntensityChange: ReturnCallbacks["onRandomizeLight2IntensityChange"];
	let onAccumulateShadowFrameChange: ReturnCallbacks["onAccumulateShadowFrameChange"];
	let onCameraZChange: ReturnCallbacks["onCameraZChange"];

	// Mount the react shirt
	onMount(() => {
		const callbacks = mountShirt(shirtContainer);

		onColorChange = callbacks.onColorChange;
		onLogoUpload = callbacks.onLogoUpload;
		onAmbientLightingIntensityChange =
			callbacks.onAmbientLightingIntensityChange;
		onRandomizeLight1IntensityChange =
			callbacks.onRandomizeLight1IntensityChange;
		onRandomizeLight2IntensityChange =
			callbacks.onRandomizeLight2IntensityChange;
		onAccumulateShadowFrameChange = callbacks.onAccumulateShadowFrameChange;
		onCameraZChange = callbacks.onCameraZChange;
	});

	// Mount the react flow (only mount when store.isShowSetting is set to true)
	createEffect(
		on(
			() => store.isShowSetting,
			() => {
				if (store.isShowSetting) {
					mountFlow(flowContainer, {
						// Pass data from react flow to main Solid app
						onAmbientLightingIntensityChange: (intensity) => {
							setAmbientLightIntensity(intensity);
						},
						onRandomizeLight1IntensityChange: (intensity) => {
							setRandomizeLight1Intensity(intensity);
						},
						onRandomizeLight2IntensityChange: (intensity) => {
							setRandomizeLight2Intensity(intensity);
						},
						onAccumulateShadowFrameChange: (frame) => {
							setAccumulateShadowFrame(frame);
						},
						onCameraZChange: (z: number) => {
							setCameraZ(z);
						},
						ambientLightIntensity: store.ambientLightIntensity,
						randomizeLight1Intensity: store.randomizeLight1Intensity,
						randomizeLight2Intensity: store.randomizeLight2Intensity,
						accumulateShadowFrame: store.accumulateShadowFrame,
						cameraZ: store.cameraZ,
					});
				}
			},
		),
	);

	// Pass color and files throught callback
	createEffect(() => {
		onColorChange(store.color);
	});

	createEffect(() => {
		onLogoUpload(store.logoFile);
	});

	createEffect(() => {
		onAmbientLightingIntensityChange(store.ambientLightIntensity);
	});

	createEffect(() => {
		onRandomizeLight1IntensityChange(store.randomizeLight1Intensity);
	});

	createEffect(() => {
		onRandomizeLight2IntensityChange(store.randomizeLight2Intensity);
	});

	createEffect(() => {
		onAccumulateShadowFrameChange(store.accumulateShadowFrame);
	});

	createEffect(() => {
		onCameraZChange(store.cameraZ);
	});

	// Manage height
	const screenHeight = createWindowHeight();
	const [reactFlowHeight, setReactFlowHeight] = createSignal<number>(350);

	createEffect(() => {
		if (!store.isShowSetting) {
			setReactFlowHeight(0);
		} else {
			setReactFlowHeight(350);
		}
	});

	return (
		<div class="relative">
			<Sidebar />

			<div class="w-screen h-screen overflow-hidden">
				{/* React Three Fiber Shirt */}
				<div
					ref={shirtContainer}
					class="w-full"
					style={{ height: `${screenHeight() - reactFlowHeight()}px` }}
				/>

				{/* React flow */}
				<Show when={store.isShowSetting}>
					<TopResizer
						height={reactFlowHeight()}
						onHeightChange={(height) => setReactFlowHeight(height)}
					>
						<div class="w-full h-full" ref={flowContainer} />
					</TopResizer>
				</Show>
			</div>
		</div>
	);
};

export default App;
