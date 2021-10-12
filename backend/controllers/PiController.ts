import {Controller, Get} from "@tsed/common";
import hardware from "systeminformation";

import {MotorSocketService} from "../services/MotorSocketService";

@Controller("/pi")
export class PiController {
	constructor(private motorService: MotorSocketService) {
	}

	@Get()
	async system() {
		return {
			system: await hardware.system(),
			baseboard: await hardware.baseboard(),
		};
	}

	@Get("/cpu")
	async cpu() {
		return await hardware.cpu();
	}

	@Get("/cpu/temp")
	async cpuTemp() {
		return await hardware.cpuTemperature();
	}

	@Get("/cpu/load")
	async cpuLoad() {
		return await hardware.currentLoad();
	}

	@Get("/mem")
	async mem() {
		return await hardware.mem();
	}

	@Get("/net")
	async network() {
		return await hardware.networkStats();
	}
}
