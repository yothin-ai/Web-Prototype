import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `vite build` makes the normal static site in dist/.
// `vite build --mode offline` makes one self-contained dist-offline/index.html
// (scripts, styles and fonts inlined) that opens straight from disk.
export default defineConfig(({ mode }) => {
  const offline = mode === 'offline'
  return {
    base: './',
    plugins: [react(), ...(offline ? [viteSingleFile()] : [])],
    build: offline ? { outDir: 'dist-offline', assetsInlineLimit: 100_000_000 } : {},
  }
})
