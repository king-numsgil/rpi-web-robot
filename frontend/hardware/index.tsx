import {Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import {VFC} from "react";

import {Network} from "./network";
import {System} from "./system";
import {Memory} from "./memory";
import {Cpu} from "./cpu";

export const HardwareInfo: VFC = () => {
	return <Tabs isFitted>
		<TabList>
			<Tab>System</Tab>
			<Tab>CPU</Tab>
			<Tab>Memory</Tab>
			<Tab>Network</Tab>
		</TabList>
		<TabPanels>
			<TabPanel><System/></TabPanel>
			<TabPanel><Cpu/></TabPanel>
			<TabPanel><Memory/></TabPanel>
			<TabPanel><Network/></TabPanel>
		</TabPanels>
	</Tabs>;
};
