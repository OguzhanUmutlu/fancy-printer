const Printer = require("./index");
const printer = require("./index").static;

printer.pass("Passed!");
printer.fail("Failed!");
printer.error("An error occurred!");
printer.warn("Something might go wrong!");
printer.info("This is a message!");
printer.debug("Check the line 5!");
printer.log("An original log!");

printer.tag("pass", "This worked as well!");