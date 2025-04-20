import { createStore, produce } from "solid-js/store";

interface Store {
	color: string;
	logoFile: string;
	ambientLightIntensity: number;
	randomizeLight1Intensity: number;
	randomizeLight2Intensity: number;
	accumulateShadowFrame: number;
	cameraZ: number;
	isShowSetting: boolean;
}

export const [store, setStore] = createStore<Store>({
	color: "#4f84e8",
	logoFile: "./threejs.png",
	ambientLightIntensity: 1.75,
	randomizeLight1Intensity: 1.75,
	randomizeLight2Intensity: 1.6,
	accumulateShadowFrame: 20,
	cameraZ: 2,
	isShowSetting: true,
});

export const setColor = (color: string) => {
	setStore(
		produce((store) => {
			store.color = color;
		}),
	);
};

export const setLogoFile = (logoFile: string) => {
	setStore(
		produce((store) => {
			store.logoFile = logoFile;
		}),
	);
};

export const setAmbientLightIntensity = (intensity: number) => {
	setStore(
		produce((store) => {
			store.ambientLightIntensity = intensity;
		}),
	);
};

export const setRandomizeLight1Intensity = (intensity: number) => {
	setStore(
		produce((store) => {
			store.randomizeLight1Intensity = intensity;
		}),
	);
};

export const setRandomizeLight2Intensity = (intensity: number) => {
	setStore(
		produce((store) => {
			store.randomizeLight2Intensity = intensity;
		}),
	);
};

export const setAccumulateShadowFrame = (frame: number) => {
	setStore(
		produce((store) => {
			store.accumulateShadowFrame = frame;
		}),
	);
};

export const setCameraZ = (z: number) => {
	setStore(
		produce((store) => {
			store.cameraZ = z;
		}),
	);
};

export const toggleIsShowSetting = () => {
	setStore(
		produce((store) => {
			store.isShowSetting = !store.isShowSetting;
		}),
	);
};
