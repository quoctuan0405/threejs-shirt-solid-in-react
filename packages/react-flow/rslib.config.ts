import { pluginReact } from "@rsbuild/plugin-react";
import { defineConfig } from "@rslib/core";

export default defineConfig({
	source: {
		entry: {
			index: ["./src/**"],
		},
		exclude: ["./src/main.tsx"],
	},
	lib: [
		{
			bundle: false,
			dts: {
				abortOnError: false,
			},
			format: "esm",
		},
	],
	output: {
		target: "web",
	},
	server: {
		base:
			process.env.NODE_ENV === "development"
				? "/"
				: "/threejs-shirt-solid-in-react",
	},
	plugins: [pluginReact()],
});
