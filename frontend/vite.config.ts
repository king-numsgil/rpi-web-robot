import reactRefresh from "@vitejs/plugin-react-refresh";
import tsconfigPaths from "vite-tsconfig-paths"
import reactJsx from "vite-react-jsx";
import {defineConfig} from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:8080/api",
				changeOrigin: true,
			},
		},
	},
	plugins: [
		reactJsx(),
		reactRefresh(),
		tsconfigPaths(),
	],
});
