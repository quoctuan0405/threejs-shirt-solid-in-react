import { createEffect, type VoidComponent } from "solid-js";
import iro from "@jaames/iro";
import { store, setColor } from "../store";
import { Popup } from "./Popup";
import type { IroColorPicker } from "@jaames/iro/dist/ColorPicker";

interface Props {
	isOpen?: boolean;
	onClose?: () => void;
}

export const ColorPalette: VoidComponent<Props> = (props) => {
	let iroContainer: HTMLDivElement | undefined;
	let iroColorPicker: IroColorPicker | undefined;

	// Mount and unmount iroColorPicker when open and close popup
	createEffect(() => {
		if (props.isOpen) {
			if (iroContainer && !iroColorPicker) {
				iroColorPicker = iro.ColorPicker(iroContainer, { color: store.color });
				iroColorPicker.on("color:change", (color: iro.Color) => {
					console.log(color.hexString);
					setColor(color.hexString);
				});
			}
		} else {
			iroColorPicker = undefined;
		}
	});

	return (
		<Popup top={230} left={70} isOpen={props.isOpen} onClose={props.onClose}>
			<div ref={iroContainer} />
		</Popup>
	);
};
