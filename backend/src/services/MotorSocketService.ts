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

		if (data.x < 0) {
			right = 1;
			left = -1;
		}
		if (data.x > 0) {
			right = -1;
			left = 1;
		}

		if (right === 0) {
			this.hat.motor(0).stop();
		} else if (right > 0) {
			this.hat.motor(0).forward(Math.round(right * 100));
		} else {
			this.hat.motor(0).backward(Math.round(-right * 100));
		}

		if (left === 0) {
			this.hat.motor(1).stop();
		} else if (left > 0) {
			this.hat.motor(1).forward(Math.round(left * 100));
		} else {
			this.hat.motor(1).backward(Math.round(-left * 100));
		}
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
