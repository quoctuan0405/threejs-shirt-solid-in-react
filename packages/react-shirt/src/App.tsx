import "./App.css";
import { Canvas } from "@react-three/fiber";
import { CameraRig } from "./components/CameraRig";
import { Backdrop } from "./components/Backdrop";
import { Shirt } from "./components/Shirt";
import { LightEnvironment } from "./components/LightEnvironment";
import { Center } from "@react-three/drei";

const App: React.FC = () => {
	return (
		<Canvas
			shadows
			camera={{ position: [0, 0, 0], fov: 25 }}
			gl={{ preserveDrawingBuffer: true }}
		>
			<LightEnvironment />

			<CameraRig>
				<Backdrop />

				<Center>
					<Shirt />
				</Center>
			</CameraRig>
		</Canvas>
	);
};

export default App;
