import { defineConfig } from "@rslib/core";
import { pluginReact } from "@rsbuild/plugin-react";

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
  plugins: [pluginReact()],
});
