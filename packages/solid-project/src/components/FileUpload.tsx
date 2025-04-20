import { createSignal, Match, Switch, type VoidComponent } from "solid-js";
import { Popup } from "./Popup";
import { RiDocumentFileUploadFill } from "solid-icons/ri";
import { FaSolidCircleCheck } from "solid-icons/fa";
import { cn } from "../util/cn";
import { setLogoFile } from "../store";

interface Props {
	isOpen?: boolean;
	onClose?: () => void;
}

export const FileUpload: VoidComponent<Props> = (props) => {
	let fileInput!: HTMLInputElement;

	const [isDragOver, setIsDragOver] = createSignal<boolean>(false);
	const [isUploadSuccessfully, setIsUploadSuccessfully] =
		createSignal<boolean>(false);
	const [fileName, setFileName] = createSignal<string>();

	const handleFile = (file: File) => {
		if (
			file.type === "image/png" ||
			file.type === "image/jpeg" ||
			file.type === "image/svg+xml"
		) {
			const fileReader = new FileReader();

			fileReader.readAsDataURL(file);
			fileReader.onload = () => {
				if (typeof fileReader.result === "string") {
					setLogoFile(fileReader.result);
				}
			};

			setIsUploadSuccessfully(true);
			setFileName(file.name);
		}
	};

	return (
		<Popup top={270} left={70} isOpen={props.isOpen} onClose={props.onClose}>
			<input
				ref={fileInput}
				type="file"
				hidden
				onChange={(e) => {
					if (e.target.files) {
						handleFile(e.target.files[0]);
					}
				}}
			/>

			<div
				class={cn(
					"group w-72 h-72 content-center border-dashed border-2 hover:border-neutral-400/70 active:border-neutral-400 rounded-2xl mt-2.5 cursor-pointer duration-75",
					{
						"border-neutral-400/50": !isDragOver(),
						"border-blue-400/70 bg-blue-100": isDragOver(),
					},
				)}
				onDrop={(e) => {
					e.preventDefault();
					setIsDragOver(false);

					let file: File | undefined | null = null;

					if (e.dataTransfer) {
						if (e.dataTransfer.items) {
							// Use DataTransferItemList interface to access the file(s)
							const items = Array.from(e.dataTransfer.items);
							if (items) {
								file = items[0].getAsFile();
							}
						} else {
							// Use DataTransfer interface to access the file(s)
							const files = Array.from(e.dataTransfer.files);
							if (files) {
								file = files[0];
							}
						}
					}

					if (file) {
						handleFile(file);
					}
				}}
				onDragOver={(e) => {
					e.preventDefault();
					setIsDragOver(true);
				}}
				onDragLeave={(e) => {
					e.preventDefault();
					setIsDragOver(false);
				}}
				onDragEnd={(e) => {
					e.preventDefault();
					setIsDragOver(false);
				}}
				onDragExit={(e) => {
					e.preventDefault();
					setIsDragOver(false);
				}}
				onKeyDown={() => {
					fileInput.click();
				}}
			>
				<Switch>
					<Match when={!isUploadSuccessfully()}>
						<RiDocumentFileUploadFill
							class={cn(
								"group-hover:text-neutral-400/50 group-active:text-neutral-400/60 m-auto duration-200",
								{
									"text-neutral-300": !isDragOver(),
									"text-blue-400/50": isDragOver(),
								},
							)}
							size={100}
						/>
						<p
							class={cn(
								"group-hover:text-neutral-400/70 group-active:text-neutral-400/80 text-center text-base select-none mt-3",
								{
									"text-neutral-400/50": !isDragOver(),
									"text-blue-400/70": isDragOver(),
								},
							)}
						>
							Upload logo
						</p>
					</Match>

					<Match when={isUploadSuccessfully()}>
						<FaSolidCircleCheck class="text-green-500/50 m-auto" size={80} />
						<p class="text-green-600/50 text-center mt-5">{fileName()}</p>
						<p class="text-green-700/40 text-xs text-center mt-1">
							Upload successfully!
						</p>
					</Match>
				</Switch>
			</div>
		</Popup>
	);
};
