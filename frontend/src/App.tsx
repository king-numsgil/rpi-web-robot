import {Flex, Spacer, Text} from "@chakra-ui/react";
import {useState, VFC} from "react";

import Joystick from "./joystick";

const App: VFC = () => {
	const [joyValue, setJoyValue] = useState<string>("Hello");
	return <>
		<Flex direction="column" h="100vh">
			<Text>{joyValue}</Text>
			<Spacer />
		</Flex>
		<Joystick onJoyInput={value => setJoyValue(`Joy X: ${value.x} Y:${value.y}`)} />
	</>;
};

export default App;
