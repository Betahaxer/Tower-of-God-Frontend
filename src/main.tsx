import * as React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import { ChakraProvider, ToastProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { extendTheme } from '@chakra-ui/react'

// Theme settings. Currently only have dark mode settings
const config = {
  initialColorMode: 'system',
  useSystemColorMode: false,
}

const customTheme = extendTheme({ config })

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider
        toastOptions={{
          defaultOptions: { position: "top" },
          toastSpacing: "50",
        }}
        theme={customTheme}
      >
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
