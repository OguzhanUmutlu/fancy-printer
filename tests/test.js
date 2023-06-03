const {brackets} = require("../index").makeGlobal().makeLoggerFile({
    folder: __dirname + "/logs"
});

brackets.pass("Passed!");
brackets.fail("Failed!");
brackets.error("An error occurred!");
brackets.warn("Something might go wrong!");
brackets.info("This is a message!");
brackets.debug("Check the line 5!");
brackets.notice("Attention please!");
brackets.log("An original log!");
brackets.ready("I am ready!");
brackets.assert(5 % 2 === 0, "5 is not divisible by 2!");