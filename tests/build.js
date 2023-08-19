const fs = require("fs");
const path = require("path");
const uglify = require("uglify-js");
const printer = require("../index");

const T = Date.now();
printer.clear();
printer.info("Building...");
const original = fs.readFileSync(path.join(__dirname, "../index.js"), "utf8");

fs.writeFileSync(path.join(__dirname, "../index.min.js"), uglify.minify(original).code);

const spl = original.split("/*@buildExport*/");
const moduleCode = spl[0] + original
    .split("/*@buildModule")[1]
    .split("@buildModule*/")[0] + spl[2];
fs.writeFileSync(
    path.join(__dirname, "../index.module.js"),
    moduleCode
);

fs.writeFileSync(path.join(__dirname, "../index.module.min.js"), uglify.minify(moduleCode).code);

printer.pass("Successfully built in " + (Date.now() - T) + "ms!");