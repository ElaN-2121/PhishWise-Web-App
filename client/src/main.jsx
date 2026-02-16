import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ScoreProvider } from "./context/ScoreContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScoreProvider>
        <App />
      </ScoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
