import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode className="w-full min-h-screen">
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
)
