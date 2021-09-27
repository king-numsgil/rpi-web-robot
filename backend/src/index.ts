import {PlatformExpress} from "@tsed/platform-express";
import {$log} from "@tsed/common";
import {Server} from "./server";

async function bootstrap() {
	try {
		$log.debug("Start server...");
		const platform = await PlatformExpress.bootstrap(Server, {});

		await platform.listen();
		$log.debug("Server initialized");
	} catch (er) {
		$log.error(er);
	}
}

bootstrap().catch(console.error);
