// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols

const isWeb = typeof require === "undefined";

const chalk = isWeb ? null : require("chalk");
const fs = isWeb ? null : require("fs");
const path = require("path");
const init = require("./defaults.js");
const util = require("util");

const supportsBasicColor = chalk.supportsColor.hasBasic;
const supportsHexColor = chalk.supportsColor.has256;

if (!supportsBasicColor && process.stdout) process.stdout.write("WARNING: The current terminal doesn't support basic colors! Basic colors will be ignored.\n");
if (!supportsHexColor && process.stdout) process.stdout.write("WARNING: The current terminal doesn't support hexadecimal colors! Hexadecimal colors will be ignored.\n");

const fnCheck = (s, ...args) => typeof s === "function" ? s(...args) : s;
const ClearAll = "\x1B[39m\x1B[49m\x1B[22m\x1B[23m\x1B[24m\x1B[29m";
const cH = (opts, name, c) => fnCheck(opts[name + c]);
const componentHelper = (name, opts) => ({
    color: cH(opts, name, "Color"),
    backgroundColor: cH(opts, name, "BackgroundColor"),
    padding: cH(opts, name, "Padding"),
    bold: cH(opts, name, "Bold"),
    italic: cH(opts, name, "Italic"),
    underline: cH(opts, name, "Underline"),
    strikethrough: cH(opts, name, "Strikethrough")
});

const DEFAULT_OPTIONS = {
    format: "%date %time %tag %text",
    substitutions: true,
    newLine: true,

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
    init(self);
    return self;
}

/*** @type {Object<string, (self: Printer | FancyPrinter | Object<any, any>, ...a: (any | Object<any, any | Object<any, any>>)[]) => any>} */
const prototype = {};

prototype.initialize = function (self) {
    init(self);
    return self;
};

prototype.addFile = function (self, file) {
    self.streams.set(file, fs.createWriteStream(file, {flags: "a"}));
    return self;
};

prototype.removeFile = function (self, file) {
    self.streams.delete(file);
    return self;
};

