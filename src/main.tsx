import * as React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import { ChakraProvider, ToastProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider
        toastOptions={{
          defaultOptions: { position: "top" },
          toastSpacing: "50",
        }}
      >
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
