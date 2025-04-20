import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import state from "./store";

// Pass data from the main solid app to this React app
export interface ReturnCallbacks {
	onColorChange: (color: string) => void;
	onLogoUpload: (logoDecal: string) => void;
	onAmbientLightingIntensityChange: (intensity: number) => void;
	onRandomizeLight1IntensityChange: (intensity: number) => void;
	onRandomizeLight2IntensityChange: (intensity: number) => void;
	onAccumulateShadowFrameChange: (frame: number) => void;
	onCameraZChange: (frame: number) => void;
}

const returnCallbacks: ReturnCallbacks = {
	onColorChange: (color) => {
		state.color = color;
	},
	onLogoUpload: (logoDecal) => {
		state.logoDecal = logoDecal;
	},
	onAmbientLightingIntensityChange: (intensity) => {
		state.ambientLightIntensity = intensity;
	},
	onRandomizeLight1IntensityChange: (intensity) => {
		state.randomizeLight1Intensity = intensity;
	},
	onRandomizeLight2IntensityChange: (intensity) => {
		state.randomizeLight2Intensity = intensity;
	},
	onAccumulateShadowFrameChange: (frame) => {
		state.accumulateShadowFrame = frame;
	},
	onCameraZChange: (z) => {
		state.cameraZ = z;
	},
};

// Options (fullscreen: for running this app independently)
interface Options {
	fullscreen?: boolean;
}

// Mount
let root: ReactDOM.Root | undefined = undefined;

export const mount = (
	rootEl: Element | null | undefined,
	options?: Options,
): ReturnCallbacks => {
	// If not provided with a component to render, return
	if (!rootEl) {
		return returnCallbacks;
	}

	// If already render before, unmount it
	if (root) {
		root.unmount();
	}

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

	return returnCallbacks;
};
