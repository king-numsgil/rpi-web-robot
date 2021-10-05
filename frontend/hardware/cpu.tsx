import {Tab, TabList, TabPanel, TabPanels, Tabs, Text} from "@chakra-ui/react";
import {VFC} from "react";

export const Cpu: VFC = () => {
	return <Tabs isFitted>
		<TabList>
			<Tab>Info</Tab>
			<Tab>Speeds</Tab>
			<Tab>Temperatures</Tab>
			<Tab>Load</Tab>
		</TabList>
		<TabPanels>
			<TabPanel>
				<Text>Hello CPU Info!</Text>
			</TabPanel>
			<TabPanel>
				<Text>Hello CPU Speeds!</Text>
			</TabPanel>
			<TabPanel>
				<Text>Hello CPU Temperatures!</Text>
			</TabPanel>
			<TabPanel>
				<Text>Hello CPU Load!</Text>
			</TabPanel>
		</TabPanels>
	</Tabs>;
};
