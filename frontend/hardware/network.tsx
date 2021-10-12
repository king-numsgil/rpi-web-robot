import {Spinner, Text} from "@chakra-ui/react";
import {Systeminformation} from "systeminformation";
import {VFC} from "react";
import useSwr from "swr";

import {fetcher} from "./";

export const Network: VFC = () => {
	const {data} = useSwr<Array<Systeminformation.NetworkStatsData>>("/api/pi/net", fetcher, {
		refreshInterval: 1000,
	});

	if (!data) {
		return <Spinner />;
	} else {
		return <>
			{data.map(iface => <>
				<Text fontWeight="bold">{iface.iface}</Text>
				<Text>operstate: {iface.operstate}</Text>
				<Text>ms: {iface.ms}</Text>
				<Text>RX Bytes: {iface.rx_bytes}; Dropped: {iface.rx_dropped}; sec: {iface.rx_sec}</Text>
				<Text>TX Bytes: {iface.tx_bytes}; Dropped: {iface.tx_dropped}; sec: {iface.tx_sec}</Text>
			</>)}
		</>;
	}
};
