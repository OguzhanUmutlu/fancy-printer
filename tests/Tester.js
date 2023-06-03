let fn, index = 0;

const self = module.exports = {
    set: function (f) {
        fn = f;
        index = 0;
        return self;
    },
    test: function (expected, ...args) {
        const printer = require("../index");
        let i = ++index;
        const start = performance.now();
        const got = fn(...args);
        const s = performance.now() - start;
        if (got !== expected) printer.warn("Test #" + i + " failed: %v, Expected: %v", got, expected);
        else printer.pass("Test #" + i + " passed in " + s.toFixed(2) + "ms.");
        return got === expected;
    }
};