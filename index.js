// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols

const isWeb = typeof require === "undefined";

// Credits to: https://npmjs.com/package/color-name
const knownColors = {
    "aliceblue": [240, 248, 255], "antiquewhite": [250, 235, 215], "aqua": [0, 255, 255], "aquamarine": [127, 255, 212],
    "azure": [240, 255, 255], "beige": [245, 245, 220], "bisque": [255, 228, 196], "black": [0, 0, 0],
    "blanchedalmond": [255, 235, 205], "blue": [0, 0, 255], "blueviolet": [138, 43, 226], "brown": [165, 42, 42],
    "burlywood": [222, 184, 135], "cadetblue": [95, 158, 160], "chartreuse": [127, 255, 0], "chocolate": [210, 105, 30],
    "coral": [255, 127, 80], "cornflowerblue": [100, 149, 237], "cornsilk": [255, 248, 220], "crimson": [220, 20, 60],
    "cyan": [0, 255, 255], "darkblue": [0, 0, 139], "darkcyan": [0, 139, 139], "darkgoldenrod": [184, 134, 11],
    "darkgray": [169, 169, 169], "darkgreen": [0, 100, 0], "darkgrey": [169, 169, 169], "darkkhaki": [189, 183, 107],
    "darkmagenta": [139, 0, 139], "darkolivegreen": [85, 107, 47], "darkorange": [255, 140, 0],
    "darkorchid": [153, 50, 204], "darkred": [139, 0, 0], "darksalmon": [233, 150, 122],
    "darkseagreen": [143, 188, 143], "darkslateblue": [72, 61, 139], "darkslategray": [47, 79, 79],
    "darkslategrey": [47, 79, 79], "darkturquoise": [0, 206, 209], "darkviolet": [148, 0, 211],
    "dodgerblue": [30, 144, 255], "firebrick": [178, 34, 34], "floralwhite": [255, 250, 240],
    "forestgreen": [34, 139, 34], "fuchsia": [255, 0, 255], "gainsboro": [220, 220, 220],
    "ghostwhite": [248, 248, 255], "gold": [255, 215, 0], "goldenrod": [218, 165, 32], "gray": [128, 128, 128],
    "green": [0, 128, 0], "greenyellow": [173, 255, 47], "grey": [128, 128, 128], "honeydew": [240, 255, 240],
    "hotpink": [255, 105, 180], "indianred": [205, 92, 92], "indigo": [75, 0, 130], "ivory": [255, 255, 240],
    "khaki": [240, 230, 140], "lavender": [230, 230, 250], "lavenderblush": [255, 240, 245], "lawngreen": [124, 252, 0],
    "lemonchiffon": [255, 250, 205], "lightblue": [173, 216, 230], "lightcoral": [240, 128, 128],
    "lightcyan": [224, 255, 255], "lightgoldenrodyellow": [250, 250, 210], "lightgray": [211, 211, 211],
    "lightgreen": [144, 238, 144], "lightgrey": [211, 211, 211], "lightpink": [255, 182, 193],
    "lightsalmon": [255, 160, 122], "lightseagreen": [32, 178, 170], "lightskyblue": [135, 206, 250],
    "lightslategray": [119, 136, 153], "lightslategrey": [119, 136, 153], "lightsteelblue": [176, 196, 222],
    "lightyellow": [255, 255, 224], "lime": [0, 255, 0], "limegreen": [50, 205, 50], "linen": [250, 240, 230],
    "magenta": [255, 0, 255], "maroon": [128, 0, 0], "mediumaquamarine": [102, 205, 170], "mediumblue": [0, 0, 205],
    "mediumorchid": [186, 85, 211], "mediumpurple": [147, 112, 219], "mediumseagreen": [60, 179, 113],
    "mediumslateblue": [123, 104, 238], "mediumspringgreen": [0, 250, 154], "mediumturquoise": [72, 209, 204],
    "mediumvioletred": [199, 21, 133], "midnightblue": [25, 25, 112], "mintcream": [245, 255, 250],
    "mistyrose": [255, 228, 225], "moccasin": [255, 228, 181], "navajowhite": [255, 222, 173], "navy": [0, 0, 128],
    "oldlace": [253, 245, 230], "olive": [128, 128, 0], "olivedrab": [107, 142, 35], "orange": [255, 165, 0],
    "orangered": [255, 69, 0], "orchid": [218, 112, 214], "palegoldenrod": [238, 232, 170],
    "palegreen": [152, 251, 152], "paleturquoise": [175, 238, 238], "palevioletred": [219, 112, 147],
    "papayawhip": [255, 239, 213], "peachpuff": [255, 218, 185], "peru": [205, 133, 63], "pink": [255, 192, 203],
    "plum": [221, 160, 221], "powderblue": [176, 224, 230], "purple": [128, 0, 128], "rebeccapurple": [102, 51, 153],
    "red": [255, 0, 0], "rosybrown": [188, 143, 143], "royalblue": [65, 105, 225], "saddlebrown": [139, 69, 19],
    "salmon": [250, 128, 114], "sandybrown": [244, 164, 96], "seagreen": [46, 139, 87], "seashell": [255, 245, 238],
    "sienna": [160, 82, 45], "silver": [192, 192, 192], "skyblue": [135, 206, 235], "slateblue": [106, 90, 205],
    "slategray": [112, 128, 144], "slategrey": [112, 128, 144], "snow": [255, 250, 250], "springgreen": [0, 255, 127],
    "steelblue": [70, 130, 180], "tan": [210, 180, 140], "teal": [0, 128, 128], "thistle": [216, 191, 216],
    "tomato": [255, 99, 71], "turquoise": [64, 224, 208], "violet": [238, 130, 238], "wheat": [245, 222, 179],
    "white": [255, 255, 255], "whitesmoke": [245, 245, 245], "yellow": [255, 255, 0], "yellowgreen": [154, 205, 50]
};
// Credits to: https://npmjs.com/package/ansi-styles
const ansiStyles = {
    // Modifiers
    reset: [0, 0],
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29],

    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],

    // Bright color
    blackBright: [90, 39],
    redBright: [91, 39],
    greenBright: [92, 39],
    yellowBright: [93, 39],
    blueBright: [94, 39],
    magentaBright: [95, 39],
    cyanBright: [96, 39],
    whiteBright: [97, 39],

    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],

    // Bright color
    bgBlackBright: [100, 49],
    bgRedBright: [101, 49],
    bgGreenBright: [102, 49],
    bgYellowBright: [103, 49],
    bgBlueBright: [104, 49],
    bgMagentaBright: [105, 49],
    bgCyanBright: [106, 49],
    bgWhiteBright: [107, 49]
};
// Credits to: https://npmjs.com/package/color-convert
const conv = {
    hex: a => {
        if (a.startsWith("#")) a = a.substring(1);
        if (a.length === 3) a = a.split("").map(i => i + i).join("");
        if (a.length !== 6) return Color.rgb(0, 0, 0);
        const num = parseInt(a, 16);
        return [(num >> 16) & 0xFF, (num >> 8) & 0xFF, num & 0xFF];
    },
    hsl: (a, b, c) => {
        const h = a / 360;
        const s = b / 100;
        const l = c / 100;
        let t2;
        let t3;
        let val;
        if (s === 0) {
            val = l * 255;
            return [val, val, val];
        }
        if (l < 0.5) t2 = l * (1 + s);
        else t2 = l + s - l * s;
        const t1 = 2 * l - t2;
        const rgb = [0, 0, 0];
        for (let i = 0; i < 3; i++) {
            t3 = h + 1 / 3 * -(i - 1);
            if (t3 < 0) t3++;
            if (t3 > 1) t3--;
            if (6 * t3 < 1) val = t1 + (t2 - t1) * 6 * t3;
            else if (2 * t3 < 1) val = t2;
            else if (3 * t3 < 2) val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
            else val = t1;
            rgb[i] = val * 255;
        }
        return rgb;
    },
    hsv: (a, b, c) => {
        const h = a / 60;
        const s = b / 100;
        let v = c / 100;
        const hi = Math.floor(h) % 6;
        const f = h - Math.floor(h);
        const p = 255 * v * (1 - s);
        const q = 255 * v * (1 - (s * f));
        const t = 255 * v * (1 - (s * (1 - f)));
        v *= 255;
        return [
            [v, t, p],
            [q, v, p],
            [p, v, t],
            [p, q, v],
            [t, p, v],
            [v, p, q]
        ][hi];
    }
};

