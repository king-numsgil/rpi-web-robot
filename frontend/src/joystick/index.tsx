// Taken from https://github.com/stemkoski/HTML-Joysticks

import {Box, Image} from "@chakra-ui/react";
import React, {useEffect, useState, VFC} from "react";

import base from "./joystick-base.png";
import top from "./joystick-green.png";

const maxDistance = 64;
const deadzone = 8;

export type JoyValue = {
	x: number;
	y: number;
};

type JoystickProps = {
	onJoyInput: (value: JoyValue) => void;
}

const Joystick: VFC<JoystickProps> = props => {
	const {onJoyInput} = props;

	const [isActive, setActive] = useState<boolean>(false);
	const [dragStart, setDragStart] = useState<JoyValue | null>(null);
	const [touchId, setTouchId] = useState<number | null>(null);
	const [stick, setStick] = useState<HTMLDivElement | null>(null);

	const handleDown = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
		setActive(true);
		e.preventDefault();

		setStick(e.currentTarget);
		e.currentTarget.style.transition = "0s";

		if ((e as React.TouchEvent<HTMLDivElement>).changedTouches) {
			const event = e as React.TouchEvent<HTMLDivElement>;
			setDragStart({x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY});
			setTouchId(event.changedTouches[0].identifier);
		} else {
			const event = e as React.MouseEvent<HTMLDivElement>;
			setDragStart({x: event.clientX, y: event.clientY});
		}
	}

	const handleDrag = (e: MouseEvent | TouchEvent) => {
		if (!isActive) {
			return;
		}

		e.preventDefault();
		let clientX = 0, clientY = 0;

		let touchmoveId = null;
		if ((e as TouchEvent).changedTouches) {
			const event = e as TouchEvent;

			for (let i = 0; i < event.changedTouches.length; i++) {
				if (touchId == event.changedTouches[i].identifier) {
					touchmoveId = i;
					clientX = event.changedTouches[i].clientX;
					clientY = event.changedTouches[i].clientY;
				}
			}

			if (touchmoveId == null) return;
		} else {
			const event = e as MouseEvent;
			clientX = event.clientX;
			clientY = event.clientY;
		}

		if (dragStart !== null) {
			const xDiff = clientX - dragStart.x;
			const yDiff = clientY - dragStart.y;
			const angle = Math.atan2(yDiff, xDiff);
			const distance = Math.min(maxDistance, Math.hypot(xDiff, yDiff));
			const xPosition = distance * Math.cos(angle);
			const yPosition = distance * Math.sin(angle);

			if (stick !== null) {
				stick.style.transform = `translate3d(${xPosition}px, ${yPosition}px, 0px)`;
			}

			const distance2 = (distance < deadzone) ? 0 : maxDistance / (maxDistance - deadzone) * (distance - deadzone);
			const xPosition2 = distance2 * Math.cos(angle);
			const yPosition2 = distance2 * Math.sin(angle);
			const xPercent = parseFloat((xPosition2 / maxDistance).toFixed(4));
			const yPercent = parseFloat((yPosition2 / maxDistance).toFixed(4));
			onJoyInput({x: xPercent, y: yPercent});
		}
	};

	const handleUp = (e: MouseEvent | TouchEvent) => {
		if (!isActive) {
			return;
		}

		if ((e as TouchEvent).changedTouches) {
			const event = e as TouchEvent;
			if (event.changedTouches[0].identifier !== touchId) {
				return;
			}
		}

		e.preventDefault();
		if (stick !== null) {
			stick.style.transition = ".2s";
			stick.style.transform = "translate3d(0px, 0px, 0px)";
			setStick(null);
		}

		setActive(false);
		setDragStart(null);
		onJoyInput({x: 0, y: 0});
	};

	useEffect(() => {
		document.addEventListener("mousemove", handleDrag, {passive: false});
		document.addEventListener("touchmove", handleDrag, {passive: false});
		document.addEventListener("mouseup", handleUp);
		document.addEventListener("touchend", handleUp);

		return () => {
			document.removeEventListener("mousemove", handleDrag);
			document.removeEventListener("touchmove", handleDrag);
			document.removeEventListener("mouseup", handleUp);
			document.removeEventListener("touchend", handleUp);
		};
	});

	return <Box w={128} h={128} position="absolute" bottom="150px" right="50px">
		<Image boxSize={128} src={base} />
		<Box
			w="64px"
			h="64px"
			position="absolute"
			top="32px"
			left="32px"
			onMouseDown={e => handleDown(e)}
			onTouchStart={e => handleDown(e)}
		>
			<Image boxSize="64px" src={top} />
		</Box>
	</Box>;
};

export default Joystick;
