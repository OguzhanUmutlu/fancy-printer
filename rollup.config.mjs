import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import nodeResolve from "@rollup/plugin-node-resolve";
import {defineConfig} from "rollup";
import dts from "rollup-plugin-dts";

export default [
    defineConfig({
        input: "dist/ts/printer.js",
        output: [
            {file: "dist/index.esm.js", format: "esm", sourcemap: true},
            {file: "dist/index.esm.min.js", format: "esm", plugins: [terser()], sourcemap: true},
            {file: "dist/index.cjs.js", format: "cjs", exports: "named", sourcemap: true},
            {file: "dist/index.cjs.min.js", format: "cjs", exports: "named", plugins: [terser()], sourcemap: true},
            {
                file: "dist/index.umd.js",
                format: "umd",
                name: "Printer",
                exports: "named",
                sourcemap: true
            },
            {
                file: "dist/index.umd.min.js",
                format: "umd",
                name: "Printer",
                exports: "named",
                plugins: [terser()],
                sourcemap: true
            }
        ],
        plugins: [
            nodeResolve({preferBuiltins: false}),
            commonjs()
        ]
    }),

    // TypeScript definitions
    defineConfig({
        input: "dist/ts/printer.d.ts",
        output: {file: "dist/index.d.ts", format: "es"},
        plugins: [dts()]
    })
];