const Color = {
    supportsColor: {hasBasic: true, has256: true, has16m: true}, // todo
    rgb: (r, g, b) => (t => `\x1B[38;2;${r};${g};${b}m${t}${isWeb ? "\x1B[39m" : "\x1B[39m"}`),
    hex: a => Color.rgb(...conv.hex(a)),
    hsl: (a, b, c) => Color.rgb(...conv.hsl(a, b, c)),
    hsv: (a, b, c) => Color.rgb(...conv.hsv(a, b, c)),
    bgRgb: (r, g, b) => (t => `\x1B[48;2;${r};${g};${b}m${t}${isWeb ? "\x1B[39m" : "\x1B[49m"}`),
    bgHex: a => Color.bgRgb(...conv.hex(a)),
    bgHsl: (a, b, c) => Color.bgRgb(...conv.hsl(a, b, c)),
    bgHsv: (a, b, c) => Color.bgRgb(...conv.hsv(a, b, c))
};
Object.keys(knownColors).forEach(k => {
    Color[k] = Color.rgb(...knownColors[k]);
    Color["bg" + k[0].toUpperCase() + k.substring(1)] = Color.bgRgb(...knownColors[k]);
});
const ansiKeys = Object.keys(ansiStyles);
ansiKeys.forEach((k, i) => {
    const l = ansiStyles[k];
    Color[k] = r => r ? (isWeb ? `\x1B[99;${i}m${r}\x1B[39m` : `\x1B[${l[0]}m${r}\x1B[${l[1]}m`) : "";
});

const fs = isWeb ? null : require("fs");
const path = isWeb ? null : require("path");
const util = isWeb ? {
    inspect: (a, _, __, clr) => JSON.stringify(a) // todo
} : require("util");

const fnCheck = (s, ...args) => typeof s === "function" ? s(...args) : s;
const ClearAll = isWeb ? Color.reset("$").replace("$", "") : "\x1B[39m\x1B[49m\x1B[22m\x1B[23m\x1B[24m\x1B[29m";
const cH = (opts, name, c) => fnCheck(opts[name ? name + c : c.toLowerCase()]);
const componentHelper = (name, opts) => ({
    color: cH(opts, name, "Color"),
    backgroundColor: cH(opts, name, "BackgroundColor"),
    padding: cH(opts, name, "Padding"),
    bold: cH(opts, name, "Bold"),
    italic: cH(opts, name, "Italic"),
    underline: cH(opts, name, "Underline"),
    strikethrough: cH(opts, name, "Strikethrough")
});

function __stack() {
    const oldLimit = Error.stackTraceLimit;
    Error.stackTraceLimit = Infinity;
    const orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function (_, stack) {
        return stack;
    };
    const err = new Error;
    Error.captureStackTrace(err, arguments.callee);
    const stack = err.stack;
    Error.prepareStackTrace = orig;
    Error.stackTraceLimit = oldLimit;
    return stack.map(i => ({
        this: i.getThis(),
        typeName: i.getTypeName(),
        function: i.getFunction(),
        functionName: i.getFunctionName(),
        methodName: i.getMethodName(),
        fileName: i.getFileName(),
        lineNumber: i.getLineNumber(),
        columnNumber: i.getColumnNumber(),
        evalOrigin: i.getEvalOrigin(),
        topLevel: i.isToplevel(),
        eval: i.isEval(),
        native: i.isNative(),
        constructor: i.isConstructor()
    }));
}

