import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/styles/index.css'

const useFirebase = import.meta.env.VITE_USE_FIREBASE === "true"

async function startApp() {
  if (!useFirebase) {
    const { makeServer } = await import("./server")
    makeServer({ environment: import.meta.env.MODE })
  }

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

startApp()




