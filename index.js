// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols

// noinspection JSDeprecatedSymbols
const isReactNative = typeof navigator !== "undefined" && navigator.product === "ReactNative";
const isReactNativeDev = isReactNative && __DEV__;
const isWeb = typeof require === "undefined" || isReactNative;
const req = r => isWeb ? null : (global["require"] || require)(r);

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
        const num = Number.parseInt(a, 16);
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
    supportsColor: {hasBasic: true, has256: true, has16m: true},
    rgb: (r, g, b) => (t => `\x1B[38;2;${r};${g};${b}m${t}${isWeb ? "\x1B[39m" : "\x1B[39m"}`),
    hex: a => Color.rgb(...conv.hex(a)),
    hsl: (a, b, c) => Color.rgb(...conv.hsl(a, b, c)),
    hsv: (a, b, c) => Color.rgb(...conv.hsv(a, b, c)),
    bgRgb: (r, g, b) => (t => `\x1B[48;2;${r};${g};${b}m${t}${isWeb ? "\x1B[39m" : "\x1B[49m"}`),
    bgHex: a => Color.bgRgb(...conv.hex(a)),
    bgHsl: (a, b, c) => Color.bgRgb(...conv.hsl(a, b, c)),
    bgHsv: (a, b, c) => Color.bgRgb(...conv.hsv(a, b, c))
};
if (isWeb) {
    const ver = Number.parseInt((/(Chrome|Chromium)\/(?<chromeVersion>\d+)\./.exec(navigator.userAgent) || {groups: {chromeVersion: -1}}).groups.chromeVersion, 10);
    if (ver < 69) Color.supportsColor = {
        hasBasic: false,
        has256: false,
        has16m: false
    };
} else Color.supportsColor = req("./vendor/supports-color/index.js").stdout;
Object.keys(knownColors).forEach(k => {
    Color[k] = Color.rgb(...knownColors[k]);
    Color["bg" + k[0].toUpperCase() + k.substring(1)] = Color.bgRgb(...knownColors[k]);
});
const ansiKeys = Object.keys(ansiStyles);
ansiKeys.forEach((k, i) => {
    const l = ansiStyles[k];
    Color[k] = r => r ? (isWeb ? `\x1B[99;${i}m${r}\x1B[39m` : `\x1B[${l[0]}m${r}\x1B[${l[1]}m`) : "";
});

const fs = req("fs");
const path = req("path");
const _util = {
    inspect: (...a) => {
        if (isWeb) return JSON.stringify(a[0]); // todo
        return req("util").inspect(...a);
    }
};

