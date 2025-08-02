//Filename: main.jsx
//Author: Kyle McColgan
//Date: 01 August 2025
//Description: This file contains the main entry-point component for the Saint Louis calendar project.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
