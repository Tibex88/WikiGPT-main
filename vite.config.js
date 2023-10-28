import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'  

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "es2022"
  },
  esbuild: {
    supported: {
      'top-level-await': true
    },
  },
  plugins: [react(),nodePolyfills({
    overrides: {
      // Since `fs` is not supported in browsers, we can use the `memfs` package to polyfill it.
      fs: 'memfs',
    },
  })],
})
