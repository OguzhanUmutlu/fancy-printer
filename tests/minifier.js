const fs = require("fs");
const uglify = require("uglify-js");
const printer = require("../index");

printer.clear();
printer.info("Minifying...");
fs.writeFileSync("../index.min.js", uglify.minify(fs.readFileSync("../index.js", "utf8")).code);
printer.pass("Successfully minified!");