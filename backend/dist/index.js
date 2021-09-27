"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const platform_express_1 = require("@tsed/platform-express");
const common_1 = require("@tsed/common");
const server_1 = require("./server");
async function bootstrap() {
    try {
        common_1.$log.debug("Start server...");
        const platform = await platform_express_1.PlatformExpress.bootstrap(server_1.Server, {});
        await platform.listen();
        common_1.$log.debug("Server initialized");
    }
    catch (er) {
        common_1.$log.error(er);
    }
}
bootstrap().catch(console.error);
//# sourceMappingURL=index.js.map