prototype.makeLoggerFile = function (self, options) {
    if (typeof options !== "object" || Array.isArray(options)) options = {};
    Printer.setDefault(options, {
        folder: "./logs", format: "log-" + self.chr + "DD-" + self.chr + "MM-" + self.chr + "YYYY.log",
        month: "long", day: "long"
    });
    self._periodicOptions = options;
    if (self.streams.get("__periodic__")) return;
    let sl;
    self.streams.set("__periodic__", sl = {
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
    if (_console) global.console = Printer.static;
    global.Printer = Printer;
    // noinspection JSValidateTypes
    global.printer = Printer.static;
    return self;
};

prototype.new = function (self, options) {
    return new Printer(options);
};

prototype.create = function (self, options) {
    return new Printer(options);
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
    if (self.options.substitutions) {
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
    const reg = `\\${self.chr}[a-zA-Z]+`;
    const spl = fnCheck(options.format, options).split(new RegExp("(" + reg + ")", "g"));
    const formatted = spl.filter(i => i).map(i => {
        if (!new RegExp("^" + reg + "$").test(i.toString())) return i;
        i = i.substring(1);
        if (!self.components[i]) return self.chr + i;
        i = comp[i] || self.components[i](options);
        if (typeof i === "string" || typeof i === "number") return i.toString();
        if (typeof i !== "object") throw new Error("Expected the component to throw string, number or an object, got: " + typeof i);
        return i;
    });
    const colored = formatted.map(i => typeof i === "string" ? i : i.result).join("");
    const plain = formatted.map(i => typeof i === "string" ? i : i.plain).join("");
    lines.forEach(line => {
        const l = line;
        line = Printer.color(line, options.defaultColor);
        line = Printer.color(line, options.defaultBackgroundColor);
        self[options.newLine ? "println" : "print"](Printer.paint(" ".repeat(self._group), componentHelper("group", options)) + colored.replaceAll(self.chr + "text", line));
        self.streams.forEach(stream => stream.write(" ".repeat(self._group) + plain.replaceAll(self.chr + "text", l).replaceAll(/\x1B\[\d+m/g, "") + (options.newLine ? "\n" : "")));
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
    if (res[0] === 3) process.exit();
    self.stdin.setRawMode(false);
    return res.toString();
};

prototype.readCustom = async function (self, options) {
    if (!self.stdin) return "";
    if (typeof options !== "object" || Array.isArray(options)) options = {};
    Printer.setDefault(options, {
        onKey: text => self.print(text),
        onBackspace: () => self.backspace(),
        onArrow: () => true,
        onEnd: () => self.print("\n"),
        onTermination: () => process.exit()
    });
    let cursor = -1;
    let result = "";
    let promCb;
    let prom = new Promise(r => promCb = r);
    self.stdin.setRawMode(true);
    self.stdin.resume();
    let func;
    self.stdin.on("data", func = buffer => {
        let text = buffer.toString();
        if (text === "\u0003") process.exit();
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
            return;
        } else {
            result = result.substring(0, cursor + 1) + text + result.substring(cursor + 1);
            cursor++;
        }
        options.onKey(text);
    });
    return await prom;
};

prototype.readPassword = async function (self, options) {
    if (typeof options !== "object" || Array.isArray(options)) options = {};
    return await self.readCustom({
        onKey: text => self.stdout.write(options.character || "*"),
        ...options
    });
};

prototype.readSelection = async function (self, list = [], options) {
    if (typeof options !== "object" || Array.isArray(options)) options = {};
    if (list.length === 0) return "";
    let selected = 0;
    self.print(list[selected]);
    await self.readCustom({
        onKey: r => r,
        onBackspace: r => r,
        onArrow: arrow => {
            let old = selected;
            if (arrow === "up") {
                selected--;
                if (selected < 0) selected = list.length - 1;
            } else if (arrow === "down") {
                selected++;
                if (selected > list.length - 1) selected = 0;
            } else return;
            self.backspace(list[old].length);
            self.print(list[selected]);
        }, ...options
    });
    return selected;
};

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
    Printer.setDefault(options, Printer.DEFAULT_OPTIONS);
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
        padding: 0
    });
    if (options.padding > 0) text = " ".repeat(options.padding) + text + " ".repeat(options.padding);
    text = Printer.color(text, options.color);
    text = Printer.background(text, options.backgroundColor);
    if (options.bold) text = chalk.bold(text);
    if (options.italic) text = chalk.italic(text);
    if (options.underline) text = chalk.underline(text);
    if (options.strikethrough) text = chalk.strikethrough(text);
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
    if (!chalk.supportsColor || ["default", "bg" + "default", "none", "bg" + "none", "transparent", "bg" + "transparent", ""].includes(color)) return text;
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
    if (rest.startsWith("rgb(")) {
        const clr = rest.substring(4, rest.length - 1).split(/[, ]/).filter(i => i).map(i => i * 1);
        return chalk[isBg ? "bgRgb" : "rgb"](...clr)(text);
    }
    if (rest.startsWith("hsl(")) {
        const clr = rest.substring(4, rest.length - 1).split(/[, ]/).filter(i => i).map(i => i * 1);
        return chalk[isBg ? "bgHsl" : "hsl"](...clr)(text);
    }
    if (rest.startsWith("hsv(")) {
        const clr = rest.substring(4, rest.length - 1).split(/[, ]/).filter(i => i).map(i => i * 1);
        return chalk[isBg ? "bgHsv" : "hsv"](...clr)(text);
    }
    if (rest[0] === "#") return chalk[isBg ? "bgHex" : "hex"](rest.substring(1))(text);
    return (chalk[color] || (r => r))(text);
};
Printer.background = (text, color) => Printer.color(text, "bg" + (color[0] || "").toUpperCase() + (color || "").substring(1));

Printer.setDefault = (got, def) => {
    Object.keys(def).forEach(i => {
        if (got[i] === undefined) got[i] = def[i]; else if (typeof def[i] === "object") Printer.setDefault(got[i], def[i]);
    });
};

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
        padding: styles.padding
    }).replace("\x1B[39m", "").replace("\x1B[49m", "")
        .replace("\x1B[22m", "").replace("\x1B[23m", "")
        .replace("\x1B[24m", "").replace("\x1B[29m", "").replace(" ", "");
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
    format: opts => Printer.css("color: " + brackets.getTag(opts.tag || "log").color) + "[%date] | [%time] [%tag] > %text" + ClearAll
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

module.exports = prototype.static;