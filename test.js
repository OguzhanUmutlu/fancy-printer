require("./index").makeGlobal(true).makeLoggerFile();

printer.pass("Passed!");
printer.fail("Failed!");
printer.error("An error occurred!");
printer.warn("Something might go wrong!");
printer.info("This is a message!");
printer.debug("Check the line 5!");
printer.notice("Attention please!");
printer.log("An original log!");