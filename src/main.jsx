//Filename: main.jsx
//Author: Kyle McColgan
//Date: 13 July 2025
//Description: This file contains the main entry-point component for the local Saint Louis React calendar project.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
