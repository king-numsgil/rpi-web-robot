import {Configuration, Inject, PlatformApplication, Res} from "@tsed/common";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import {ServerResponse} from "http";
import compress from "compression";
import {join} from "path";
import "@tsed/socketio";

const send = require("send");

const rootDir = __dirname;
const clientDir = join(rootDir, "../../frontend/dist");

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
		"/": [
			{
				root: clientDir,
				maxAge: "1d",
				setHeaders: setCustomCacheControl,
			},
		],
	},
	mount: {
		"/api": [
			`${rootDir}/controllers/**/*.ts`,
		],
	},
	socketIO: {
	},
})
export class Server {
	@Inject()
	app: PlatformApplication;

	@Configuration()
	settings: Configuration;

	public $beforeRoutesInit(): void | Promise<any> {
		this.app
			.use(cookieParser())
			.use(compress({}))
			.use(methodOverride())
			.use(bodyParser.json())
			.use(bodyParser.urlencoded({
				extended: true
			}));
	}

	public $afterRoutesInit() {
		this.app.get("*", (req: any, res: Res) => {
			res.sendFile(join(clientDir, "index.html"));
		});
	}
}
