import { defineConfig } from 'vite'

export default defineConfig({
  root: 'demo',
  base: '/twojs-multiline-text/',
  resolve: {
    tsconfigPaths: true
  }
})
