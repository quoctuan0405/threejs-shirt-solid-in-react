import { createSignal, type VoidComponent } from "solid-js";
import { IoColorPalette } from "solid-icons/io";
import { RiDocumentFileUploadFill } from "solid-icons/ri";
import { IconButton } from "./IconButton";
import { ColorPalette } from "./ColorPalette";
import { FileUpload } from "./FileUpload";
import { IoSettingsSharp } from "solid-icons/io";
import { toggleIsShowSetting } from "../store";

type PopupType = "color-palette" | "file-upload" | "setting";

export const Sidebar: VoidComponent = () => {
	const [openPopup, setOpenPopup] = createSignal<PopupType>();

	return (
		<>
			<div class="absolute left-0 h-screen z-20">
				<div class="content-center w-full h-full">
					<div class="flex flex-col flex-wrap items-center justify-center h-max w-max py-1 bg-white/50 shadow rounded-lg">
						{/* Palette button */}
						<IconButton
							onClick={() => {
								setOpenPopup((prevState) =>
									prevState === "color-palette" ? undefined : "color-palette",
								);
							}}
						>
							<IoColorPalette size={30} />
						</IconButton>

						{/* Upload file button */}
						<IconButton
							onClick={() => {
								setOpenPopup((prevState) =>
									prevState === "file-upload" ? undefined : "file-upload",
								);
							}}
						>
							<RiDocumentFileUploadFill size={30} />
						</IconButton>

						{/* Setting button */}
						<IconButton
							onClick={() => {
								setOpenPopup((prevState) =>
									prevState === "setting" ? undefined : "setting",
								);

								toggleIsShowSetting();
							}}
						>
							<IoSettingsSharp size={30} />
						</IconButton>
					</div>
				</div>
			</div>

			<ColorPalette
				isOpen={openPopup() === "color-palette"}
				onClose={() => {
					setOpenPopup(undefined);
				}}
			/>

			<FileUpload
				isOpen={openPopup() === "file-upload"}
				onClose={() => {
					setOpenPopup(undefined);
				}}
			/>
		</>
	);
};
