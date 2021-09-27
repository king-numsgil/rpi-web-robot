import {Args, Input, Namespace, Socket, SocketService} from "@tsed/socketio";

export type MotorInput = {
	x: number;
	y: number;
};

@SocketService("/motor")
export class MotorSocketService {
	@Namespace nsp: Namespace;

	@Input("input")
	motorMove(@Args(0) data: MotorInput) {
		console.log(`x => ${data.x}; y => ${data.y}`);
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
