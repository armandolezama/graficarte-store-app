
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import copy from 'rollup-plugin-copy';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false

const copyConfig = {
  targets: [
    { src: 'assets', dest: 'public' },
  ],
};

export default {
	input: 'src/graficarte-store-app.js',
	output: {
		file: 'public/src/graficarte-store-app-bundle.js',
		format: 'iife', // immediately-invoked function expression — suitable for <script> tags
		sourcemap: true,
    name: 'graficarteStoreApp'
	},
	plugins: [
		resolve(), // tells Rollup how to find date-fns in node_modules
		commonjs(), // converts date-fns to ES modules
		terser(), // minify, but only in production
    copy(copyConfig)
	]
};