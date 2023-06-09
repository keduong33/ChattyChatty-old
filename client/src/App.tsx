import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { TRPCProvider } from "./providers/trpc";
import RouterProvider from "./providers/router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TRPCProvider>
      <RouterProvider />
    </TRPCProvider>
  </React.StrictMode>
);
