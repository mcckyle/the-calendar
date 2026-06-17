//File name: vite.config.js
//Author: Kyle McColgan
//Date: 17 June 2026
//Description: This file contains the Vite configuration for the Saint Louis calendar React project.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/the-calendar/',  // Base attribute must match the GitHub repository name.
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    env: {
      TZ: 'UTC', //Forces Node and the fake timer context to use UTC uniformly.
    },
    setupFiles: './setupTests.js',
  },
})
