import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    nitro({
      devServer: {
        port: 5173,
      },
      serverEntry: path.resolve(__dirname, "src/server.ts"),
    }),
    devtools({
      removeDevtoolsOnBuild: true,
    }),
    tailwindcss(),
    tanstackStart({
      server: {
        entry: path.resolve(__dirname, "src/server.ts"),
      },
    }),
    react(),
  ],
});
