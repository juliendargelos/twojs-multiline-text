import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import alias from '@rollup/plugin-alias'
import html from '@rollup/plugin-html'
import builtins from 'rollup-plugin-node-builtins'
import cleaner from 'rollup-plugin-cleaner'
import serve from 'rollup-plugin-serve'
import ts from 'rollup-plugin-ts'
import { terser } from 'rollup-plugin-terser'
import { eslint } from 'rollup-plugin-eslint'

import pkg from './package.json'
import tsconfig from './tsconfig.json'

const development = process.env.ROLLUP_WATCH
const production = !development

const demo = process.env.DEMO || development
const build = !demo

const config = {
  input: 'src/index.ts',
  output: {
    sourcemap: true,
    globals: {
      'two.js': 'Two'
    }
  },
  plugins: [
    alias({
      resolve: ['.ts'],
      entries: Object
        .entries(tsconfig.compilerOptions.paths)
        .map(([find, [replacement]]) => ({ find, replacement }))
    })
  ]
}

export default [
  build && {
    ...config,
    external: ['two.js', 'word-wrapper'],
    output: [
      { ...config.output, file: pkg.main, format: 'cjs' },
      { ...config.output, file: pkg.module, format: 'es' }
    ],
    plugins: [
      ...config.plugins,
      eslint(),
      ts(),
      cleaner({ targets: [pkg.main.replace(/\/[^\/]+$/, '')] }),
    ]
  },

  build && {
    ...config,
    external: ['two.js'],
    output: {
      ...config.output,
      file: pkg.browser,
      format: 'umd',
      name: pkg.name
        .split(/[^a-z0-9]+/i)
        .map(part => part && part[0].toUpperCase() + part.slice(1))
        .join('')
    },
    plugins: [
      ...config.plugins,
      ts({
        transpileOnly: true,
        tsconfig: tsconfig => ({ ...tsconfig, target: 'es5' })
      }),
      nodeResolve({ extensions: ['.ts', '.js'] }),
      commonjs(),
      terser()
    ]
  },

  demo && {
    ...config,
    input: 'demo/index.ts',
    output: {
      ...config.output,
      file: 'demo-dist/index.js',
      format: 'iife',
      banner: 'if (typeof window !== "undefined" && !("process" in window)) window.process = { env: {}, argv: [], stderr: {} };'
    },
    plugins: [
      ...config.plugins,
      alias({
        resolve: ['.ts'],
        entries: { 'two.js': 'node_modules/two.js/build/two.js' }
      }),
      ts({
        tsconfig: tsconfig => ({
          ...tsconfig,
          declaration: false
        })
      }),
      cleaner({ targets: ['demo-dist'] }),
      nodeResolve({ extensions: ['.ts', '.js'] }),
      commonjs(),
      html({ title: `${pkg.name} demo` }),
      builtins(),
      production && terser(),
      development && serve('demo-dist')
    ]
  }
].filter(Boolean)
