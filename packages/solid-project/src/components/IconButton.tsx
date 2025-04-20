import type { ParentComponent } from "solid-js";
import { cn } from "../util/cn";

interface Props {
	class?: string;
	onClick?: () => void;
}

export const IconButton: ParentComponent<Props> = (props) => {
	return (
		<button
			type="button"
			class={cn(
				"text-neutral-500/80 hover:text-neutral-500 active:text-neutral-600 duration-200 cursor-pointer p-3 rounded-full",
				props.class,
			)}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
};
