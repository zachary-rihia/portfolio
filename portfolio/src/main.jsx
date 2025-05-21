import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Canvas } from "@react-three/fiber";
import { DialogueProvider } from "./Context/DialogueProviderContext.jsx";
import DialogueBox from "./Components/DialogueBox.jsx";

window.addEventListener("click", () => window.focus());
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<DialogueProvider>
			<Canvas>
				<ambientLight intensity={0.5} />
				<pointLight position={[10, 10, 10]} />
				<App />
			</Canvas>
			<DialogueBox />
		</DialogueProvider>
	</React.StrictMode>
);
