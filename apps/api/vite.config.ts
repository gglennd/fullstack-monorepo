import { nitro } from "nitro/vite";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    nitro({
      serverEntry: path.resolve(__dirname, "src/server.ts"),
    }),
  ],
});
