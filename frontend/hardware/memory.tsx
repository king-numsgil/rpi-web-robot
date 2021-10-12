import {Spinner, Text} from "@chakra-ui/react";
import {Systeminformation} from "systeminformation";
import {VFC} from "react";
import useSwr from "swr";

import {fetcher} from "./";

export const Memory: VFC = () => {
	const {data} = useSwr<Systeminformation.MemData>("/api/pi/mem", fetcher, {
		refreshInterval: 1000,
	});

	if (!data) {
		return <Spinner />;
	} else {
		return <>
			<Text fontWeight="bold">System Memory</Text>
			<Text>Total: {(data.total / 1024 / 1024).toFixed(2)} MiB</Text>
			<Text>Active: {(data.active / 1024 / 1024).toFixed(2)} MiB</Text>
			<Text>Available: {(data.available / 1024 / 1024).toFixed(2)} MiB</Text>
			<Text fontWeight="bold">Swap Memory</Text>
			<Text>Total: {(data.swaptotal / 1024 / 1024).toFixed(2)} MiB</Text>
			<Text>Used: {(data.swapused / 1024 / 1024).toFixed(2)} MiB</Text>
			<Text>Free: {(data.swapfree / 1024 / 1024).toFixed(2)} MiB</Text>
		</>;
	}
};
