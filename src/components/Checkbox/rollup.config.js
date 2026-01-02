// src/components/Button/rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/components/Checkbox/src/index.js', // or index.tsx if using TS
  output: {
    file: 'src/components/Checkbox/dist/checkbox.es.js',
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({ babelHelpers: 'bundled' }),
  ],
  // Do NOT set external: ['react', 'react-dom']
};
