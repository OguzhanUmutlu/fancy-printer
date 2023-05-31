// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols

const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

const supportsBasicColor = chalk.supportsColor.hasBasic;
const supportsHexColor = chalk.supportsColor.has256;

if (!supportsBasicColor && process.stdout) process.stdout.write("WARNING: The current terminal doesn't support basic colors! Basic colors will be ignored.\n");
if (!supportsHexColor && process.stdout) process.stdout.write("WARNING: The current terminal doesn't support hexadecimal colors! Hexadecimal colors will be ignored.\n");

const fnCheck = (s, ...args) => typeof s === "function" ? s(...args) : s;

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
const ClearAll = "\x1B[39m\x1B[49m\x1B[22m\x1B[23m\x1B[24m\x1B[29m";

class Printer {
    _periodicOptions = null;
    static DEFAULT_OPTIONS = {
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
            localeMatcher: undefined,
            weekday: undefined,
            era: undefined,
            year: undefined,
            month: "short",
            day: "numeric",
            hour: undefined,
            minute: undefined,
            second: undefined,
            timeZoneName: undefined,
            formatMatcher: undefined,
            hour12: undefined,
            timeZone: undefined
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
    stdin = process.stdin || process.openStdin();
    stdout = process.stdout;
    Printer = Printer;
    tags = {
        pass: {text: "PASS", backgroundColor: "greenBright", textColor: "green"},
        fail: {text: "FAIL", backgroundColor: "redBright", textColor: "redBright"},
        error: {text: "ERR!", backgroundColor: "red", textColor: "red"},
        warn: {text: "WARN", backgroundColor: "yellow", textColor: "yellow"},
        info: {text: "INFO", backgroundColor: "blueBright", textColor: "blue"},
        debug: {text: "DEBUG", backgroundColor: "gray", textColor: "gray"},
        notice: {text: "NOTICE", backgroundColor: "cyanBright", textColor: "cyan"},
        log: {text: "LOG", backgroundColor: "gray", textColor: "white"},
        assert: {text: "ASSERT", backgroundColor: "white", color: "black", textColor: "gray"}
    };
    streams = new Map;
    chr = "%";
    components = {
        date: opts => {
            const date = new Date;
            const rs = date.toLocaleString("en", opts.dateOptions);
            return {result: Printer.paint(rs, componentHelper("date", opts)), plain: rs};
        }, tag: opts => {
            const tag = this.tags[opts.tag || ""] || this.tags[(opts.tag || "").toLowerCase()] || this.tags.log;
            opts.defaultColor = opts.defaultColor || tag.textColor;
            const txt = typeof tag.text === "function" ? tag.text() : tag.text;
            const gotOpts = componentHelper("tag", opts);
            return {
                result: Printer.paint(txt, {
                    ...gotOpts,
                    color: fnCheck(tag.color) || gotOpts.color,
                    backgroundColor: fnCheck(tag.backgroundColor)
                }), plain: txt
            };
        }, time: opts => {
            const date = new Date;
            const l = [["Date", "getDate"], ["Hour", "getDate"], ["Minute", "getMinutes"], ["Second", "getSeconds"], ["Millisecond", "getMilliseconds", opts.timeMillisecondLength],];
            let text = "";
            for (let i = 0; i < l.length; i++) {
                const k = l[i];
                if (opts["time" + k[0]]) text += date[k[1]]().toString().padStart(k[2] || 2, "0").substring(0, k[2] || 2) + (k[0] === "Second" ? "." : ":");
            }
            text = text.substring(0, text.length - 1);
            return {
                result: Printer.paint(text, componentHelper("time", opts)), plain: text
            };
        }/*, file: opts => {
            let at = new Error().stack.split("\n")[1].replace("at", "").trim();
            if (at.includes("(")) at = at.split("(")[1].replace(")", "");
            const file = at.split(":").reverse().slice(2).reverse().join(":");
            return {result: Printer.paint(file, componentHelper("file", opts)), plain: file};
        }, filename: opts => {
            let at = new Error().stack.split("\n")[1].replace("at", "").trim();
            if (at.includes("(")) at = at.split("(")[1].replace(")", "");
            const file = at.split(":").reverse().slice(2).reverse().join(":");
            return {result: Printer.paint(path.basename(file), componentHelper("file", opts)), plain: file};
        }, row: opts => {
            let at = new Error().stack.split("\n")[1].replace("at", "").trim();
            const file = at.split(":").reverse()[1];
            return {result: Printer.paint(file, componentHelper("row", opts)), plain: file};
        }, column: opts => {
            let at = new Error().stack.split("\n")[1].replace("at", "").trim();
            const file = at.split(":").reverse()[0].replace(")", "");
            return {result: Printer.paint(file, componentHelper("column", opts)), plain: file};
        }, stack: opts => {
            let at = new Error().stack.split("\n")[1].replace("at", "").trim();
            if (at.includes("(")) at = at.split("(")[1].replace(")", "");
            return {result: Printer.paint(at, componentHelper("stack", opts)), plain: at};
        }*/
    };
    substitutions = [
        {
            regex: "[oOs]",
            run: str => Printer.stringify(str)
        },
        {
            regex: "(\\.\\d+)?[di]",
            run: (str, match) => {
                if (typeof str === "number") str = Math.sign(str) * Math.floor(Math.abs(str));
                const part = match.substring(2, match.length - 1);
                str = Printer.stringify(str);
                if (part) str = str.padStart(part * 1, "0");
                return str;
            }
        },
        {
            regex: "(\\.\\d+)?f",
            run: (str, match) => {
                const part = match.substring(2, match.length - 1);
                if (part && typeof str === "number") str = str.toFixed(part * 1);
                return Printer.stringify(str);
            }
        },
        {
            regex: "c",
            run: str => {
                str = str || "";
                let styles = str;
                if (typeof str !== "object") {
                    styles = {};
                    str.split(";").forEach(i => styles[i.split(":")[0].trim()] = i.split(":").slice(1).join(":").trim());
                }
                // [X] background = Color
                // [X] background-color = Color
                // [X] color = Color
                // [X] font-weight = normal | bold | bolder | n > 0
                // [X] text-decoration = underline | line-through | linethrough | strike-through | strikethrough
                // todo: overline, maybe if it's possible?
                // [X] padding = n > 0
                // [X] font-style = normal | italic | oblique

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
                return ClearAll + Printer.paint(" ", {
                    color: styles.color,
                    backgroundColor: styles.background || styles.backgroundColor,
                    bold: ["bold", "bolder"].includes(styles["font-weight"]) || (parseInt(styles["font-weight"]) || 0) > 600,
                    italic: (styles["font-style"] || "").split(" ").includes("italic"),
                    underline: (styles["text-decoration"] || "").split(" ").includes("underline"),
                    strikethrough: ["strikethrough", "strike-through", "linethrough", "line-through"].some(a => (styles["text-decoration"] || "").split(" ").includes(a)),
                    padding: styles.padding || 0
                }).replace("\x1B[39m", "").replace("\x1B[49m", "")
                    .replace("\x1B[22m", "").replace("\x1B[23m", "")
                    .replace("\x1B[24m", "").replace("\x1B[29m", "").replace(" ", "");
            }
        }
    ];
    _times = {};
    _counts = {};
    _group = 0;

    constructor(options) {
        if (typeof options !== "object" || Array.isArray(options)) options = {};
        Printer.setDefault(options, Printer.DEFAULT_OPTIONS);
        this.options = options;
    };

    static paint(text, options) {
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

    static stringify(s) {
        switch (typeof s) {
            case "bigint":
            case "boolean":
            case "number":
            case "string":
            case "symbol":
                return s.toString();
            case "undefined":
                return s === null ? "null" : "undefined";
            case "function":
            case "object":
                return require("util").inspect(s);
            default:
                return "";
        }
    };

    static color = (text, color) => {
        if (!chalk.supportsColor || ["default", "bg" + "default", "none", "bg" + "none", "transparent", "bg" + "transparent", ""].includes(color)) return text;
        const isBg = color[0] === "b" && color[1] === "g";
        const rest = isBg ? color.substring(2) : color;
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

    static background = (text, color) => Printer.color(text, "bg" + (color[0] || "").toUpperCase() + (color || "").substring(1));

    static setDefault(got, def) {
        Object.keys(def).forEach(i => {
            if (got[i] === undefined) got[i] = def[i]; else if (typeof def[i] === "object") Printer.setDefault(got[i], def[i]);
        });
    };

    static makeGlobal(_console = false) {
        if (_console) global.console = Printer.static;
        global.Printer = Printer;
        // noinspection JSValidateTypes
        global.printer = Printer.static;
    };

    static new(options) {
        return new Printer(options);
    };

    static create(options) {
        return new Printer(options);
    };

    addFile(file) {
        this.streams.set(file, fs.createWriteStream(file, {flags: "a"}));
        return this;
    };

    removeFile(file) {
        this.streams.delete(file);
        return this;
    };

    makeLoggerFile(options) {
        if (typeof options !== "object" || Array.isArray(options)) options = {};
        Printer.setDefault(options, {
            folder: "./logs", format: "log-" + this.chr + "DD-" + this.chr + "MM-" + this.chr + "YYYY.log"
        });
        this._periodicOptions = options;
        if (this.streams.get("__periodic__")) return;
        let sl;
        this.streams.set("__periodic__", sl = {
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
                const list = [
                    ["D", day],
                    ["M", month],
                    ["Y", year],
                    ["h", hours],
                    ["m", minutes],
                    ["s", seconds],
                    ["S", ms]
                ];
                const formatted = list.reduce((a, b) => a.replaceAll(new RegExp("\\" + this.chr + b[0] + "+", "g"), str => {
                    const len = str.length - 1;
                    str = b[1].toString().padStart(len, "0");
                    if (str.length > len) str = str.substring(str.length - len);
                    return str;
                }), options.format);
                const file = path.join(options.folder, formatted);
                if (!sl._streams.has(file)) {
                    if (sl._lastStream) sl._lastStream.close();
                    sl._streams.set(file, sl._lastStream = fs.createWriteStream(file, {flags: "a"}));
                }
                sl._streams.get(file).write(content);
            },
            _lastStream: null,
            _streams: new Map
        });
        return this;
    };

    makeHashedLoggerFile(options) {
        if (typeof options !== "object" || Array.isArray(options)) options = {};
        Printer.setDefault(options, {
            folder: "./logs", radix: 16, divide: 3, format: "log-" + this.chr + "t.log"
        });
        if (!fs.existsSync(options.folder)) fs.mkdirSync(options.folder);
        const file = path.join(options.folder, options.format.replaceAll(this.chr + "t", Math.floor(Date.now() / (10 ** options.divide)).toString(options.radix)));
        this.addFile(file);
        return this;
    };

    makeGlobal(_console = false) {
        if (_console) global.console = Printer.static;
        global.Printer = Printer;
        // noinspection JSValidateTypes
        global.printer = Printer.static;
        return this;
    };

    new(options) {
        return new Printer(options);
    };

    create(options) {
        return new Printer(options);
    };

    addComponent(name, callback) {
        this.components[name] = callback;
        return this;
    };

    removeComponent(name) {
        delete this.components[name];
        return this;
    };

    getComponents() {
        return this.components;
    };

    getComponent(name) {
        return this.components[name];
    };

    addSubstitution(regex, run) {
        this.substitutions.push({regex, run});
        return this;
    };

    removeSubstitution(sub) {
        this.substitutions.splice(this.substitutions.indexOf(sub), 1);
        return this;
    };

    getSubstitutions() {
        return this.substitutions;
    };

    addTag(key, text, color, backgroundColor, textColor = "", textBackgroundColor = "") {
        this.tags[key] = {text, color, backgroundColor, textColor, textBackgroundColor};
        return this;
    };

    removeTag(key) {
        delete this.tags[key];
        return this;
    };

    getTags() {
        return this.tags;
    };

    getTag(key) {
        return this.tags[key];
    };

    setFormat(format) {
        this.options.format = format;
        return this;
    };

    getFormat() {
        return this.options.format;
    };

    setCharacter(character) {
        this.chr = character;
        return this;
    };

    getCharacter() {
        return this.chr;
    };

    println(text) {
        if (!this.stdout) return this;
        this.stdout.write(Printer.stringify(text) + "\n");
        return this;
    };

    printLine(text) {
        return this.println(text);
    };

    print(text) {
        if (!this.stdout) return this;
        this.stdout.write(Printer.stringify(text));
        return this;
    };

    backspace(amount = 1) {
        if (!this.stdout) return this;
        this.stdout.write("\b \b".repeat(amount));
        return this;
    };

    static substitute(substitutions, chr, ...texts) {
        let text = "";
        for (let i = 0; i < texts.length; i++) {
            let t = Printer.stringify(texts[i]);
            if (i !== texts.length - 1) substitutions.forEach(sub => {
                const reg = sub.regex instanceof RegExp ? sub.regex : new RegExp("(\\" + chr + sub.regex + ")", "g");
                t = t.replaceAll(reg, match => {
                    i++;
                    return sub.run(texts[i], match);
                });
            });
            text += t;
            if (i !== texts.length - 1) text += " ";
        }
        return text;
    };

    substitute(...texts) {
        return Printer.substitute(this.substitutions, this.chr, ...texts);
    };

    log(...texts) {
        const options = this.options;
        let text = "";
        if (this.options.substitutions) {
            text = this.substitute(...texts);
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
        const reg = `\\${this.chr}[a-zA-Z]+`;
        const formatted = options.format.split(new RegExp("(" + reg + ")", "g")).filter(i => i).map(i => {
            if (!new RegExp("^" + reg + "$").test(i.toString())) return i;
            i = i.substring(1);
            if (!this.components[i]) return this.chr + i;
            i = comp[i] || this.components[i](options);
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
            this[options.newLine ? "println" : "print"](Printer.paint(" ".repeat(this._group), componentHelper("group", options)) + colored.replaceAll(this.chr + "text", line));
            this.streams.forEach(stream => stream.write(" ".repeat(this._group) + plain.replaceAll(this.chr + "text", l).replaceAll(/\x1B\[\d+m/g, "") + (options.newLine ? "\n" : "")));
        });
        return this;
    };

    tag(tag, ...texts) {
        const old = this.options.tag;
        const {defaultColor, defaultBackgroundColor} = this.options;
        this.options.tag = tag;
        this.log(...texts);
        this.options.tag = old;
        this.options.defaultColor = defaultColor;
        this.options.defaultBackgroundColor = defaultBackgroundColor;
        return this;
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

    table(object, columns = null, tagName = "log") {
        const result = this.tableRaw(object, columns);
        if (result) result.forEach(i => tagName ? this.tag(tagName, i) : this.println(i));
        else tagName ? this.tag(tagName, object) : this.println(i);
        return this;
    };

    time(name = "default") {
        this._times[name] = performance.now();
        return this;
    };

    timeGet(name = "default") {
        return Math.abs(performance.now() - (this._times[name] || performance.now()) - 0.06);
    };

    timeLog(name = "default", fixed = 3) {
        this.log(name + ": " + this.timeGet(name).toFixed(fixed) + "s");
        return this;
    };

    timeEnd(name = "default", fixed = 3) {
        delete this._times[name];
        this.timeLog(name, fixed);
        return this;
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
        return this;
    };

    group() {
        this._group++;
        return this;
    };

    groupEnd() {
        this._group--;
        if (this._group < 0) this._group = 0;
        return this;
    };

    groupGet() {
        return this._group;
    };

    assert(assertion, ...texts) {
        if (assertion) return this;
        this.tag("assert", ...texts);
        return this;
    };

    updateOptions(opts) {
        if (typeof opts !== "object" || Array.isArray(opts)) opts = {};
        Printer.setDefault(opts, Printer.DEFAULT_OPTIONS);
        this.options = {...this.options, ...opts};
        return this;
    };

    async readStdinData() {
        return await new Promise(r => this.stdin.once("data", r));
    }

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
        if (res[0] === 3) process.exit();
        this.stdin.setRawMode(false);
        return res.toString();
    };

    async readCustom(options) {
        if (!this.stdin) return "";
        if (typeof options !== "object" || Array.isArray(options)) options = {};
        Printer.setDefault(options, {
            onKey: text => this.print(text),
            onBackspace: () => this.backspace(),
            onArrow: () => true,
            onEnd: () => this.print("\n"),
            onTermination: () => process.exit()
        });
        let cursor = -1;
        let result = "";
        let promCb;
        let prom = new Promise(r => promCb = r);
        this.stdin.setRawMode(true);
        this.stdin.resume();
        let func;
        this.stdin.on("data", func = buffer => {
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
                this.stdin.setRawMode(false);
                this.stdin.pause();
                options.onEnd();
                this.stdin.off("data", func);
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

    async readPassword(options) {
        if (typeof options !== "object" || Array.isArray(options)) options = {};
        return await this.readCustom({
            onKey: text => this.stdout.write(options.character || "*"),
            ...options
        });
    };

    async readSelection(list = [], options) {
        if (typeof options !== "object" || Array.isArray(options)) options = {};
        if (list.length === 0) return "";
        let selected = 0;
        this.print(list[selected]);
        await this.readCustom({
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
                this.backspace(list[old].length);
                this.print(list[selected]);
            }, ...options
        });
        return selected;
    };
}

Printer.inline = new Printer({newLine: false});
Printer["prototype"].inline = Printer.inline;
module.exports = Printer.static = new Printer();