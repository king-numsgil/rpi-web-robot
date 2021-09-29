import {Args, Input, Namespace, Socket, SocketService} from "@tsed/socketio";
import {ExplorerHat} from "./explorer-hat";

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
		const length = Math.sqrt((data.x * data.x) + (data.y * data.y));

		let right: number = 0, left: number = 0;

		left = data.x * Math.sqrt(2) / 2 + data.y * Math.sqrt(2) / 2;
    	right = -data.x * Math.sqrt(2) / 2 + data.y * Math.sqrt(2) / 2;

		this.hat.motor(0).move(Math.round(right * 100));
		this.hat.motor(1).move(Math.round(left * 100));
	}

	@Input("hi")
	hi(@Args(0) name: string, @Socket socket: Socket, @Namespace nsp: Namespace) {
		console.log(`hi => ${name}`);
		this.hello();
	}

	hello() {
		this.nsp.emit("hello", "world");
	}
}
