/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' => funciona en GitHub Pages (https://gianmozzi.github.io/Login/)
export default defineConfig({
  base: './',
  plugins: [react()],
  test: { environment: 'node' },
})
