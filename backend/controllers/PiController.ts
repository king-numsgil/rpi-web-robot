import {Controller, Get} from "@tsed/common";

import {MotorSocketService} from "../services/MotorSocketService";

@Controller("/pi")
export class PiController {
	constructor(private motorService: MotorSocketService) {
	}

	@Get()
	index() {
		return "Yoo!! Fuck me!";
	}
}
