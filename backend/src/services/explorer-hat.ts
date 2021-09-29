import {Gpio} from "pigpio";

export const Pins = {
	led: [4, 17, 27, 5],
	output: [6, 12, 13, 16],
	input: [23, 22, 24, 25],
	motor: [{pos: 19, neg: 20}, {pos: 21, neg: 26}],
};

class Light {
	private readonly pin: Gpio;

	state: boolean;

	constructor(index: number) {
		this.pin = new Gpio(Pins.led[index], {mode: Gpio.OUTPUT}).digitalWrite(0);
		this.state = false;
	}

	on() {
		this.pin.digitalWrite(1);
		this.state = true;
	}

	off() {
		this.pin.digitalWrite(0);
		this.state = false;
	}
}

class Motor {
	private readonly pin_fw: Gpio;
	private readonly pin_bw: Gpio;

	speed: number;

	constructor(index: number) {
		this.pin_fw = new Gpio(Pins.motor[index].pos, {mode: Gpio.OUTPUT})
			.pwmRange(100)
			.pwmWrite(0);
		this.pin_bw = new Gpio(Pins.motor[index].neg, {mode: Gpio.OUTPUT})
			.pwmRange(100)
			.pwmWrite(0);
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

		this.pin_bw.pwmWrite(0);
		this.pin_fw.pwmWrite(speed);
		this.speed = speed;
	}

	backward(speed: number) {
		if (speed < 0 || speed > 100) {
			throw new Error("Speed must be between 0 and 100");
		}

		this.pin_fw.pwmWrite(0);
		this.pin_bw.pwmWrite(speed);
		this.speed = -speed;
	}

	stop() {
		this.pin_fw.pwmWrite(0);
		this.pin_bw.pwmWrite(0);
		this.speed = 0;
	}
}

export class ExplorerHat {
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

	sleep(ms: number) {
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
