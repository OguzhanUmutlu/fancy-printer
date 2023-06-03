require("../index").makeGlobal().makeLoggerFile({
    folder: __dirname + "/logs"
});

printer.log("a %c b %c c", "color: white", "color: whiteBright");