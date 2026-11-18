import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  resolve: {preserveSymlinks: true},
  plugins: [react(), tailwindcss()],
})
