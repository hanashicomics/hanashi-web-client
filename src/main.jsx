import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/index.css'
import App from './App.jsx'
import { registerServiceWorkerWithEnv } from './register-sw';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
//registerServiceWorkerWithEnv();