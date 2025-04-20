import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
	plugins: [pluginReact()],
	source: {
		entry: {
			index: "./src/main.tsx",
		},
	},
	output: {
		distPath: {
			root: "dist-dev",
		},
	},
});
