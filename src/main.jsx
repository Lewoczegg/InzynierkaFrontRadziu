import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme.js'
import { BrowserRouter as Router } from "react-router-dom"; 
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <ChakraProvider theme={theme}>
  <AuthProvider>
    <Router>
    <App />
    </Router>
  </AuthProvider>
  </ChakraProvider>
  </StrictMode>,
)
