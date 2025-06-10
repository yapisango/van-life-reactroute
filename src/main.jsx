import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/styles/index.css'

// Only start Mirage if Firebase is not used
const useFirebase = import.meta.env.VITE_USE_FIREBASE === "true"

if (!useFirebase && import.meta.env.DEV) {
  const { makeServer } = await import("./server")
  makeServer()
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)


