import { proxy } from "valtio";

const state = proxy({
	color: "#4f84e8",
	isLogoTexture: true,
	logoDecal: "./threejs.png",
	ambientLightIntensity: 1,
	randomizeLight1Intensity: 1.75,
	randomizeLight2Intensity: 1.6,
	accumulateShadowFrame: 20,
	cameraZ: 2,
});

export default state;