const fnCheck = (s, ...args) => typeof s === "function" ? s(...args) : s;
const ClearAll = isWeb ? Color.reset("$").replace("$", "") : "\x1B[39m\x1B[49m\x1B[22m\x1B[23m\x1B[24m\x1B[29m";
const cH = (opts, name, c) => fnCheck(opts[name ? name + c : c.toLowerCase()], opts);
const componentHelper = (name, opts) => ({
    color: cH(opts, name, "Color"),
    backgroundColor: cH(opts, name, "BackgroundColor"),
    padding: cH(opts, name, "Padding"),
    bold: cH(opts, name, "Bold"),
    italic: cH(opts, name, "Italic"),
    underline: cH(opts, name, "Underline"),
    strikethrough: cH(opts, name, "Strikethrough"),
    alwaysRGB: opts.alwaysRGB,
    paletteName: opts.paletteName
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
    const stack = [...err.stack];
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

const COLOR_PALETTES = {
    JetBrains: {
        black: [0, 0, 0],
        red: [119, 46, 44],
        green: [57, 81, 31],
        yellow: [92, 79, 23],
        blue: [36, 89, 128],
        magenta: [92, 64, 105],
        cyan: [21, 79, 79],
        white: [97, 97, 97],
        blackBright: [66, 66, 66],
        redBright: [184, 36, 33],
        greenBright: [69, 133, 0],
        yellowBright: [168, 123, 0],
        blueBright: [23, 120, 189],
        magentaBright: [178, 71, 178],
        cyanBright: [0, 110, 110],
        whiteBright: [255, 255, 255]
    }
};
COLOR_PALETTES.default = COLOR_PALETTES.JetBrains;
const makeWebPalette = palette => {
    const obj = {};
    Object.keys(palette).forEach(l => {
        const v = "rgb(" + palette[l].join(",") + ")";
        obj[l] = ["color: " + v, v];
        obj["bg" + l[0].toUpperCase() + l.substring(1)] = ["background-color: " + v, null, v];
    });
    return obj;
};
const WEB_PALETTES = {};
Object.keys(COLOR_PALETTES).forEach(k => WEB_PALETTES[k] = makeWebPalette(COLOR_PALETTES[k]));

const DEFAULT_OPTIONS = {
    format: "%namespace%date %time %tag %text",
    substitutionsEnabled: true,
    styleSubstitutionsEnabled: false,
    componentsEnabled: true,
    newLine: true,
    namespace: "",
    stylingEnabled: true,
    stdout: null,
    stdin: null,
    htmlOut: null,
    alwaysRGB: false,
    paletteName: "default",
    disabledTags: [],

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

    uptimeColor: "",
    uptimeBackgroundColor: "cyan",
    uptimeBold: true,
    uptimeItalic: false,
    uptimeUnderline: false,
    uptimeStrikethrough: false,
    uptimePadding: 1,
    uptimeDate: false,
    uptimeHour: true,
    uptimeMinute: true,
    uptimeSecond: true,
    uptimeMillisecond: true,
    uptimeMillisecondLength: 2,

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
const webParser = (s, colors, current, palette) => {
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
                ...WEB_PALETTES[palette]
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

class Printer {
    streams = new Map;
    chr = "%";
    styleChr = "&";
    styles = {};
    components = {};
    substitutions = {};
    _times = {};
    _counts = {};
    _group = 0;

    constructor(options = {}) {
        options = Printer.setDefault(options, Printer.DEFAULT_OPTIONS);
        this.options = options;
        this.Printer = Printer;
        this._periodicOptions = null;
        this.stdin = options.stdin || (isWeb ? null : (process.stdin || process.openStdin()));
        this.stdout = options.stdout || (isWeb ? Printer.DEFAULT_OUTPUTS.web(this) : Printer.DEFAULT_OUTPUTS.terminal(this));
        this.tags = {
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
        this._namespace = options.namespace || "";

        /// COMPONENTS ///

        this.addComponent("date", opts => {
            const date = new Date;
            const rs = date.toLocaleString("en", opts.dateOptions);
            return {result: Printer.paint(rs, componentHelper("date", opts)), plain: rs};
        });
        this.addComponent("tag", opts => {
            const tag = this.tags[opts.tag || ""] || this.tags[(opts.tag || "").toLowerCase()] || this.tags.log;
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
        this.addComponent("time", opts => {
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
        this.addComponent("uptime", opts => {
            let l = [];
            let t = performance.now();
            let d = k => {
                const d = Math.floor(t / k);
                l.push(d.toString().padStart(k === 1 ? 3 : 2, "0").substring(0, k === 1 ? opts.uptimeMillisecondLength : 3));
                t -= d * k;
            };
            if (opts.uptimeDate) d(1000 * 60 * 60 * 24);
            if (opts.uptimeHour) d(1000 * 60 * 60);
            if (opts.uptimeMinute) d(1000 * 60);
            if (opts.uptimeSecond) d(1000);
            if (opts.uptimeMillisecond) d(1);
            const text = l.join(":");
            return {
                result: Printer.paint(text, componentHelper("uptime", opts)), plain: text
            };
        });
        this.addComponent("namespace", opts => {
            if (!opts.namespace) return {result: "", plain: ""};
            return {
                result: Printer.paint(opts.namespace, componentHelper("namespace", opts)) + " ",
                plain: opts.namespace
            };
        });
        this.addComponent("filename", opts => {
            let file = (__stack().find(i => i.fileName && i.fileName !== __filename) || {}).fileName;
            if (opts.filenameBase) file = path.basename(file || "");
            return {
                result: Printer.paint(file, componentHelper("filename", opts)),
                plain: file
            };
        });
        this.addComponent("line", opts => {
            const line = (__stack().find(i => i.fileName && i.fileName !== __filename) || {}).lineNumber;
            return {
                result: Printer.paint(line, componentHelper("line", opts)),
                plain: line
            };
        });
        this.addComponent("column", opts => {
            const column = (__stack().find(i => i.fileName && i.fileName !== __filename) || {}).columnNumber;
            return {
                result: Printer.paint(column, componentHelper("column", opts)),
                plain: column
            };
        });
        this.addComponent("stack", opts => {
            const f = __stack().find(i => i.fileName && i.fileName !== __filename) || {};
            const t = (opts.stackBase ? path.basename(f.fileName || "") : f.fileName) + ":" + f.lineNumber + ":" + f.columnNumber;
            return {
                result: Printer.paint(t, componentHelper("stack", opts)),
                plain: t
            };
        });

        /// SUBSTITUTIONS ///

        this.addSubstitution("v", s => Printer.stringify(s));
        const objectSub = (s, {Cancel}) => {
            const type = typeof s;
            if (type !== "object" && type !== "function") return Cancel;
            return Printer.stringify(s);
        };
        this.addSubstitution("o", objectSub);
        this.addSubstitution("O", objectSub);
        this.addSubstitution("s", (s, {Cancel}) => {
            if (typeof s !== "string") return Cancel;
            return s;
        });
        this.addSubstitution("j", (s, {Cancel}) => {
            if (s === null || typeof s !== "object" || s.constructor !== Object) return Cancel;
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
        this.addSubstitution("i", integerSub);
        this.addSubstitution("d", integerSub);
        this.addSubstitution("f", (s, Cancel) => {
            if (typeof s !== "number") return Cancel;
            return s.toString();
        });
        this.addSubstitution("c", (s, {Cancel, Color}) => {
            if (typeof s !== "string") return Cancel;
            Color.value = this.css(s);
            return Color;
        });

        /// STYLE SUBSTITUTIONS ///

        this.addStyle("0", "color: #000000");
        this.addStyle("1", "color: #0000AA");
        this.addStyle("2", "color: #00AA00");
        this.addStyle("3", "color: #00AAAA");
        this.addStyle("4", "color: #AA0000");
        this.addStyle("5", "color: #AA00AA");
        this.addStyle("6", "color: #FFAA00");
        this.addStyle("7", "color: #AAAAAA");
        this.addStyle("8", "color: #555555");
        this.addStyle("9", "color: #5555FF");
        this.addStyle("a", "color: #55FF55");
        this.addStyle("b", "color: #55FFFF");
        this.addStyle("c", "color: #FF5555");
        this.addStyle("d", "color: #FF55FF");
        this.addStyle("e", "color: #FFFF55");
        this.addStyle("f", "color: #FFFFFF");
        this.addStyle("l", "font-weight: bold");
        this.addStyle("m", "text-decoration: strike-through");
        this.addStyle("n", "text-decoration: underline");
        this.addStyle("o", "font-style: italic");
        this.addStyle("r", "");
    };

    addFile(file) {
        if (isWeb) throw new Error("addFile() method cannot be used on web.");
        this.streams.set(file, fs.createWriteStream(file, {flags: "a"}));
        return this
    };

    removeFile(file) {
        this.streams.delete(file);
        return this
    };

    makeLoggerFile(options) {
        if (isWeb) throw new Error("makeLoggerFile() method cannot be used on web.");
        options = Printer.setDefault(options, {
            folder: "./logs", format: "log-" + this.chr + "DD-" + this.chr + "MM-" + this.chr + "YYYY.log",
            month: "long", day: "long"
        });
        this._periodicOptions = options;
        if (this.streams.get("!periodic")) return;
        let sl;
        this.streams.set("!periodic", sl = {
            write: content => {
                const options = this._periodicOptions;
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
                const formatted = list.reduce((a, b) => a.replaceAll(new RegExp("\\" + this.chr + b[0] + (b[2] ? "" : "+"), "g"), str => {
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
        return this
    };

    makeHashedLoggerFile(options) {
        if (isWeb) throw new Error("makeHashedLoggerFile() method cannot be used on web.");
        options = Printer.setDefault(options, {
            folder: "./logs", radix: 16, divide: 3, format: "log-" + this.chr + "t.log"
        });
        if (!fs.existsSync(options.folder)) fs.mkdirSync(options.folder);
        const file = path.join(options.folder, fnCheck(options.format, options).replaceAll(this.chr + "t", Math.floor(Date.now() / (10 ** options.divide)).toString(options.radix)));
        this.addFile(file);
        return this
    };

    makeGlobal(_con = false) {
        const gl = isWeb ? window : global;
        if (_con) gl.console = this;
        gl.Printer = this;
        gl.printer = this;
        return this
    };

    new(options) {
        return new Printer(options);
    };

    create(options) {
        return new Printer(options);
    };

    namespace(namespace) {
        return this.create({...this.options, namespace});
    };

    addComponent(name, callback) {
        this.components[name] = callback;
        return this
    };

    removeComponent(name) {
        delete this.components[name];
        return this
    };

    getComponents() {
        return this.components;
    };

    getComponent(name) {
        return this.components[name];
    };

    addSubstitution(character, run) {
        this.substitutions[character] = run;
        return this
    };

    removeSubstitution(character) {
        delete this.substitutions[character];
        return this
    };

    getSubstitution(character) {
        return this.substitutions[character];
    };

    getSubstitutions() {
        return this.substitutions;
    };

    addStyle(name, style) {
        if (typeof style === "function") style = style();
        this.styles[name] = this.css(style, style.trim() === "");
        return this
    };

    removeStyle(name) {
        delete this.styles[name];
        return this
    };

    getStyle(name) {
        return this.styles[name];
    };

    getStyles() {
        return this.styles;
    };

    addTag(key, text, color, backgroundColor, textColor = "", textBackgroundColor = "") {
        this.tags[key] = {text, color, backgroundColor, textColor, textBackgroundColor};
        return this
    };

    removeTag(key) {
        delete this.tags[key];
        return this
    };


    getTags() {
        return this.tags;
    };


    getTag(key) {
        return this.tags[key];
    };


    setFormat(format) {
        this.options.format = format;
        return this
    };


    getFormat() {
        return this.options.format;
    };

    setCharacter(character) {
        this.chr = character;
        return this
    };


    getCharacter() {
        return this.chr;
    };


    setStyleCharacter(character) {
        this.styleChr = character;
        return this
    };


    getStyleCharacter() {
        return this.styleChr;
    };

    println(text) {
        if (!this.stdout) return this
        this.stdout.write(Printer.stringify(text) + "\n");
        return this
    };


    printLine(text) {
        return this.println(text);
    };


    print(text) {
        if (!this.stdout) return this
        this.stdout.write(Printer.stringify(text));
        return this
    };


    backspace(amount = 1) {
        if (!this.stdout) return this
        this.stdout.write("\b \b".repeat(amount));
        return this
    };


    substitute(...texts) {
        return Printer.substitute(this.substitutions, this.chr, ...texts);
    };

    substituteStyles(text) {
        return Printer.substituteStyles(this.styleChr, this.styles, text);
    };

    log(...texts) {
        const options = this.options;
        let text = "";
        if (this.options.substitutionsEnabled) {
            text = this.substitute(...texts);
        } else for (let i = 0; i < texts.length; i++) {
            let t = Printer.stringify(texts[i]);
            text += t;
            if (i !== texts.length - 1) text += " ";
        }
        if (this.options.styleSubstitutionsEnabled) text = this.substituteStyles(text);
        text += ClearAll;
        const lines = Printer.stringify(text).split("\n");
        let comp = {};
        let formatted = options.format;
        let colored = formatted;
        let plain = formatted;
        if (options.componentsEnabled && Object.keys(this.components).length > 0) {
            const reg = `\\${this.chr}[a-zA-Z]+`;
            const spl = fnCheck(options.format, options).split(new RegExp("(" + reg + ")", "g"));
            formatted = spl.filter(i => i).map(i => {
                if (!new RegExp("^" + reg + "$").test(i.toString())) return i;
                i = i.substring(1);
                if (!this.components[i]) return this.chr + i;
                i = comp[i] || this.components[i](options);
                if (typeof i === "string" || typeof i === "number") return i.toString();
                if (typeof i !== "object") throw new Error("Expected the component to throw string, number or an object, got: " + typeof i);
                return i;
            });
            colored = formatted.map(i => typeof i === "string" ? i : i.result).join("");
            plain = formatted.map(i => typeof i === "string" ? i : i.plain).join("");
        }
        lines.forEach(line => {
            const l = line;
            line = Printer.color(line, options.defaultColor, options.alwaysRGB, options.paletteName);
            line = Printer.color(line, options.defaultBackgroundColor, options.alwaysRGB, options.paletteName);
            const plainText = " ".repeat(this._group) + plain.replaceAll(this.chr + "text", l).replaceAll(/\x1B\[\d+m/g, "") + (options.newLine ? "\n" : "");
            if (options.stylingEnabled) this[options.newLine ? "println" : "print"](Printer.paint(" ".repeat(this._group), componentHelper("group", options)) + colored.replaceAll(this.chr + "text", line));
            else this[options.newLine ? "println" : "print"](plainText);
            this.streams.forEach(stream => stream.write(plainText));
        });
        return this
    };


    tag(tag, ...texts) {
        if (this.options.disabledTags.includes(tag)) return this;
        const {tag: old} = this.options;
        const {defaultColor, defaultBackgroundColor} = this.options;
        // noinspection JSConstantReassignment
        this.options.tag = tag;
        this.log(...texts);
        // noinspection JSConstantReassignment
        this.options.tag = old;
        this.options.defaultColor = defaultColor;
        this.options.defaultBackgroundColor = defaultBackgroundColor;
        return this
    };


    pass(...texts) {
        return this.tag("pass", ...texts);
    };


    fail(...texts) {
        return this.tag("fail", ...texts);
    };


    error(...texts) {
        return this.tag("error", ...texts);
    };


    err(...texts) {
        return this.error(...texts);
    };


    warning(...texts) {
        return this.warn(...texts);
    };


    warn(...texts) {
        return this.tag("warn", ...texts);
    };


    inform(...texts) {
        return this.tag("info", ...texts);
    };


    info(...texts) {
        return this.inform(...texts);
    };


    debug(...texts) {
        return this.tag("debug", ...texts);
    };


    notice(...texts) {
        return this.tag("notice", ...texts);
    };


    ready(...texts) {
        return this.tag("ready", ...texts);
    };


    clear() {
        if (this.stdout && this.stdout.isTTY) this.stdout.write("\x1B[2J\x1B[3J\x1B[H");
    };


    tableRaw(object, columns = null) {
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
        const ins = (s, color = true) => _util.inspect(s, false, null, color);
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


    table(object, columns = null, tagName = "log") {
        if (isWeb) return console.table(object, columns); // THIS PART IS ONLY RAN IF IT'S ON WEB!
        const result = this.tableRaw(object, columns);
        if (result) result.forEach(i => tagName ? this.tag(tagName, i) : this.println(i));
        else tagName ? this.tag(tagName, object) : this.println(object);
        return this
    };


    time(name = "default") {
        this._times[name] = performance.now();
        return this
    };


    timeGet(name = "default") {
        return performance.now() - (this._times[name] || performance.now());
    };


    timeLog(name = "default", fixed = 3) {
        this.log(name + ": " + this.timeGet(name).toFixed(fixed) + "ms");
        return this
    };


    timeEnd(name = "default", fixed = 3) {
        delete this._times[name];
        this.timeLog(name, fixed);
        return this
    };


    count(name = "default") {
        this.log(name + ": " + (this._counts[name] = (this._counts[name] || 0) + 1));
        return this._counts[name];
    };


    countGet(name = "default") {
        return this._counts[name];
    };


    countReset(name = "default") {
        this._counts[name] = 0;
        return this
    };


    group() {
        this._group++;
        return this
    };


    groupEnd() {
        this._group--;
        if (this._group < 0) this._group = 0;
        return this
    };


    groupGet() {
        return this._group;
    };


    assert(assertion, ...texts) {
        if (assertion) return this
        this.tag("assert", ...texts);
        return this
    };


    updateOptions(opts) {
        opts = Printer.setDefault(opts, Printer.DEFAULT_OPTIONS);
        this.options = {...this.options, ...opts};
        return this
    };


    async readStdinData() {
        return await new Promise(r => this.stdin.once("data", r));
    };

    cursorUp(amount = 1) {
        if (amount < 0) return this.cursorDown(-amount);
        return this.print("\x1b[" + amount + "A");
    };

    cursorDown(amount = 1) {
        if (amount < 0) return this.cursorUp(-amount);
        return this.print("\x1b[" + amount + "B");
    };

    cursorRight(amount = 1) {
        if (amount < 0) return this.cursorLeft(-amount);
        return this.print("\x1b[" + amount + "C");
    };

    cursorLeft(amount = 1) {
        if (amount < 0) return this.cursorRight(-amount);
        return this.print("\x1b[" + amount + "D");
    };

    async readLine(stringify = true, trim = true) {
        if (!this.stdin) return "";
        this.stdin.resume();
        let res = await this.readStdinData();
        if (stringify) res = res.toString();
        if (trim) res = res.trim();
        this.stdin.pause();
        return res;
    };


    async readKey(stringify = false, trim = false) {
        if (!this.stdin) return "";
        this.stdin.setRawMode(true);
        const res = await this.readLine(false, trim);
        if (isWeb && res[0] === 3) process.exit();
        this.stdin.setRawMode(false);
        return res.toString();
    };


    readCustom(options) {
        if (!this.stdin) return {
            promise: new Promise(r => r("")),
            end: () => true
        };
        options = Printer.setDefault(options, {
            onKey: text => this.print(text),
            onBackspace: () => this.backspace(),
            onArrow: () => true,
            onEnd: () => this.print("\n"),
            onTermination: () => !isWeb && process.exit(),
            timeout: -1
        });
        let cursor = -1;
        let result = "";
        let promCb;
        const promise = new Promise(r => promCb = r);
        this.stdin.setRawMode(true);
        this.stdin.resume();
        let func;
        let resolved = false;
        this.stdin.on("data", func = buffer => {
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
                this.stdin.setRawMode(false);
                this.stdin.pause();
                options.onEnd();
                this.stdin.off("data", func);
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
            end: () => resolved || this.stdin.emit("data", "\n")
        };
        if (options.timeout && options.timeout > 0) setTimeout(() => th.end(), options.timeout);
        return th;
    };


    async readPassword(options) {
        options = Printer.setDefault(options, {expectPromise: true});
        const th = this.readCustom({
            onKey: text => this.stdout.write(options.character || "*"),
            ...options
        });
        if (options.expectPromise) return await th.promise;
        return th;
    };


    async readSelection(list = [], options) {
        if (list.length === 0) return "";
        options = Printer.setDefault(options, {expectPromise: true});
        let selected = 0;
        this.print(list[selected]);
        const th = this.readCustom({
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
                this.backspace(list[old].length);
                this.print(list[selected]);
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


    async readSelectionListed(list = [], options) {
        options = Printer.setDefault(options, {
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
            this.backspace(typed.length);
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
            this.print(ty);
        };
        update();
        const th = this.readCustom({
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
    };


    parseCSS(text) {
        return Printer.parseCSS(text, this.options.alwaysRGB, this.options.paletteName);
    };


    cleanCSS(opts) {
        return Printer.cleanCSS(opts, this.options.alwaysRGB, this.options.paletteName);
    };


    applyCSS(styles) {
        return Printer.applyCSS(styles, this.options.alwaysRGB, this.options.paletteName);
    };


    css(text, clear = true) {
        return Printer.css(text, this.options.alwaysRGB, this.options.paletteName, clear);
    };


    setOptions(options) {
        options = Printer.setDefault(options, null);
        this.options = {...this.options, ...options};
        return this
    };


    updateBodyStyle = (element = document.body) => {
        if (!isWeb) throw new Error("updateBodyStyle() method cannot be used outside web.");
        element.style.background = "#1e1f22";
        element.style.color = "#bcbec4";
        element.style.fontFamily = "monospace,serif";
        return this;
    };

    title(title = "") {
        if (isWeb) {
            if (isReactNative) return this;
            document.title = title;
            return this;
        }
        if (!this.stdout) return this;
        this.stdout.write(`\x1b]0;${title}\x07`);
        return this;
    };

    /*async getTitle() {
        if (isWeb) {
            if (isReactNative) return "";
            return document.title;
        }
        if (!this.stdout || !this.stdin) return "";
        this.stdout.write("\x1b[21t");
        this.stdin.resume();
        this.stdin.setRawMode(true);
        return await new Promise(r => this.stdin.once("data", data => {
            const match = /\x1b\[.*t/.exec(data.toString());
            if (match) r(match[1]);
            else r("");
            this.stdin.setRawMode(false);
            this.stdin.pause();
        }));
    };*/

    static DEFAULT_OPTIONS = DEFAULT_OPTIONS;
    static DEFAULT_COLOR_PALETTES = COLOR_PALETTES;
    static DEFAULT_WEB_PALETTES = WEB_PALETTES;
    static paint = (text, options) => {
        options = Printer.setDefault(options, {
            color: "",
            backgroundColor: "",
            bold: false,
            italic: false,
            underline: false,
            strikethrough: false,
            padding: 0,
            ending: true,
            alwaysRGB: false,
            paletteName: "default"
        });
        if (options.padding > 0) text = " ".repeat(options.padding) + text + " ".repeat(options.padding);
        text = Printer.color(text, options.color, options.alwaysRGB, options.paletteName);
        text = Printer.background(text, options.backgroundColor, options.alwaysRGB, options.paletteName);
        if (options.bold) text = Color.bold(text);
        if (options.italic) text = Color.italic(text);
        if (options.underline) text = Color.underline(text);
        if (options.strikethrough) text = Color.strikethrough(text);
        if (!options.ending) text = text.replace("\x1B[39m", "").replace("\x1B[49m", "")
            .replace("\x1B[22m", "").replace("\x1B[23m", "")
            .replace("\x1B[24m", "").replace("\x1B[29m", "").replace(" ", "")
        return text;
    };

    static stringify(any) {
        const type = typeof any;
        if (any === null) return "null";
        if (type === "string") return any;
        if (type === "undefined") return "undefined";
        if (type === "boolean") return any ? "true" : "false";
        if (type === "object" || type === "symbol" || type === "function") return _util.inspect(any);
        return any.toString();
    };

    static color(text, color, alwaysRGB = false, paletteName = "default") {
        if (!color || ["default", "bgDefault", "none", "bgNone", "transparent", "bgTransparent"].includes(color)) return text;
        const isBg = color[0] === "b" && color[1] === "g";
        let rest = isBg ? (color[2] || "").toLowerCase() + color.substring(3) : color;
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
        if (alwaysRGB && ansiKeys.includes(color)) {
            if (isBg) return Printer.background(text, `rgb(${COLOR_PALETTES[paletteName][rest].join(",")})`, true);
            return Printer.color(text, `rgb(${COLOR_PALETTES[paletteName][rest].join(",")})`, true);
        }
        const sup = Color.supportsColor.has16m;
        // noinspection JSCheckFunctionSignatures
        const clr = rest.substring(4, rest.length - 1).split(/[, ]/).filter(i => i.length).map(i => i * 1);
        if (rest.startsWith("rgb(")) {
            if (!sup) return text;
            return Color[isBg ? "bgRgb" : "rgb"](...clr)(text);
        }
        if (rest.startsWith("hsl(")) {
            if (!sup) return text;
            return Color[isBg ? "bgHsl" : "hsl"](...clr)(text);
        }
        if (rest.startsWith("hsv(")) {
            if (!sup) return text;
            return Color[isBg ? "bgHsv" : "hsv"](...clr)(text);
        }
        if (rest[0] === "#") {
            if (!sup) return text;
            return Color[isBg ? "bgHex" : "hex"](rest.substring(1))(text);
        }
        if (ansiKeys.includes(color) && !Color.supportsColor.hasBasic) return text;
        if (!ansiKeys.includes(color) && !Color.supportsColor.has16m) return text;
        if (typeof Color[color] === "function") return Color[color](text);
        return text;
    };

    static background = (text, color, alwaysRGB = false, paletteName = "default") => Printer.color(text, "bg" + (color[0] || "").toUpperCase() + (color || "").substring(1), alwaysRGB, paletteName);
    static setDefault = (got, def) => {
        if (got === null || typeof got !== "object" || Array.isArray(got)) got = {};
        if (def) Object.keys(def).forEach(i => {
            if (got[i] === undefined) got[i] = def[i];
            else if (typeof def[i] === "object" && def[i] !== null) got[i] = Printer.setDefault(got[i], def[i]);
        });
        return got;
    };

    static makeGlobal(_con = false) {
        if (_con) global.console = Printer.static;
        global.Printer = Printer;
        // noinspection JSValidateTypes
        global.printer = Printer.static;
    };

    static new = options => new Printer(options);
    static create = options => new Printer(options);

    static substitute(substitutions, chr, ...texts) {
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

    static substituteStyles(chr, styles, text) {
        return text.replaceAll(new RegExp("(\\" + chr + ")[\\da-zA-Z]", "g"), (match, ...a) => {
            const s = match[1];
            if (!styles[s]) return match;
            return styles[s];
        });
    };

    static parseCSS(text, alwaysRGB = false, paletteName = "default") {
        const styles = {};
        text.split(";").forEach(i => styles[i.split(":")[0].trim()] = i.split(":").slice(1).join(":").trim());
        return styles;
    };

    static cleanCSS(opts, alwaysRGB = false, paletteName = "default") {
        opts = Printer.setDefault(opts, null);
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

    static applyCSS(styles, alwaysRGB = false, paletteName = "default") {
        return Printer.paint(" ", {
            color: styles.font.color,
            backgroundColor: styles.background.color,
            bold: styles.font.weight >= 600,
            italic: styles.font.style.italic,
            underline: styles.textDecoration.line.under,
            strikethrough: styles.textDecoration.line.through,
            padding: styles.padding,
            ending: false,
            alwaysRGB,
            paletteName
        });
    };

    static css = (text, alwaysRGB = false, paletteName = "default", clear = true) => (clear ? ClearAll : "") + Printer.applyCSS(Printer.cleanCSS(Printer.parseCSS(text, alwaysRGB, paletteName), alwaysRGB, paletteName), alwaysRGB, paletteName);
    static DEFAULT_OUTPUTS = {
        web: self => ({
            write: s => {
                const colors = [];
                let current = [null, null];
                s = webParser(s, colors, current, self.options.paletteName);
                const clr = [];
                let tmp = [];
                for (let i = 0; i < colors.length; i++) {
                    if (colors[i][0] === "") tmp = [];
                    else tmp.push(colors[i][0]);
                    clr.push(tmp.join(";"));
                }
                console.log(s, ...clr); // THIS PART IS ONLY RAN IF IT'S ON WEB!
            }
        }),
        html: self => {
            if (isReactNative) return Printer.DEFAULT_OUTPUTS.web();
            if (!isWeb) return Printer.DEFAULT_OUTPUTS.terminal();
            const el = document.createElement("div");
            return {
                write: s => {
                    const colors = [];
                    let current = [null, null];
                    s = webParser(s, colors, current, self.options.paletteName);
                    let tmp = [];
                    el.innerText = s;
                    let str = el.innerHTML.replaceAll(" ", "&nbsp;");
                    let amount = 0;
                    for (let i = 0; i < colors.length; i++) {
                        if (colors[i][0] === "") tmp = [];
                        else tmp.push(colors[i][0]);
                        if (colors[i][0]) {
                            str = str.replace("%c", `<span style="${tmp.join(";")}">`);
                            amount++;
                        } else if (amount > 0) {
                            str = str.replace("%c", `</span>`);
                            amount--;
                        } else str = str.replace("%c", "");
                    }
                    str += `</span>`.repeat(amount);
                    const element = self.options.htmlOut || document.body;
                    if (typeof element === "function") element(str);
                    else element.innerHTML += str;
                }
            };
        },
        terminal: () => process.stdout,
        reactNative: () => null
    };

    static makeWebPalette(palette) {
        return makeWebPalette(palette);
    };

    static colorTag(opts) {
        return Printer.css("color: " + brackets.getTag(opts.tag || "log").color);
    };

    static backgroundColorTag(opts) {
        return Printer.css("background-color: " + brackets.getTag(opts.tag || "log").backgroundColor);
    };
}

Printer.prototype.inline = Printer.inline = new Printer({newLine: false});
Printer.prototype.raw = Printer.raw = new Printer({format: "%text"});
Printer.prototype.static = Printer.static = Printer.prototype.default = Printer.default = new Printer();
const brackets = Printer.prototype.brackets = Printer.brackets = new Printer({
    tagBold: true,
    tagPadding: 0,
    tagColor: "default",
    dateBackgroundColor: "",
    timeBackgroundColor: "",
    datePadding: 0,
    timePadding: 0,
    namespaceColor: "",
    namespaceBackgroundColor: "",
    format: opts => Printer.colorTag(opts) + (opts.namespace ? "[%namespace\b \b] | " : "") + "[%date] | [%time] [%tag] > %text" + ClearAll
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
Printer.prototype.html = Printer.html = new Printer();
Printer.html.stdout = Printer.DEFAULT_OUTPUTS.html(Printer.html);

const list = ["inline", "raw", "static", "default", "brackets", "html"];
list.forEach(i => list.forEach(j => Printer.prototype[i][j] = Printer.prototype[j]));

if (isWeb) {
    window.printer = Printer.prototype.static;
    window.Printer = Printer;
} else module.exports = Printer.prototype.static;

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