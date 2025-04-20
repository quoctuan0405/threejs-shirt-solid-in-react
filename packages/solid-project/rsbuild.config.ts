import { defineConfig } from "@rsbuild/core";
import { pluginBabel } from "@rsbuild/plugin-babel";
import { pluginSolid } from "@rsbuild/plugin-solid";

export default defineConfig({
	server: {
		base:
			process.env.NODE_ENV === "development"
				? "/"
				: "/threejs-shirt-solid-in-react",
	},
	html: {
		title: "ThreeJS shirt Solid in React",
	},
	plugins: [
		pluginBabel({
			include: /\.(?:jsx|tsx)$/,
		}),
		pluginSolid(),
	],
});
