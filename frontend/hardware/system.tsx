import {Systeminformation} from "systeminformation";
import {Spinner, Text} from "@chakra-ui/react";
import {VFC} from "react";
import useSwr from "swr";

import {fetcher} from "./";

type SystemInfo = {
	system: Systeminformation.SystemData;
	baseboard: Systeminformation.BaseboardData;
}

export const System: VFC = () => {
	const {data} = useSwr<SystemInfo>("/api/pi", fetcher);

	if (!data) {
		return <Spinner />;
	} else {
		return <>
			<Text fontWeight="bold">System</Text>
			<Text>Manufacturer: {data.system.manufacturer}; Model: {data.system.model};
				Version: {data.system.version}</Text>
			<Text fontWeight="bold">Baseboard</Text>
			<Text>Manufacturer: {data.baseboard.manufacturer}; Model: {data.baseboard.model};
				Version: {data.baseboard.version}</Text>
		</>;
	}
};
