import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import copy from 'rollup-plugin-copy';
// Static assets will vary depending on the application
const copyConfig = {
  targets: [
    { src: 'src/build-index.html', dest: 'public/', rename: 'index.html' },
    { src: 'node_modules/@webcomponents', dest: 'public/bundle_modules' },
    { src: 'assets', dest: 'public'}
  ],
};

// The main JavaScript bundle for modern browsers that support
// JavaScript modules and other ES2015+ features.
const config = {
  input: 'src/graficarte-store-app.js',
  output: {
    dir: 'public/src/components',
    format: 'es',
  },
  plugins: [
    minifyHTML(),
    copy(copyConfig),
    resolve(),
    terser()
  ],
  preserveEntrySignatures: false,
};

export default config;