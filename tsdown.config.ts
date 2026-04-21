import { defineConfig } from 'tsdown'

export default defineConfig([
  {
    entry: 'src/index.ts',
    format: ['cjs', 'esm'],
    outDir: 'dist',
    dts: true,
    exports: true,
    deps: {
      neverBundle: ['two.js', 'word-wrapper']
    }
  },
  {
    entry: 'src/index.ts',
    format: 'umd',
    outDir: 'dist',
    dts: false,
    globalName: 'TwojsMultilineText',
    deps: {
      neverBundle: ['two.js'],
      alwaysBundle: ['word-wrapper'],
      onlyBundle: false
    },
    outputOptions: {
      globals: { 'two.js': 'Two' }
    }
  }
])
