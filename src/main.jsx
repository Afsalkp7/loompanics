import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Toaster } from "react-hot-toast";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <App />
        <ToastContainer />
        <Toaster position="top-center" reverseOrder={false} toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
          duration: 700
        }}/>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
