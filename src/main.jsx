import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'; 
import App from './App.jsx';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from "react-redux";
import store from "./store";
import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ChakraProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)