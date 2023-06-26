const fs = require("fs");
const path = require("path");
const uglify = require("uglify-js");
const printer = require("../index");

printer.clear();
printer.info("Minifying...");
fs.writeFileSync(path.join(__dirname, "../index.min.js"), uglify.minify(fs.readFileSync(path.join(__dirname, "../index.js"), "utf8")).code);
printer.pass("Successfully minified!");