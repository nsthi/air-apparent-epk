import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import {fileURLToPath} from "node:url";
export default defineConfig({base:"/private/mio-pitch/",plugins:[react()],resolve:{alias:{"@":fileURLToPath(new URL("./src",import.meta.url))}}});
