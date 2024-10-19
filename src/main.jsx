import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme.js'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Ważne: Musi być Router

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <ChakraProvider theme={theme}>
    <Router>
    <App />
    </Router>
  </ChakraProvider>
  </StrictMode>,
)
