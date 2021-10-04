import {Configuration, Inject, PlatformApplication, Req, Res} from "@tsed/common";
import {createServer as createViteServer, ViteDevServer} from "vite";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import {ServerResponse} from "http";
import compress from "compression";
import {join} from "path";
import "@tsed/socketio";

const send = require("send");

const rootDir = __dirname;
const clientDir = join(rootDir, "../frontend");

function setCustomCacheControl(res: ServerResponse, path: string) {
	if (send.mime.lookup(path) === "text/html") {
		res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
		res.setHeader("Pragma", "no-cache");
		res.setHeader("expires", "0");
	}
}

@Configuration({
	rootDir,
	acceptMimes: ["application/json"],
	statics: {
		"/": process.env.ROBOT_DESKTOP !== "1" ? [{
			root: join(clientDir, "./dist"),
			maxAge: "1d",
			setHeaders: setCustomCacheControl,
		}] : [],
	},
	mount: {
		"/api": [
			`${rootDir}/controllers/**/*.ts`,
		],
	},
	socketIO: {},
})
export class Server {
	@Inject()
	app: PlatformApplication;

	@Configuration()
	settings: Configuration;

	vite: ViteDevServer | null = null;

	public async $beforeRoutesInit(): Promise<any> {
		this.app
			.use(cookieParser())
			.use(compress({}))
			.use(methodOverride())
			.use(bodyParser.json())
			.use(bodyParser.urlencoded({
				extended: true
			}));

		if (process.env.ROBOT_DESKTOP === "1") {
			this.vite = await createViteServer({
				server: {middlewareMode: "html"},
			});

			this.app.use(this.vite.middlewares);
		}
	}

	public $afterRoutesInit() {
		if (process.env.ROBOT_DESKTOP !== "1") {
			this.app.get("*", (req: Req, res: Res) => {
				res.sendFile(join(clientDir, "./dist/index.html"));
			});
		}
	}
}
