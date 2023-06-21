const printer = require("../index");

printer.log("Never gonna give you up!");
printer.table(["test"])

global.__DEV__ = true; // do not set this to true.