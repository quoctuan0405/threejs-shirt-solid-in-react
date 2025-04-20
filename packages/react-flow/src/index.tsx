import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

// Pass data from this app to the main Solid app
interface Callbacks {
	onAmbientLightingIntensityChange?: (intensity: number) => void;
	onRandomizeLight1IntensityChange?: (intensity: number) => void;
	onRandomizeLight2IntensityChange?: (intensity: number) => void;
	onAccumulateShadowFrameChange?: (frame: number) => void;
	onCameraZChange?: (z: number) => void;
}

export let callbacks: Callbacks | undefined;

// Initial values
interface InitialValue {
	ambientLightIntensity: number;
	randomizeLight1Intensity: number;
	randomizeLight2Intensity: number;
	accumulateShadowFrame: number;
	cameraZ: number;
}

export let initialValue: InitialValue | undefined;

// Options (fullscreen: for running this app independently)
interface Options {
	fullscreen?: boolean;
}

// Mount
let root: ReactDOM.Root | undefined = undefined;

export const mount = (
	rootEl: Element | null | undefined,
	props?: Callbacks & InitialValue,
	options?: Options,
) => {
	// If not provided with a component to render, return
	if (!rootEl) {
		return;
	}

	// If already render before, unmount it
	if (root) {
		root.unmount();
	}

	// Callbacks
	callbacks = props;

	// Initial value
	initialValue = props;

	// Options
	let AppWrapper: React.FC = App;

	if (options?.fullscreen) {
		AppWrapper = () => (
			<div className="w-screen h-screen">
				<App />
			</div>
		);
	}

	// Render on root element
	root = ReactDOM.createRoot(rootEl);
	root.render(
		<React.StrictMode>
			<AppWrapper />
		</React.StrictMode>,
	);
};
