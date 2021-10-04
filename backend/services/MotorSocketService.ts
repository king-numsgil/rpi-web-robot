import {Args, Input, Namespace, Socket, SocketService} from "@tsed/socketio";
import {IExplorerHat} from "./hat/explorer-hat-interface";

const isDesktop: boolean = process.env.ROBOT_DESKTOP === "1";
let ExplorerHat: new () => IExplorerHat;
if (isDesktop) {
	import("./hat/explorer-hat-dummy").then(mod => ({ExplorerHat} = mod));
} else {
	import("./hat/explorer-hat-rpi").then(mod => ({ExplorerHat} = mod));
}

export type MotorInput = {
	x: number;
	y: number;
};

@SocketService("/motor")
export class MotorSocketService {
	@Namespace nsp: Namespace;

	private readonly hat = new ExplorerHat();

	@Input("input")
	motorMove(@Args(0) data: MotorInput) {
		const right = -data.x * Math.sqrt(2) / 2 + data.y * Math.sqrt(2) / 2;
		const left = data.x * Math.sqrt(2) / 2 + data.y * Math.sqrt(2) / 2;

		this.hat.motor(0).move(Math.round(right * 100));
		this.hat.motor(1).move(Math.round(left * 100));
	}
}
