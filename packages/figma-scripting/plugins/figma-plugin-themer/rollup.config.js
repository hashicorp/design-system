// rollup.config.js
const rollupTypescript2 = require('rollup-plugin-typescript2');
const htmlBundle = require('rollup-plugin-html-bundle');
const nodeResolve = require('@rollup/plugin-node-resolve').nodeResolve;
const commonjs = require('@rollup/plugin-commonjs');
const replace = require('@rollup/plugin-replace');
const postcss = require('rollup-plugin-postcss');
const { terser } = require('rollup-plugin-terser');
const json = require('rollup-plugin-json');

const isProd = process.env.NODE_ENV === 'production';

export default [
    {
        input: 'src/main/main.ts',
        output: {
            file: 'dist/main.js',
            format: 'iife',
        },
        plugins: [
            commonjs(),
            nodeResolve({
                browser: true,
            }),
            json(),
            rollupTypescript2({ include: ['./src/**/*.ts+(|x)', '../figma-plugin-shared/**/*.ts+(|x)'] }),
            terser(),
        ],
    },
    {
        input: 'src/ui/ui.tsx',
        output: {
            file: 'dist/ui.js',
            format: 'iife',
            name: 'ui',
        },
        plugins: [
            replace({
                'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
                preventAssignment: true,
            }),
            commonjs(),
            nodeResolve(),
            json(),
            rollupTypescript2({ include: ['./src/**/*.ts+(|x)', '../figma-plugin-shared/**/*.ts+(|x)'] }),
            htmlBundle({
                template: 'src/ui/ui.html',
                target: 'dist/ui.html',
                inline: true,
            }),
            postcss({
                use: ['sass'],
                plugins: [require('postcss-import'), require('tailwindcss')],
                // minimize: false,
            }),
            terser(),
        ],
    },
];
