import {Flex, Spacer} from "@chakra-ui/react";
import {io, Socket} from "socket.io-client";
import {VFC} from "react";

import {Joystick, JoyValue} from "./joystick";
import {HardwareInfo} from "./hardware";

let ready: boolean = false;
let socket: Socket = io("/motor", {
	transports: ["websocket"],
}).on("connect", () => {
	ready = true;
	console.log("CONNECTED");
}).on("disconnect", () => {
	ready = false;
	console.log("DISCONNECTED");
});

const App: VFC = () => {
	const sendJoyValue = (value: JoyValue) => {
		if (ready) {
			socket.emit("input", value);
		}
	};

	return <>
		<Flex direction="column" h="100vh">
			<HardwareInfo/>
			<Spacer />
		</Flex>
		<Joystick onJoyInput={sendJoyValue} />
	</>;
};

export default App;
