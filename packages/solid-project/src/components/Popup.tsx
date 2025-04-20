import { onCleanup, onMount, Show, type ParentComponent } from "solid-js";
import { IoClose } from "solid-icons/io";
import { IconButton } from "./IconButton";
import { Motion, Presence } from "solid-motionone";

interface Props {
	left?: number;
	top?: number;
	isOpen?: boolean;
	onClose?: () => void;
}

export const Popup: ParentComponent<Props> = (props) => {
	// Close popup when press "Esc"
	onMount(() => {
		const closeOnEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				props.onClose?.();
			}
		};

		window.document.addEventListener("keyup", closeOnEsc);

		onCleanup(() => {
			window.document.removeEventListener("keyup", closeOnEsc);
		});
	});

	return (
		<Presence exitBeforeEnter>
			<Show when={props.isOpen}>
				<Motion.div
					class="z-20 fixed bg-white rounded-2xl shadow-2xl p-5"
					style={{
						left: `${props.left}px`,
						top: `${props.top}px`,
					}}
					animate={{ opacity: [0, 1], scale: [0.995, 1] }}
					exit={{ opacity: [1, 0], scale: [1, 0.995] }}
					transition={{ duration: 0.1, easing: "ease-in-out" }}
				>
					<div class="flex flex-row flex-wrap justify-end">
						<IconButton class="p-0" onClick={props.onClose}>
							<IoClose size={28} />
						</IconButton>
					</div>
					<div>{props.children}</div>
				</Motion.div>
			</Show>
		</Presence>
	);
};
