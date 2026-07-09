import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  // react-draggable (a dependency of react-grid-layout) reads process.env.DRAGGABLE_DEBUG,
  // which isn't defined in the browser and isn't covered by Vite's default NODE_ENV stripping.
  define: {
    'process.env.DRAGGABLE_DEBUG': 'false',
  },
  build: {
    cssCodeSplit: false,
  },
})
