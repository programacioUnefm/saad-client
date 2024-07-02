import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'build'
  },
  resolve: {
    alias: {
        '@': path.resolve(__dirname, './src/'),
        ui: path.resolve(__dirname, './src/components/ui'),
        pages: path.resolve(__dirname, './src/pages/'),
        // Agrega más alias según tus necesidades
    },
},
})
