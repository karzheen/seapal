import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Explicitly tell React Router it is running inside the /seapal subfolder */}
    <BrowserRouter basename="/seapal">
      <App />
    </BrowserRouter>
  </StrictMode>
);
