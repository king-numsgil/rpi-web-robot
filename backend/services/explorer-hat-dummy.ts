import {IExplorerHat, ILight, IMotor} from "./explorer-hat-interface";

class Light implements ILight {
	state: boolean;

	constructor(_index: number) {
		this.state = false;
	}

	on() {
		this.state = true;
	}

	off() {
		this.state = false;
	}
}

class Motor implements IMotor {
	speed: number;

	constructor(_index: number) {
		this.speed = 0;
	}

	move(speed: number) {
		if (speed === 0) {
			this.stop();
		} else if (speed > 0) {
			this.forward(speed);
		} else {
			this.backward(-speed);
		}
	}

	forward(speed: number) {
		if (speed < 0 || speed > 100) {
			throw new Error("Speed must be between 0 and 100");
		}

		this.speed = speed;
	}

	backward(speed: number) {
		if (speed < 0 || speed > 100) {
			throw new Error("Speed must be between 0 and 100");
		}

		this.speed = -speed;
	}

	stop() {
		this.speed = 0;
	}
}

export class ExplorerHat implements IExplorerHat {
	private readonly lights: Array<Light>;
	private readonly motors: Array<Motor>;

	constructor() {
		this.lights = [
			new Light(0),
			new Light(1),
			new Light(2),
			new Light(3),
		];

		this.motors = [
			new Motor(0),
			new Motor(1),
		];
	}

	sleep(ms: number): Promise<void> {
		return new Promise((resolve) => {
			setTimeout(resolve, ms);
		});
	}

	light(index: number): Light {
		return this.lights[index];
	}

	motor(index: number): Motor {
		return this.motors[index];
	}
}
