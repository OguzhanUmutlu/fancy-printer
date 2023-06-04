require("../index").makeGlobal().makeLoggerFile({
    folder: __dirname + "/logs",
    format: "%YYYY/%MM-%month/%DD.log"
});

printer.log("test");