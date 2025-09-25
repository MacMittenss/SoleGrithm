import { createRoot } from "react-dom/client";
import App from "./App";
import "./output.css";

// Enable Anton typography site-wide
document.body.classList.add('anton-all');

createRoot(document.getElementById("root")!).render(<App />);