const DEFAULT_OPTIONS = {
    format: "%namespace%date %time %tag %text",
    substitutionsEnabled: true,
    componentsEnabled: true,
    newLine: true,
    namespace: "",
    colorEnabled: true,

    defaultColor: "",
    defaultBackgroundColor: "",

    tagColor: "",
    tagBold: true,
    tagItalic: false,
    tagUnderline: false,
    tagStrikethrough: false,
    tagPadding: 2,

    dateColor: "",
    dateBackgroundColor: "blueBright",
    dateBold: true,
    dateItalic: false,
    dateUnderline: false,
    dateStrikethrough: false,
    datePadding: 1,
    dateOptions: {
        month: "short",
        day: "numeric"
    },

    timeColor: "",
    timeBackgroundColor: "blue",
    timeBold: true,
    timeItalic: false,
    timeUnderline: false,
    timeStrikethrough: false,
    timePadding: 1,
    timeDate: false,
    timeHour: true,
    timeMinute: true,
    timeSecond: true,
    timeMillisecond: false,
    timeMillisecondLength: 3,

    groupColor: "",
    groupBackgroundColor: "",

    namespaceColor: "",
    namespaceBackgroundColor: "magenta",
    namespaceBold: true,
    namespaceItalic: false,
    namespaceUnderline: false,
    namespaceStrikethrough: false,
    namespacePadding: 1,

    filenameColor: "red",
    filenameBackgroundColor: "",
    filenameBold: true,
    filenameItalic: false,
    filenameUnderline: false,
    filenameStrikethrough: false,
    filenamePadding: 0,
    filenameBase: true,

    lineColor: "red",
    lineBackgroundColor: "",
    lineBold: true,
    lineItalic: false,
    lineUnderline: false,
    lineStrikethrough: false,
    linePadding: 0,

    columnColor: "red",
    columnBackgroundColor: "",
    columnBold: true,
    columnItalic: false,
    columnUnderline: false,
    columnStrikethrough: false,
    columnPadding: 0,

    stackColor: "red",
    stackBackgroundColor: "",
    stackBold: true,
    stackItalic: false,
    stackUnderline: false,
    stackStrikethrough: false,
    stackPadding: 0,
    stackBase: true,

    /*fileColor: "",
    fileBackgroundColor: "",
    fileBold: false,
    fileItalic: false,
    fileUnderline: false,
    fileStrikethrough: false,
    filePadding: 0,

    rowColor: "",
    rowBackgroundColor: "",
    rowBold: false,
    rowItalic: false,
    rowUnderline: false,
    rowStrikethrough: false,
    rowPadding: 0,

    columnColor: "",
    columnBackgroundColor: "",
    columnBold: false,
    columnItalic: false,
    columnUnderline: false,
    columnStrikethrough: false,
    columnPadding: 0,

    stackColor: "",
    stackBackgroundColor: "",
    stackBold: false,
    stackItalic: false,
    stackUnderline: false,
    stackStrikethrough: false,
    stackPadding: 0*/
};
const webParser = (s, colors, current) => {
    return s.replaceAll(/(\x1B\[38;2;\d{1,3};\d{1,3};\d{1,3}m)|(\x1B\[48;2;\d{1,3};\d{1,3};\d{1,3}m)|(\x1B\[99;\d+m)|(\x1B\[39m)/g, m => {
        const s = m.split(";")[0];
        if (s === "\x1B[38") {
            m = m.substring(7).split("m")[0].split(";");
            current[0] = `rgb(${m.join(",")})`;
            colors.push([`color: rgb(${m.join(",")})`]);
            return "%c";
        } else if (s === "\x1B[39m") {
            colors.push([""]);
            return "%c";
        } else if (s === "\x1B[48") {
            m = m.substring(7).split("m")[0].split(";");
            current[1] = `rgb(${m.join(",")})`;
            colors.push([`background-color: rgb(${m.join(",")})`]);
            return "%c";
        } else if (s === "\x1B[99") {
            m = ansiKeys[m.substring(5).split("m")[0]];
            const pushing = {
                // Modifiers
                reset: [""],
                bold: ["font-weight: bold"],
                dim: ["color: rgba(0, 0, 0, 0.5)", "rgba(0, 0, 0, 0.5)"],
                italic: ["font-style: italic"],
                underline: ["text-decoration: underline"],
                inverse: ["color: " + (current[1] || "auto") + "; background-color: " + (current[0] || "auto"), current[0], current[1]],
                hidden: ["opacity: 0"],
                strikethrough: ["text-decoration: line-through"],

                black: ["color: black", "black"],
                red: ["color: red", "red"],
                green: ["color: green", "green"],
                yellow: ["color: yellow", "yellow"],
                blue: ["color: blue", "blue"],
                magenta: ["color: magenta", "cyan"],
                cyan: ["color: cyan", "cyan"],
                white: ["color: white", "white"],

                blackBright: ["color: rgb(128, 128, 128)", "rgb(128, 128, 128)"],
                redBright: ["color: rgb(255, 0, 0)", "rgb(255, 0, 0)"],
                greenBright: ["color: rgb(0, 255, 0)", "rgb(0, 255, 0)"],
                yellowBright: ["color: rgb(255, 255, 0)", "rgb(255, 255, 0)"],
                blueBright: ["color: rgb(0, 0, 255)", "rgb(0, 0, 255)"],
                magentaBright: ["color: rgb(255, 0, 255)", "rgb(255, 0, 255)"],
                cyanBright: ["color: rgb(0, 255, 255)", "rgb(0, 255, 255)"],
                whiteBright: ["color: rgb(255, 255, 255)", "rgb(255, 255, 255)"],

                bgBlack: ["background-color: black", null, "black"],
                bgRed: ["background-color: red", null, "red"],
                bgGreen: ["background-color: green", null, "green"],
                bgYellow: ["background-color: yellow", null, "yellow"],
                bgBlue: ["background-color: blue", null, "blue"],
                bgMagenta: ["background-color: magenta", null, "magenta"],
                bgCyan: ["background-color: cyan", null, "cyan"],
                bgWhite: ["background-color: white", null, "white"],

                bgBlackBright: ["background-color: rgb(128, 128, 128)", null, "rgb(128, 128, 128)"],
                bgRedBright: ["background-color: rgb(255, 0, 0)", null, "rgb(255, 0, 0)"],
                bgGreenBright: ["background-color: rgb(0, 255, 0)", null, "rgb(0, 255, 0)"],
                bgYellowBright: ["background-color: rgb(255, 255, 0)", null, "rgb(255, 255, 0)"],
                bgBlueBright: ["background-color: rgb(0, 0, 255)", null, "rgb(0, 0, 255)"],
                bgMagentaBright: ["background-color: rgb(255, 0, 255)", null, "rgb(255, 0, 255)"],
                bgCyanBright: ["background-color: rgb(0, 255, 255)", null, "rgb(0, 255, 255)"],
                bgWhiteBright: ["background-color: rgb(255, 255, 255)", null, "rgb(255, 255, 255)"]
            }[m];
            current[0] = pushing[1] || current[0];
            current[1] = pushing[2] || current[1];
            colors.push(pushing);
            return "%c";
        }
    });
};

function CustomError(message) {
    const error = new Error(message);
    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, CustomError);
    } else {
        this.stack = error.stack;
    }
}

CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.constructor = CustomError;


/**
 * @param {Object} options
 * @returns {Object<any, any> | any}
 * @constructor
 */
function Printer(options = {}) {
    const self = {};
    if (typeof options !== "object" || Array.isArray(options)) options = {};
    Printer.setDefault(options, Printer.DEFAULT_OPTIONS);
    self.options = options;
    self.Printer = Printer;
    const prototypeNames = Object.keys(prototype);
    for (let i = 0; i < prototypeNames.length; i++) {
        const name = prototypeNames[i];
        const fn = prototype[name];
        self[name] = function (...args) {
            return fn(self, ...args);
        };
    }
    self._periodicOptions = null;
    self.stdin = isWeb ? null : (process.stdin || process.openStdin());
    self.stdout = isWeb ? {
        write: s => {
            const colors = [];
            let current = [null, null];
            s = webParser(s, colors, current);
            const clr = [];
            let tmp = [];
            for (let i = 0; i < colors.length; i++) {
                if (colors[i][0] === "") tmp = [];
                else tmp.push(colors[i][0]);
                clr.push(tmp.join(";"));
            }
            console.log(s, ...clr); // THIS PART IS ONLY RAN IF IT'S ON WEB! If it's not web: --\
        } //                                                                                     |
    } : process.stdout; // <--------------------------------------------------------------------/
    self.tags = {
        pass: {text: "PASS", backgroundColor: "greenBright", textColor: "green"},
        fail: {text: "FAIL", backgroundColor: "redBright", textColor: "redBright"},
        error: {text: "ERR!", backgroundColor: "red", textColor: "red"},
        warn: {text: "WARN", backgroundColor: "yellow", textColor: "yellow"},
        info: {text: "INFO", backgroundColor: "blueBright", textColor: "blue"},
        debug: {text: "DEBUG", backgroundColor: "gray", textColor: "gray"},
        notice: {text: "NOTICE", backgroundColor: "cyanBright", textColor: "cyan"},
        log: {text: "LOG", backgroundColor: "gray", textColor: "white"},
        assert: {text: "ASSERT", backgroundColor: "white", color: "black", textColor: "gray"},
        ready: {text: "READY", backgroundColor: "magenta", textColor: "magenta"}
    };
    self.streams = new Map;
    self.chr = "%";
    self.components = {};
    self.substitutions = {};
    self._times = {};
    self._counts = {};
    self._group = 0;
    self._namespace = options.namespace || "";

    /// COMPONENTS ///

    self.addComponent("date", opts => {
        const date = new Date;
        const rs = date.toLocaleString("en", opts.dateOptions);
        return {result: Printer.paint(rs, componentHelper("date", opts)), plain: rs};
    });
    self.addComponent("tag", opts => {
        const tag = self.tags[opts.tag || ""] || self.tags[(opts.tag || "").toLowerCase()] || self.tags.log;
        opts.defaultColor = /*opts.defaultColor || */tag.textColor;
        const txt = typeof tag.text === "function" ? tag.text() : tag.text;
        const gotOpts = componentHelper("tag", opts);
        return {
            result: Printer.paint(txt, {
                ...gotOpts,
                color: gotOpts.color || fnCheck(tag.color),
                backgroundColor: fnCheck(tag.backgroundColor)
            }), plain: txt
        };
    });
    self.addComponent("time", opts => {
        const date = new Date;
        const l = [["Date", "getDate"], ["Hour", "getHours"], ["Minute", "getMinutes"], ["Second", "getSeconds"], ["Millisecond", "getMilliseconds", opts.timeMillisecondLength]];
        let text = "";
        for (let i = 0; i < l.length; i++) {
            const k = l[i];
            if (opts["time" + k[0]]) text += date[k[1]]().toString().padStart(k[2] || 2, "0").substring(0, k[2] || 2) + (k[0] === "Second" ? "." : ":");
        }
        text = text.substring(0, text.length - 1);
        return {
            result: Printer.paint(text, componentHelper("time", opts)), plain: text
        };
    });
    self.addComponent("namespace", opts => {
        if (!opts.namespace) return {result: "", plain: ""};
        return {
            result: Printer.paint(opts.namespace, componentHelper("namespace", opts)) + " ",
            plain: opts.namespace
        };
    });
    self.addComponent("filename", opts => {
        let file = (__stack().find(i => i.fileName && i.fileName !== __filename) || {}).fileName;
        if (opts.filenameBase) file = path.basename(file || "");
        return {
            result: Printer.paint(file, componentHelper("filename", opts)),
            plain: file
        };
    });
    self.addComponent("line", opts => {
        const line = (__stack().find(i => i.fileName && i.fileName !== __filename) || {}).lineNumber;
        return {
            result: Printer.paint(line, componentHelper("line", opts)),
            plain: line
        };
    });
    self.addComponent("column", opts => {
        const column = (__stack().find(i => i.fileName && i.fileName !== __filename) || {}).columnNumber;
        return {
            result: Printer.paint(column, componentHelper("column", opts)),
            plain: column
        };
    });
    self.addComponent("stack", opts => {
        const f = __stack().find(i => i.fileName && i.fileName !== __filename) || {};
        const t = (opts.stackBase ? path.basename(f.fileName || "") : f.fileName) + ":" + f.lineNumber + ":" + f.columnNumber;
        return {
            result: Printer.paint(t, componentHelper("stack", opts)),
            plain: t
        };
    });

    /// SUBSTITUTIONS ///

    self.addSubstitution("v", s => Printer.stringify(s));
    const objectSub = (s, {Cancel}) => {
        const type = typeof s;
        if (type !== "object" && type !== "function") return Cancel;
        return Printer.stringify(s);
    };
    self.addSubstitution("o", objectSub);
    self.addSubstitution("O", objectSub);
    self.addSubstitution("s", (s, {Cancel}) => {
        if (typeof s !== "string") return Cancel;
        return s;
    });
    self.addSubstitution("j", (s, {Cancel}) => {
        if (typeof s !== "object" || s.constructor !== Object) return Cancel;
        try {
            return JSON.stringify(s);
        } catch (e) {
            return Cancel;
        }
    });
    const integerSub = (s, Cancel) => {
        if (typeof s !== "number") return Cancel;
        return ((Math.sign(s) * Math.floor(Math.abs(s)))).toString();
    };
    self.addSubstitution("i", integerSub);
    self.addSubstitution("d", integerSub);
    self.addSubstitution("f", (s, Cancel) => {
        if (typeof s !== "number") return Cancel;
        return s.toString();
    });
    self.addSubstitution("c", (s, {Cancel, Color}) => {
        if (typeof s !== "string") return Cancel;
        Color.value = printer.css(s);
        return Color;
    });
    return self;
}

/*** @type {Object<string, (self: Printer | FancyPrinter | Object<any, any>, ...a: (any | Object<any, any | Object<any, any>>)[]) => any>} */
const prototype = {};

prototype.addFile = function (self, file) {
    if (isWeb) throw new Error("addFile() method cannot be used on web.");
    self.streams.set(file, fs.createWriteStream(file, {flags: "a"}));
    return self;
};

prototype.removeFile = function (self, file) {
    self.streams.delete(file);
    return self;
};

prototype.makeLoggerFile = function (self, options) {
    if (isWeb) throw new Error("makeLoggerFile() method cannot be used on web.");
    if (typeof options !== "object" || Array.isArray(options)) options = {};
    Printer.setDefault(options, {
        folder: "./logs", format: "log-" + self.chr + "DD-" + self.chr + "MM-" + self.chr + "YYYY.log",
        month: "long", day: "long"
    });
    self._periodicOptions = options;
    if (self.streams.get("!periodic")) return;
    let sl;
    self.streams.set("!periodic", sl = {
        write: content => {
            const options = self._periodicOptions;
            if (!fs.existsSync(options.folder)) fs.mkdirSync(options.folder);
            const d = new Date;
            const day = d.getDate();
            const month = d.getMonth() + 1;
            const year = d.getFullYear();
            const hours = d.getHours();
            const minutes = d.getMinutes();
            const seconds = d.getSeconds();
            const ms = d.getMilliseconds();
            const date = new Date;
            const list = [
                ["date", date.toLocaleString("en", {weekday: options.day}), true],
                ["month", date.toLocaleString("en", {month: options.month}), true],
                ["D", day],
                ["M", month],
                ["Y", year],
                ["h", hours],
                ["m", minutes],
                ["s", seconds],
                ["S", ms]
            ];
            const formatted = list.reduce((a, b) => a.replaceAll(new RegExp("\\" + self.chr + b[0] + (b[2] ? "" : "+"), "g"), str => {
                if (b[2]) return b[1];
                const len = str.length - 1;
                str = b[1].toString().padStart(len, "0");
                if (str.length > len) str = str.substring(str.length - len);
                return str;
            }), fnCheck(options.format, options));
            const file = path.join(options.folder, formatted);
            if (!sl._streams.has(file)) {
                if (sl._lastStream) sl._lastStream.close();
                fs.mkdirSync(path.dirname(file), {recursive: true});
                sl._streams.set(file, sl._lastStream = fs.createWriteStream(file, {flags: "a"}));
            }
            sl._streams.get(file).write(content);
        },
        _lastStream: null,
        _streams: new Map
    });
    return self;
};

prototype.makeHashedLoggerFile = function (self, options) {
    if (isWeb) throw new Error("makeHashedLoggerFile() method cannot be used on web.");
    if (typeof options !== "object" || Array.isArray(options)) options = {};
    Printer.setDefault(options, {
        folder: "./logs", radix: 16, divide: 3, format: "log-" + self.chr + "t.log"
    });
    if (!fs.existsSync(options.folder)) fs.mkdirSync(options.folder);
    const file = path.join(options.folder, fnCheck(options.format, options).replaceAll(self.chr + "t", Math.floor(Date.now() / (10 ** options.divide)).toString(options.radix)));
    self.addFile(file);
    return self;
};

prototype.makeGlobal = function (self, _console = false) {
    const gl = isWeb ? window : global;
    if (_console) gl.console = self;
    gl.Printer = self;
    gl.printer = self;
    return self;
};

prototype.new = function (self, options) {
    return new Printer(options);
};

prototype.create = function (self, options) {
    return new Printer(options);
};

prototype.namespace = function (self, namespace) {
    return self.create({...self.options, namespace});
};

prototype.addComponent = function (self, name, callback) {
    self.components[name] = callback;
    return self;
};

prototype.removeComponent = function (self, name) {
    delete self.components[name];
    return self;
};

prototype.getComponents = function (self) {
    return self.components;
};

prototype.getComponent = function (self, name) {
    return self.components[name];
};

prototype.addSubstitution = function (self, character, run) {
    self.substitutions[character] = run;
    return self;
};

prototype.removeSubstitution = function (self, character) {
    delete self.substitutions[character];
    return self;
};

prototype.getSubstitution = function (self, character) {
    return self.substitutions[character];
};

prototype.getSubstitutions = function (self) {
    return self.substitutions;
};

prototype.addTag = function (self, key, text, color, backgroundColor, textColor = "", textBackgroundColor = "") {
    self.tags[key] = {text, color, backgroundColor, textColor, textBackgroundColor};
    return self;
};

prototype.removeTag = function (self, key) {
    delete self.tags[key];
    return self;
};

prototype.getTags = function (self) {
    return self.tags;
};

prototype.getTag = function (self, key) {
    return self.tags[key];
};

prototype.setFormat = function (self, format) {
    self.options.format = format;
    return self;
};

prototype.getFormat = function (self) {
    return self.options.format;
};

prototype.setCharacter = function (self, character) {
    self.chr = character;
    return self;
};

prototype.getCharacter = function (self) {
    return self.chr;
};

prototype.println = function (self, text) {
    if (!self.stdout) return self;
    self.stdout.write(Printer.stringify(text) + "\n");
    return self;
};

prototype.printLine = function (self, text) {
    return self.println(text);
};

prototype.print = function (self, text) {
    if (!self.stdout) return self;
    self.stdout.write(Printer.stringify(text));
    return self;
};

prototype.backspace = function (self, amount = 1) {
    if (!self.stdout) return self;
    self.stdout.write("\b \b".repeat(amount));
    return self;
};

prototype.substitute = function (self, ...texts) {
    return Printer.substitute(self.substitutions, self.chr, ...texts);
};

prototype.log = function (self, ...texts) {
    const options = self.options;
    let text = "";
    if (self.options.substitutionsEnabled) {
        text = self.substitute(...texts);
    } else {
        for (let i = 0; i < texts.length; i++) {
            let t = Printer.stringify(texts[i]);
            text += t;
            if (i !== texts.length - 1) text += " ";
        }
    }
    text += ClearAll;
    const lines = Printer.stringify(text).split("\n");
    let comp = {};
    let formatted = options.format;
    let colored = formatted;
    let plain = formatted;
    if (options.componentsEnabled && Object.keys(self.components).length > 0) {
        const reg = `\\${self.chr}[a-zA-Z]+`;
        const spl = fnCheck(options.format, options).split(new RegExp("(" + reg + ")", "g"));
        formatted = spl.filter(i => i).map(i => {
            if (!new RegExp("^" + reg + "$").test(i.toString())) return i;
            i = i.substring(1);
            if (!self.components[i]) return self.chr + i;
            i = comp[i] || self.components[i](options);
            if (typeof i === "string" || typeof i === "number") return i.toString();
            if (typeof i !== "object") throw new Error("Expected the component to throw string, number or an object, got: " + typeof i);
            return i;
        });
        colored = formatted.map(i => typeof i === "string" ? i : i.result).join("");
        plain = formatted.map(i => typeof i === "string" ? i : i.plain).join("");
    }
    lines.forEach(line => {
        const l = line;
        line = Printer.color(line, options.defaultColor);
        line = Printer.color(line, options.defaultBackgroundColor);
        const plainText = " ".repeat(self._group) + plain.replaceAll(self.chr + "text", l).replaceAll(/\x1B\[\d+m/g, "") + (options.newLine ? "\n" : "");
        if (options.colorEnabled) self[options.newLine ? "println" : "print"](Printer.paint(" ".repeat(self._group), componentHelper("group", options)) + colored.replaceAll(self.chr + "text", line));
        else self[options.newLine ? "println" : "print"](plainText);
        self.streams.forEach(stream => stream.write(plainText));
    });
    return self;
};

prototype.tag = function (self, tag, ...texts) {
    const {tag: old} = self.options;
    const {defaultColor, defaultBackgroundColor} = self.options;
    // noinspection JSConstantReassignment
    self.options.tag = tag;
    self.log(...texts);
    // noinspection JSConstantReassignment
    self.options.tag = old;
    self.options.defaultColor = defaultColor;
    self.options.defaultBackgroundColor = defaultBackgroundColor;
    return self;
};

prototype.pass = function (self, ...texts) {
    return self.tag("pass", ...texts);
};

prototype.fail = function (self, ...texts) {
    return self.tag("fail", ...texts);
};

prototype.error = function (self, ...texts) {
    return self.tag("error", ...texts);
};

prototype.err = function (self, ...texts) {
    return self.error(...texts);
};

prototype.warning = function (self, ...texts) {
    return self.warn(...texts);
};

prototype.warn = function (self, ...texts) {
    return self.tag("warn", ...texts);
};

prototype.inform = function (self, ...texts) {
    return self.tag("info", ...texts);
};

prototype.info = function (self, ...texts) {
    return self.inform(...texts);
};

prototype.debug = function (self, ...texts) {
    return self.tag("debug", ...texts);
};

prototype.notice = function (self, ...texts) {
    return self.tag("notice", ...texts);
};

prototype.ready = function (self, ...texts) {
    return self.tag("ready", ...texts);
};

prototype.clear = function (self) {
    if (self.stdout && self.stdout.isTTY) self.stdout.write("\x1B[2J\x1B[3J\x1B[H");
};

prototype.tableRaw = function (self, object, columns = null) {
    if (typeof object !== "object") return false;
    const notDefined = {};
    let keys, values;
    if (object instanceof Set) object = [...object];
    if (object instanceof Map) {
        const all = [...object];
        keys = all.map(i => i[0]);
        values = all.map(i => i[1]);
    } else {
        keys = Object.keys(object);
        /*** @type {any[]} */
        values = Object.values(object);
    }
    if (object.constructor === Array) keys = keys.map(i => i * 1);
    if (!keys.length) return ["┌┐\n└┘"];
    let addedVal = false;
    const columnNames = columns || values.map(i => typeof i === "object" ? Object.keys(i) : []).flat();
    if (values.some(i => typeof i !== "object")) {
        addedVal = true;
        columnNames.push("Value");
    }
    const table = [[["", "", ""], ...columnNames.map(i => [i, i, i])]];
    const ins = (s, color = true) => require("util").inspect(s, false, null, color);
    keys.forEach((key, index) => {
        const value = values[index];
        const objKeys = typeof value === "object" ? Object.keys(value) : [];
        table.push([key, ...columnNames.map((i, j) => j === columnNames.length - 1 && addedVal && typeof value !== "object" ? value : (objKeys.includes(i) ? value[i] : notDefined))].map(i => [i, ins(i), ins(i, false)]));
    });
    const columnLengths = new Array(table[0].length).fill(0).map((_, i) => table.reduce((a, b) => Math.max(a, b[i][2].length), 0));
    const topSp = columnLengths.map(i => "─".repeat(i + 2));
    let result = ["┌" + topSp.join("┬") + "┐"];
    for (let i = 0; i < table.length; i++) {
        if (i) result.push("├" + topSp.join("┼") + "┤")
        const row = table[i];
        result.push("│" + row.map((k, j) => {
            const l = k[0] === notDefined ? "" : (i ? k[1] : k[0]);
            const totalSpace = columnLengths[j] - (k[0] === notDefined ? 0 : k[2].length) + 2;
            const firstSpace = Math.round(totalSpace / 2);
            return " ".repeat(firstSpace) + l + " ".repeat(totalSpace - firstSpace);
        }).join("│") + "│");
    }
    result.push("└" + topSp.join("┴") + "┘");
    return result;
};

prototype.table = function (self, object, columns = null, tagName = "log") {
    const result = self.tableRaw(object, columns);
    if (result) result.forEach(i => tagName ? self.tag(tagName, i) : self.println(i));
    else tagName ? self.tag(tagName, object) : self.println(object);
    return self;
};

prototype.time = function (self, name = "default") {
    self._times[name] = performance.now();
    return self;
};

prototype.timeGet = function (self, name = "default") {
    return performance.now() - (self._times[name] || performance.now());
};

prototype.timeLog = function (self, name = "default", fixed = 3) {
    self.log(name + ": " + self.timeGet(name).toFixed(fixed) + "ms");
    return self;
};

prototype.timeEnd = function (self, name = "default", fixed = 3) {
    delete self._times[name];
    self.timeLog(name, fixed);
    return self;
};

prototype.count = function (self, name = "default") {
    self.log(name + ": " + (self._counts[name] = (self._counts[name] || 0) + 1));
    return self._counts[name];
};

prototype.countGet = function (self, name = "default") {
    return self._counts[name];
};

prototype.countReset = function (self, name = "default") {
    self._counts[name] = 0;
    return self;
};

prototype.group = function (self) {
    self._group++;
    return self;
};

prototype.groupEnd = function (self) {
    self._group--;
    if (self._group < 0) self._group = 0;
    return self;
};

prototype.groupGet = function (self) {
    return self._group;
};

prototype.assert = function (self, assertion, ...texts) {
    if (assertion) return self;
    self.tag("assert", ...texts);
    return self;
};

prototype.updateOptions = function (self, opts) {
    if (typeof opts !== "object" || Array.isArray(opts)) opts = {};
    Printer.setDefault(opts, Printer.DEFAULT_OPTIONS);
    self.options = {...self.options, ...opts};
    return self;
};

prototype.readStdinData = async function (self) {
    return await new Promise(r => self.stdin.once("data", r));
}

prototype.readLine = async function (self, stringify = true, trim = true) {
    if (!self.stdin) return "";
    self.stdin.resume();
    let res = await self.readStdinData();
    if (stringify) res = res.toString();
    if (trim) res = res.trim();
    self.stdin.pause();
    return res;
};

prototype.readKey = async function (self, stringify = false, trim = false) {
    if (!self.stdin) return "";
    self.stdin.setRawMode(true);
    const res = await self.readLine(false, trim);
    if (isWeb && res[0] === 3) process.exit();
    self.stdin.setRawMode(false);
    return res.toString();
};

prototype.readCustom = function (self, options) {
    if (!self.stdin) return {
        promise: new Promise(r => r("")),
        end: () => true
    };
    if (typeof options !== "object" || Array.isArray(options)) options = {};
    Printer.setDefault(options, {
        onKey: text => self.print(text),
        onBackspace: () => self.backspace(),
        onArrow: () => true,
        onEnd: () => self.print("\n"),
        onTermination: () => !isWeb && process.exit(),
        timeout: -1
    });
    let cursor = -1;
    let result = "";
    let promCb;
    const promise = new Promise(r => promCb = r);
    self.stdin.setRawMode(true);
    self.stdin.resume();
    let func;
    let resolved = false;
    self.stdin.on("data", func = buffer => {
        let text = buffer.toString();
        if (text === "\u0003") return options.onTermination();
        else if (text === "\u0008") {
            result = result.substring(0, cursor) + result.substring(cursor + 1);
            cursor--;
            if (cursor < -1) cursor = -1;
            options.onBackspace();
            return;
        } else if (text[0] === "\u001b") {
            const type = {A: "up", B: "down", C: "right", D: "left"}[text[2]];
            options.onArrow(type, text);
            return;
        } else if (text === "\n" || text === "\r" || text === "\u0004") {
            self.stdin.setRawMode(false);
            self.stdin.pause();
            options.onEnd();
            self.stdin.off("data", func);
            promCb(result);
            resolved = true;
            return;
        } else {
            result = result.substring(0, cursor + 1) + text + result.substring(cursor + 1);
            cursor++;
        }
        options.onKey(text);
    });
    const th = {
        promise,
        end: () => resolved || self.stdin.emit("data", "\n")
    };
    if (options.timeout && options.timeout > 0) setTimeout(() => th.end(), options.timeout);
    return th;
};

prototype.readPassword = async function (self, options) {
    if (typeof options !== "object" || Array.isArray(options)) options = {};
    Printer.setDefault(options, {expectPromise: true});
    const th = self.readCustom({
        onKey: text => self.stdout.write(options.character || "*"),
        ...options
    });
    if (options.expectPromise) return await th.promise;
    return th;
};

prototype.readSelection = async function (self, list = [], options) {
    if (typeof options !== "object" || Array.isArray(options)) options = {};
    if (list.length === 0) return "";
    Printer.setDefault(options, {expectPromise: true});
    let selected = 0;
    self.print(list[selected]);
    const th = self.readCustom({
        onKey: r => r,
        onBackspace: r => r,
        onArrow: arrow => {
            let old = selected;
            if (arrow === "up" || arrow === "left") {
                selected--;
                if (selected < 0) selected = list.length - 1;
            } else if (arrow === "down" || arrow === "right") {
                selected++;
                if (selected > list.length - 1) selected = 0;
            } else return;
            self.backspace(list[old].length);
            self.print(list[selected]);
        }, ...options
    });
    th.rawPromise = th.promise;
    th.promise = new Promise(async r => {
        await th.rawPromise;
        r(selected);
    });
    if (options.expectPromise) return await th.promise;
    return th;
};

prototype.readSelectionListed = async function (self, list = [], options) {
    if (typeof options !== "object" || Array.isArray(options)) options = {};
    Printer.setDefault(options, {
        selectedColor: "black",
        selectedBackgroundColor: "white",
        selectedPadding: 0,
        selectedBold: true,
        selectedItalic: false,
        selectedUnderline: false,
        selectedStrikethrough: false,
        normalColor: "",
        normalBackgroundColor: "",
        normalPadding: 0,
        normalBold: false,
        normalItalic: false,
        normalUnderline: false,
        normalStrikethrough: false,
        expectPromise: true
    });
    if (list.length === 0) return "";
    let selected = 0;
    let typed = "";
    const update = () => {
        self.backspace(typed.length);
        typed = "";
        let ty = "";
        for (let i = 0; i < list.length; i++) {
            typed += list[i];
            if (selected === i) ty += Printer.paint(list[i], componentHelper("selected", options));
            else ty += list[i];
            if (i !== list.length - 1) {
                typed += " ";
                ty += " ";
            }
        }
        self.print(ty);
    };
    update();
    const th = self.readCustom({
        onKey: r => r,
        onBackspace: r => r,
        onArrow: arrow => {
            let old = selected;
            if (arrow === "up" || arrow === "left") {
                selected--;
                if (selected < 0) selected = list.length - 1;
            } else if (arrow === "down" || arrow === "right") {
                selected++;
                if (selected > list.length - 1) selected = 0;
            } else return;
            update();
        }, ...options
    });
    th.rawPromise = th.promise;
    th.promise = new Promise(async r => {
        await th.rawPromise;
        r(selected);
    });
    if (options.expectPromise) return await th.promise;
    return th;
}; // TODO: reading instances where you can stop it? or make it write things?

prototype.parseCSS = function (self, text) {
    return Printer.parseCSS(text);
};

prototype.cleanCSS = function (self, opts) {
    return Printer.cleanCSS(opts);
};

prototype.applyCSS = function (self, styles) {
    return Printer.applyCSS(styles);
};

prototype.css = function (self, text) {
    return Printer.css(text);
};

prototype.setOptions = function (self, options) {
    if (typeof options !== "object" || Array.isArray(options)) options = {};
    self.options = {...self.options, ...options};
    return self;
};

Printer.DEFAULT_OPTIONS = DEFAULT_OPTIONS;

Printer.paint = (text, options) => {
    if (typeof options !== "object" || Array.isArray(options)) options = {};
    Printer.setDefault(options, {
        color: "",
        backgroundColor: "",
        bold: false,
        italic: false,
        underline: false,
        strikethrough: false,
        padding: 0,
        ending: true
    });
    if (options.padding > 0) text = " ".repeat(options.padding) + text + " ".repeat(options.padding);
    text = Printer.color(text, options.color);
    text = Printer.background(text, options.backgroundColor);
    if (options.bold) text = Color.bold(text);
    if (options.italic) text = Color.italic(text);
    if (options.underline) text = Color.underline(text);
    if (options.strikethrough) text = Color.strikethrough(text);
    if (!options.ending) text = text.replace("\x1B[39m", "").replace("\x1B[49m", "")
        .replace("\x1B[22m", "").replace("\x1B[23m", "")
        .replace("\x1B[24m", "").replace("\x1B[29m", "").replace(" ", "")
    return text;
};

Printer.stringify = any => {
    const type = typeof any;
    if (any === null) return "null";
    if (type === "string") return any;
    if (type === "undefined") return "undefined";
    if (type === "boolean") return any ? "true" : "false";
    if (type === "object" || type === "symbol" || type === "function") return util.inspect(any);
    return any.toString();
};

Printer.color = (text, color) => {
    if (["default", "bgDefault", "none", "bgNone", "transparent", "bgTransparent", ""].includes(color)) return text;
    const isBg = color[0] === "b" && color[1] === "g";
    let rest = isBg ? color.substring(2) : color;
    rest = {
        scarlet: "redBright",
        crimson: "redBright",
        vermilion: "redBright",
        lime: "greenBright",
        lemon: "yellowBright",
        canary: "yellowBright",
        electric: "blueBright",
        pink: "magentaBright",
        aqua: "cyanBright"
    }[rest] || rest;
    const sup = Color.supportsColor.has256;
    if (rest.startsWith("rgb(")) {
        if (!sup) return text;
        const clr = rest.substring(4, rest.length - 1).split(/[, ]/).filter(i => i).map(i => i * 1);
        return Color[isBg ? "bgRgb" : "rgb"](...clr)(text);
    }
    if (rest.startsWith("hsl(")) {
        if (!sup) return text;
        const clr = rest.substring(4, rest.length - 1).split(/[, ]/).filter(i => i).map(i => i * 1);
        return Color[isBg ? "bgHsl" : "hsl"](...clr)(text);
    }
    if (rest.startsWith("hsv(")) {
        if (!sup) return text;
        const clr = rest.substring(4, rest.length - 1).split(/[, ]/).filter(i => i).map(i => i * 1);
        return Color[isBg ? "bgHsv" : "hsv"](...clr)(text);
    }
    if (rest[0] === "#") {
        if (!sup) return text;
        return Color[isBg ? "bgHex" : "hex"](rest.substring(1))(text);
    }
    if (ansiKeys[color] && !Color.supportsColor.hasBasic) return text;
    if (!ansiKeys[color] && !Color.supportsColor.has256) return text;
    return (Color[color] || (r => r))(text);
};
Printer.background = (text, color) => Printer.color(text, "bg" + (color[0] || "").toUpperCase() + (color || "").substring(1));

Printer.setDefault = (got, def) => Object.keys(def).forEach(i => {
    if (got[i] === undefined) got[i] = def[i]; else if (typeof def[i] === "object") Printer.setDefault(got[i], def[i]);
});

Printer.makeGlobal = (_console = false) => {
    if (_console) global.console = Printer.static;
    global.Printer = Printer;
    // noinspection JSValidateTypes
    global.printer = Printer.static;
};

Printer.new = options => new Printer(options);
Printer.create = options => new Printer(options);

Printer.substitute = (substitutions, chr, ...texts) => {
    let ret = "";
    let colored = false;
    const NoSub = {};
    const ColorSub = {value: ""};
    for (let i = 0; i < texts.length; i++) {
        const item = texts[i];
        if (typeof item !== "string") {
            ret += Printer.stringify(item) + (i === texts.length - 1 ? "" : " ");
            continue;
        }
        if (item.length === 0) {
            if (i !== 0 && texts[i - 1].length) ret = ret.substring(0, ret.length - 1);
            continue;
        }
        let fl = false;
        for (let j = 0; j < item.length; j++) {
            const c = item[j];
            if (fl) {
                fl = false;
                if (c === chr) {
                    ret += chr;
                    continue;
                }
                const su = substitutions[c];
                if (!su) {
                    ret += chr + c;
                    continue;
                }
                i++;
                const u = su(texts[i], {Cancel: NoSub, Color: ColorSub});
                if (u === NoSub) {
                    ret += chr + c;
                    i--;
                    continue;
                }
                if (u === ColorSub) {
                    colored = true;
                    ret += u.value;
                    continue;
                }
                ret += u;
            } else {
                if (c === chr && i !== texts.length - 1) {
                    fl = true;
                    continue;
                }
                ret += c;
            }
        }
        if (i !== texts.length - 1) ret += " ";
    }
    if (colored) ret += ClearAll;
    return ret;
};

Printer.parseCSS = text => {
    const styles = {};
    text.split(";").forEach(i => styles[i.split(":")[0].trim()] = i.split(":").slice(1).join(":").trim());
    return styles;
};

Printer.cleanCSS = opts => {
    if (typeof opts !== "object" || Array.isArray(opts)) opts = {};
    const styles = {
        font: {
            color: "",
            style: {
                italic: false
            },
            weight: 100
        },
        background: {
            color: ""
        },
        textDecoration: {
            //color: "",
            line: {
                under: false,
                //over: false,
                through: false
            }
        },
        padding: 0,
        //margin: 0,
    };
    styles.font.color = opts["color"] || opts["font-color"] || opts["fontColor"] || "";
    styles.background.color = opts["background"] || opts["background-color"] || opts["backgroundColor"] || "";
    styles.font.weight = opts["font-weight"] || opts["fontWeight"];
    if (styles.font.weight === "bold" || styles.font.weight === "bolder") styles.font.weight = 600;
    else if (typeof styles.font.weight !== "number") styles.font.weight = 100;
    const fontStyle = opts["font-style"] || opts["fontStyle"] || "";
    styles.font.style.italic = fontStyle.includes("italic") || fontStyle.includes("oblique");
    const textDecoration = opts["text-decoration"] || opts["textDecoration"] || "";
    styles.textDecoration.line.under =
        textDecoration.includes("underline") ||
        textDecoration.includes("under");
    styles.textDecoration.line.through =
        textDecoration.includes("strikethrough") ||
        textDecoration.includes("strike-through") ||
        textDecoration.includes("linethrough") ||
        textDecoration.includes("line-through");
    styles.padding = opts["padding"];
    if (typeof styles.padding !== "number" || styles.padding < 0) styles.padding = 0;
    return styles;
};

Printer.applyCSS = styles => {
    return ClearAll + Printer.paint(" ", {
        color: styles.font.color,
        backgroundColor: styles.background.color,
        bold: styles.font.weight >= 600,
        italic: styles.font.style.italic,
        underline: styles.textDecoration.line.under,
        strikethrough: styles.textDecoration.line.through,
        padding: styles.padding,
        ending: false
    });
};

Printer.css = text => Printer.applyCSS(Printer.cleanCSS(Printer.parseCSS(text)));

prototype.inline = Printer.inline = new Printer({newLine: false});
prototype.raw = Printer.raw = new Printer({format: "%text"});
prototype.static = Printer.static = prototype.default = Printer.default = new Printer();
const brackets = prototype.brackets = Printer.brackets = new Printer({
    tagBold: true,
    tagPadding: 0,
    tagColor: "default",
    dateBackgroundColor: "",
    timeBackgroundColor: "",
    datePadding: 0,
    timePadding: 0,
    namespaceColor: "",
    namespaceBackgroundColor: "",
    format: opts => Printer.css("color: " + brackets.getTag(opts.tag || "log").color) + (opts.namespace ? "[%namespace\b \b] | " : "") + "[%date] | [%time] [%tag] > %text" + ClearAll
});
brackets.tags = {
    pass: {text: "PASS", textColor: "green", color: "green"},
    fail: {text: "FAIL", textColor: "redBright", color: "redBright"},
    error: {text: "ERR!", textColor: "red", color: "red"},
    warn: {text: "WARN", textColor: "yellow", color: "yellow"},
    info: {text: "INFO", textColor: "blue", color: "blue"},
    debug: {text: "DEBUG", textColor: "gray", color: "gray"},
    notice: {text: "NOTICE", textColor: "cyan", color: "cyan"},
    log: {text: "LOG", textColor: "white", color: "white"},
    assert: {text: "ASSERT", color: "gray", textColor: "gray"},
    ready: {text: "READY", color: "magenta", textColor: "magenta"}
};

const list = ["inline", "raw", "static", "default", "brackets"];
list.forEach(i => list.forEach(j => prototype[i][j] = prototype[j]));

if (isWeb) {
    window.printer = prototype.static;
    window.Printer = Printer;
} else module.exports = prototype.static;

// FUTURE CSS:
// [ ] background and its longhand equivalents
// [ ] border and its longhand equivalents
// [ ] outline and its longhand equivalents
// [ ] text-* properties such as text-transform
// [ ] font and its longhand equivalents
// [ ] box-decoration-break
// [ ] writing-mode
// [ ] clear and float
// [ ] box-shadow
// [ ] line-height
// [ ] word-spacing and word-break
// [ ] white-space
// [ ] margin
// [ ] display
// [ ] cursor
// [ ] border-radius