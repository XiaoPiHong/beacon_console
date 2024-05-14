import { defineConfig, loadEnv } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig(configEnv => {
	// 获取指定模式的环境变量
	const env = loadEnv(configEnv.mode, process.cwd());
	console.log(env);
	return {
		// base: VITE_BASE,
		plugins: [react(), eslintPlugin()],
		resolve: { alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }] },
		server: {
			proxy: {
				"/pms": {
					target: "https://www.fastmock.site/mock/f18bce957e91793c339504b2f17b384e",
					changeOrigin: true
				}
			}
		},
		build: {
			rollupOptions: {
				output: {
					manualChunks(id) {
						if (id.includes("node_modules")) {
							// return id.toString().split("node_modules/")[1].split("/")[0].toString();
							return "vendor";
						}
					}
				}
			}
		}
	};
});
