export interface ILight {
	state: boolean;

	on(): void;

	off(): void;
}

export interface IMotor {
	speed: number;

	move(speed: number): void;

	forward(speed: number): void;

	backward(speed: number): void;

	stop(): void;
}

export interface IExplorerHat {
	sleep(ms: number): Promise<void>;

	light(index: number): ILight;

	motor(index: number): IMotor;
}
