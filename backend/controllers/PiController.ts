import {Controller, Get} from "@tsed/common";
import hardware from "systeminformation";

import {MotorSocketService} from "../services/MotorSocketService";

@Controller("/pi")
export class PiController {
	constructor(private motorService: MotorSocketService) {
	}

	@Get()
	async index() {
		return await hardware.system();
	}
}
