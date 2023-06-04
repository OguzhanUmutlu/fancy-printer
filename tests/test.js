require("../index").makeGlobal().makeLoggerFile({
    folder: __dirname + "/logs",
    format: "%YYYY/%MM-%month/%DD.log",
    month: "short",
    day: "short"
});

printer.log("test");