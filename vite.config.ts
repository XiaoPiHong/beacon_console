import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import eslintPlugin from "vite-plugin-eslint";
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), eslintPlugin()],
	resolve: { alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }] }
});
