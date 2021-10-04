import reactRefresh from "@vitejs/plugin-react-refresh";
import tsconfigPaths from "vite-tsconfig-paths"
import reactJsx from "vite-react-jsx";
import {defineConfig} from "vite";
import {join} from "path";

// https://vitejs.dev/config/
export default defineConfig({
	root: join(__dirname, "./frontend"),
	plugins: [
		reactJsx(),
		reactRefresh(),
		tsconfigPaths(),
	],
});
