import {Flex, Spacer, Text} from "@chakra-ui/react";
import {io, Socket} from "socket.io-client";
import {VFC} from "react";

import {JoyValue, Joystick} from "./joystick";

let ready: boolean = false;
let socket: Socket = io("/motor").on("connect", () => {
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
			<Text>Hello</Text>
			<Spacer />
		</Flex>
		<Joystick onJoyInput={sendJoyValue} />
	</>;
};

export default App;
