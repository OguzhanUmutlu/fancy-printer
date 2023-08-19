const fs = require("fs");
const path = require("path");
const uglify = require("uglify-js");
const printer = require("../index");

const T = Date.now();
printer.clear();
printer.info("Building...");
const original = fs.readFileSync(path.join(__dirname, "../index.js"), "utf8");

fs.writeFileSync(path.join(__dirname, "../build/index.min.js"), uglify.minify(original).code);

const spl = original.split("/*@buildExport*/");
const moduleCode = spl[0] + original
    .split("/*@buildModule")[1]
    .split("@buildModule*/")[0] + spl[2];
fs.writeFileSync(
    path.join(__dirname, "../build/index.mjs"),
    moduleCode
);

fs.writeFileSync(path.join(__dirname, "../build/index.min.mjs"), "//noinspection ALL\n" + uglify.minify(moduleCode).code);

const originalDts = fs.readFileSync(path.join(__dirname, "../index.d.ts"), "utf8");
fs.writeFileSync(path.join(__dirname, "../build/index.d.mts"), originalDts);
fs.writeFileSync(path.join(__dirname, "../build/index.min.d.ts"), originalDts);
fs.writeFileSync(path.join(__dirname, "../build/index.min.d.mts"), originalDts);

printer.pass("Successfully built in " + (Date.now() - T) + "ms!");