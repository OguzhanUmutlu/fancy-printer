import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import nodeResolve from "@rollup/plugin-node-resolve";
import {defineConfig} from "rollup";
import dts from "rollup-plugin-dts";

export default [
    defineConfig({
        input: "dist/ts/printer.js",
        output: [
            {file: "dist/index.esm.js", format: "esm"},
            {file: "index.esm.min.js", format: "esm", plugins: [terser()]},
            {file: "dist/index.cjs.js", format: "cjs"},
            {file: "index.cjs.min.js", format: "cjs", plugins: [terser()]},
            {
                file: "dist/index.umd.js",
                format: "umd",
                name: "Printer",
                exports: "default"
            },
            {
                file: "index.umd.min.js",
                format: "umd",
                name: "Printer",
                exports: "default",
                plugins: [terser()]
            }
        ],
        plugins: [
            nodeResolve({preferBuiltins: false}),
            commonjs()
        ]
    }),
    defineConfig({
        input: "dist/ts/printer.d.ts",
        output: {
            file: "index.d.ts",
            format: "es"
        },
        plugins: [dts()]
    })
];
