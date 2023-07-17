const printer = require("../index");

printer.options.timeHour12 = true;

printer.log("test");

global.__DEV__ = true; // do not set this to true.