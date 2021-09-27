"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const common_1 = require("@tsed/common");
const method_override_1 = __importDefault(require("method-override"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const path_1 = require("path");
require("@tsed/socketio");
const send = require("send");
const rootDir = __dirname;
const clientDir = (0, path_1.join)(rootDir, "../../frontend/dist");
function setCustomCacheControl(res, path) {
    if (send.mime.lookup(path) === "text/html") {
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("expires", "0");
    }
}
let Server = class Server {
    $beforeRoutesInit() {
        this.app
            .use((0, cookie_parser_1.default)())
            .use((0, compression_1.default)({}))
            .use((0, method_override_1.default)())
            .use(body_parser_1.default.json())
            .use(body_parser_1.default.urlencoded({
            extended: true
        }));
    }
    $afterRoutesInit() {
        this.app.get("*", (req, res) => {
            res.sendFile((0, path_1.join)(clientDir, "index.html"));
        });
    }
};
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", common_1.PlatformApplication)
], Server.prototype, "app", void 0);
__decorate([
    (0, common_1.Configuration)(),
    __metadata("design:type", Object)
], Server.prototype, "settings", void 0);
Server = __decorate([
    (0, common_1.Configuration)({
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
        socketIO: {},
    })
], Server);
exports.Server = Server;
//# sourceMappingURL=server.js.map