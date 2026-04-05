import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// `base: "./"` makes the built site portable — works on GitHub Pages
// project sites (user.github.io/repo) and user/org sites alike.
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist",
  },
});
