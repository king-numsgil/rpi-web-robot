import {Spinner, Tab, TabList, TabPanel, TabPanels, Tabs, Text} from "@chakra-ui/react";
import {Systeminformation} from "systeminformation";
import {VFC} from "react";
import useSwr from "swr";

import {fetcher} from "./";

type CpuInfoProps = {
	data: Systeminformation.CpuData;
};

const CpuInfo: VFC<CpuInfoProps> = ({data}) => {
	return <>
		<Text>{data.manufacturer} {data.brand} - {data.physicalCores} cores - {data.cores} threads</Text>
		<Text>Speed: {data.speed}GHz (Min: {data.speedMin}GHz; Max: {data.speedMax}GHz)</Text>
	</>;
};

type CpuTempProps = {
	data: Systeminformation.CpuTemperatureData;
};

const CpuTemp: VFC<CpuTempProps> = ({data}) => {
	return <>
		<Text>Main: {data.main}&deg;C</Text>
		<Text>Max: {data.max}&deg;C</Text>
	</>;
}

type CpuLoadProps = {
	data: Systeminformation.CurrentLoadData;
};

const CpuLoad: VFC<CpuLoadProps> = ({data}) => {
	return <>
		<Text>Avg: {data.avgLoad}%</Text>
		<Text>
			Cur: {data.currentLoad.toFixed(2)}%;
			Idle: {data.currentLoadIdle.toFixed(2)}%;
			IRQ: {data.currentLoadIrq.toFixed(2)}%
		</Text>
		<Text>
			Nice: {data.currentLoadNice.toFixed(2)}%;
			User: {data.currentLoadUser.toFixed(2)}%;
			Sys: {data.currentLoadSystem.toFixed(2)}%
		</Text>
		{data.cpus.map((core, index) => <>
			<Text>Core #{index}</Text>
			<Text>
				Cur: {core.load.toFixed(2)}%;
				Idle: {core.loadIdle.toFixed(2)}%;
				IRQ: {core.loadIrq.toFixed(2)}%
			</Text>
			<Text>
				Nice: {core.loadNice.toFixed(2)}%;
				User: {core.loadUser.toFixed(2)}%;
				Sys: {core.loadSystem.toFixed(2)}%
			</Text>
		</>)}
	</>;
}

export const Cpu: VFC = () => {
	const {data: cpuTemps} = useSwr<Systeminformation.CpuTemperatureData>("/api/pi/cpu/temp", fetcher, {
		refreshInterval: 1000,
	});
	const {data: cpuLoad} = useSwr<Systeminformation.CurrentLoadData>("/api/pi/cpu/load", fetcher, {
		refreshInterval: 1000,
	});
	const {data: cpuInfo} = useSwr<Systeminformation.CpuData>("/api/pi/cpu", fetcher);

	return <Tabs isFitted>
		<TabList>
			<Tab>Info</Tab>
			<Tab>Temperatures</Tab>
			<Tab>Load</Tab>
		</TabList>
		<TabPanels>
			<TabPanel>
				{!cpuInfo && <Spinner />}
				{cpuInfo && <CpuInfo data={cpuInfo} />}
			</TabPanel>
			<TabPanel>
				{!cpuTemps && <Spinner />}
				{cpuTemps && <CpuTemp data={cpuTemps} />}
			</TabPanel>
			<TabPanel>
				{!cpuLoad && <Spinner />}
				{cpuLoad && <CpuLoad data={cpuLoad} />}
			</TabPanel>
		</TabPanels>
	</Tabs>;
};
