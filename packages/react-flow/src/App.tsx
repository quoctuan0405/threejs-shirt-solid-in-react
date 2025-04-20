import "./App.css";
import {
	ReactFlow,
	Background,
	Controls,
	Handle,
	Position,
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
	type NodeProps,
	type OnNodesChange,
	type Node,
	type OnEdgesChange,
	type Edge,
	type OnConnect,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useState } from "react";
import { Card } from "./components/Card";
import { AmbientLightNode } from "./components/AmbientLightNode";
import { RandomizeLight1Node } from "./components/RandomizeLight1Node";
import { RandomizeLight2Node } from "./components/RandomizeLight2Node";
import { AccumulateShadowNode } from "./components/AccumulateShadowNode";
import { CameraNode } from "./components/CameraNode";

interface CustomNodeProps extends NodeProps<Node> {
	data: {
		label: string;
	};
}

const CustomNode: React.FC<CustomNodeProps> = ({ data, isConnectable }) => {
	return (
		<>
			<Handle
				type="target"
				position={Position.Left}
				isConnectable={isConnectable}
			/>

			<Card header={data.label} />

			<Handle
				type="source"
				position={Position.Right}
				isConnectable={isConnectable}
			/>
		</>
	);
};

enum NodeType {
	CUSTOM_NODE = "customNode",
	AMBIENT_LIGHT = "ambient-light",
	RANDOMIZE_LIGHT_1 = "randomize-light-1",
	RANDOMIZE_LIGHT_2 = "randomize-light-2",
	ACCUMULATE_SHADOW = "accumulate-shadow",
	CAMERA = "camera",
}

enum NodeId {
	AMBIENT_LIGHT = "ambient-light",
	RANDOMIZE_LIGHT_1 = "randomize-light-1",
	RANDOMIZE_LIGHT_2 = "randomize-light-2",
	ACCUMULATE_SHADOW = "accumulate-shadow",
	CAMERA = "camera",
}

const nodeTypes = {
	[NodeType.CUSTOM_NODE]: CustomNode,
	[NodeType.AMBIENT_LIGHT]: AmbientLightNode,
	[NodeType.RANDOMIZE_LIGHT_1]: RandomizeLight1Node,
	[NodeType.RANDOMIZE_LIGHT_2]: RandomizeLight2Node,
	[NodeType.ACCUMULATE_SHADOW]: AccumulateShadowNode,
	[NodeType.CAMERA]: CameraNode,
};

const initialNodes: Node[] = [
	{
		id: NodeId.AMBIENT_LIGHT,
		type: NodeType.AMBIENT_LIGHT,
		position: { x: 267, y: 50 },
		dragHandle: ".drag-handle__custom",
		data: {},
	},
	{
		id: NodeId.RANDOMIZE_LIGHT_1,
		type: NodeType.RANDOMIZE_LIGHT_1,
		position: { x: 250, y: 150 },
		dragHandle: ".drag-handle__custom",
		data: {},
	},
	{
		id: NodeId.RANDOMIZE_LIGHT_2,
		type: NodeType.RANDOMIZE_LIGHT_2,
		position: { x: 250, y: 250 },
		dragHandle: ".drag-handle__custom",
		data: { label: "Randomize light 2" },
	},
	{
		id: NodeId.ACCUMULATE_SHADOW,
		type: NodeType.ACCUMULATE_SHADOW,
		position: { x: 500, y: 200 },
		dragHandle: ".drag-handle__custom",
		data: { label: "Accumulate shadow" },
	},
	{
		id: NodeId.CAMERA,
		type: NodeType.CAMERA,
		position: { x: 800, y: 150 },
		dragHandle: ".drag-handle__custom",
		data: { label: "Camera" },
	},
];

const initialEdges: Edge[] = [
	{
		id: "edge-1",
		source: NodeId.AMBIENT_LIGHT,
		target: NodeId.CAMERA,
		animated: true,
	},
	{
		id: "edge-2",
		source: NodeId.RANDOMIZE_LIGHT_1,
		target: NodeId.ACCUMULATE_SHADOW,
		animated: true,
	},
	{
		id: "edge-3",
		source: NodeId.RANDOMIZE_LIGHT_2,
		target: NodeId.ACCUMULATE_SHADOW,
		animated: true,
	},
	{
		id: "edge-4",
		source: NodeId.ACCUMULATE_SHADOW,
		target: NodeId.CAMERA,
		animated: true,
	},
];

export const App: React.FC = () => {
	const [nodes, setNodes] = useState<Node[]>(initialNodes);
	const [edges, setEdges] = useState<Edge[]>(initialEdges);

	const onNodesChange: OnNodesChange<Node> = useCallback(
		(changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
		[],
	);

	const onEdgesChange: OnEdgesChange<Edge> = useCallback(
		(changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
		[],
	);

	const onConnect: OnConnect = useCallback(
		(connection) => setEdges((eds) => addEdge(connection, eds)),
		[],
	);

	return (
		<ReactFlow
			nodes={nodes}
			edges={edges}
			nodeTypes={nodeTypes}
			onNodesChange={onNodesChange}
			// onEdgesChange={onEdgesChange}
			// onConnect={onConnect}
		>
			<Background />
			<Controls />
		</ReactFlow>
	);
};
