import {ChakraProvider, ColorModeScript} from "@chakra-ui/react";
import {render} from "react-dom";
import React from "react";

import theme from "./theme";
import App from "./App";

render(
	<React.StrictMode>
		<ColorModeScript initialColorMode={theme.config.initialColorMode} />
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
