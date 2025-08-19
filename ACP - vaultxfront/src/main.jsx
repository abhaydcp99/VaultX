import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white transition-colors duration-300">
        <App />
      </div>
    </ThemeProvider>
  </React.StrictMode>
);
