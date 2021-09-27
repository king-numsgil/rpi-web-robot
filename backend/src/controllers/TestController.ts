import {Controller, Get} from "@tsed/common";

import {MotorSocketService} from "../services/MotorSocketService";

@Controller("/test")
export class TestController {
	constructor(private motorService: MotorSocketService) {
	}

	@Get()
	index() {
		return "Yoo!! Fuck me!";
	}
}
