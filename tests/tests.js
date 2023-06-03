require("../index").makeGlobal().makeLoggerFile({
    folder: __dirname + "/logs"
});

const {test} = require("./Tester.js").set((...s) => printer.substitute(...s));

test("test", "test");
test("test test2", "test", "test2");
test("test", "test", "", "");
test("test", "", "test", "", "");
test("test%s", "test%s");
test("test test", "test %s", "test");
test("test %s 1", "test %s", 1);
test("test * d %s 1", "test %s d %s", "*", 1);
test("test a d b", "test %s d %s", "a", "b");
test("test %% test", "test %% test");
test("test % test test2", "test %% test", "test2");