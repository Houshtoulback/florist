import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { HelmetProvider } from "react-helmet-async";
import { StoreProvider } from "./Store.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <StoreProvider>
            <HelmetProvider>
                <App />
            </HelmetProvider>
        </StoreProvider>
    </React.StrictMode>
);
