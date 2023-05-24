// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols

const chalk = require("chalk");
const fs = require("fs");
const {stdout} = process;

const supportsBasicColor = chalk.supportsColor.hasBasic;
const supportsHexColor = chalk.supportsColor.has256;

if (!supportsBasicColor) stdout.write("WARNING: The current terminal doesn't support basic colors! Basic colors will be ignored.\n");
if (!supportsHexColor) stdout.write("WARNING: The current terminal doesn't support hexadecimal colors! Hexadecimal colors will be ignored.\n");

class Printer {
    static DEFAULT_OPTIONS = {
        format: "$date $time $tag $text",

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
        timeMillisecondLength: 3
    };
    class = Printer;
    tags = {
        pass: {text: "PASS", backgroundColor: "greenBright", textColor: "green"},
        fail: {text: "FAIL", backgroundColor: "redBright", textColor: "redBright"},
        error: {text: "ERR!", backgroundColor: "red", textColor: "red"},
        warn: {text: "WARN", backgroundColor: "greenBright", textColor: "green"},
        info: {text: "INFO", backgroundColor: "blueBright", textColor: "blue"},
        debug: {text: "DEBUG", backgroundColor: "gray", textColor: "gray"},
        notice: {text: "NOTICE", backgroundColor: "magentaBright", textColor: "magentaBright"},
        log: {text: "LOG", backgroundColor: "gray", textColor: "white"}
    };
    streams = new Set;
    chr = "$";
    components = {
        date: opts => {
            const date = new Date;
            const rs = date.toLocaleString("en", opts.dateOptions);
            return {
                result: Printer.paint(rs, {
                    backgroundColor: opts.dateBackgroundColor,
                    color: opts.dateColor,
                    padding: opts.datePadding,
                    bold: opts.dateBold,
                    italic: opts.dateItalic,
                    underline: opts.dateUnderline,
                    strikethrough: opts.dateStrikethrough
                }), plain: rs
            };
        }, tag: opts => {
            const tag = this.tags[(opts.tag || "").toLowerCase()] || this.tags.log;
            opts.defaultColor = opts.defaultColor || tag.textColor;
            return {
                result: Printer.paint(tag.text, {
                    color: tag.color || opts.tagColor,
                    backgroundColor: tag.backgroundColor,
                    padding: opts.tagPadding,
                    bold: opts.tagBold,
                    italic: opts.tagItalic,
                    underline: opts.tagUnderline,
                    strikethrough: opts.tagStrikethrough
                }), plain: tag.text
            };
        }, time: opts => {
            const date = new Date;
            const l = [["Date", "getDate"], ["Hour", "getDate"], ["Minute", "getMinutes"], ["Second", "getSeconds"], ["Millisecond", "getMilliseconds", opts.timeMillisecondLength],];
            let text = "";
            for (let i = 0; i < l.length; i++) {
                const k = l[i];
                if (opts["time" + k[0]]) text += date[k[1]]().toString().padStart(k[2] || 2, "0").substring(0, k[2] || 2) + (k === "Second" ? "." : ":");
            }
            text = text.substring(0, text.length - 1);
            return {
                result: Printer.paint(text, {
                    backgroundColor: opts.timeBackgroundColor,
                    color: opts.timeColor,
                    padding: opts.timePadding,
                    bold: opts.timeBold,
                    italic: opts.timeItalic,
                    underline: opts.timeUnderline,
                    strikethrough: opts.timeStrikethrough
                }), plain: text
            };
        }
    };

    constructor(options) {
        if (typeof options !== "object" || Array.isArray(options)) options = {};
        Printer.setDefault(options, Printer.DEFAULT_OPTIONS);
        this.options = options;
    };

    addStream(stream) {
        this.streams.add(stream);
        return this;
    };

    removeStream(stream) {
        this.streams.delete(stream);
        return this;
    };

    writeOutToFile(file) {
        const stream = fs.createWriteStream(file);
        this.addStream(stream);
        return stream;
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
        if (color[0] === "#" || (isBg && color[2] === "#")) return chalk[isBg ? "bgHex" : "hex"](isBg ? color.substring(2) : color)(text);
        return chalk[color](text);
    };

    static background = (text, color) => Printer.color(text, "bg" + color[0].toUpperCase() + color.substring(1));

    static setDefault(got, def) {
        Object.keys(def).forEach(i => {
            if (got[i] === undefined) got[i] = def[i]; else if (typeof def[i] === "object") Printer.setDefault(got[i], def[i]);
        });
    };

    static makeGlobal(_console = false) {
        if (_console) global.console = Printer.static;
        global.Printer = Printer;
        global.printer = Printer.static;
    };

    static new(options) {
        return new Printer(options);
    };

    static create(options) {
        return new Printer(options);
    };

    makeGlobal(_console = false) {
        if (_console) global.console = Printer.static;
        global.Printer = Printer;
        global.printer = Printer.static;
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

    log(text, options) {
        options = {...this.options, ...options};
        const lines = Printer.stringify(text).split("\n");
        let comp = {};
        const reg = `\\${this.chr}[^ \\${this.chr}]+`;
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
            stdout.write(colored.replaceAll(this.chr + "text", line) + "\n");
            this.streams.forEach(stream => stream.write(plain.replaceAll(this.chr + "text", l) + "\n"));
        });
        return this;
    };

    tag(tag, text, options) {
        return this.log(text, {...options, tag});
    };

    pass(text, options) {
        return this.tag("pass", text, options);
    };

    fail(text, options) {
        return this.tag("fail", text, options);
    };

    error(text, options) {
        return this.tag("error", text, options);
    };

    err(text, options) {
        return this.error(text, options);
    };

    warning(text, options) {
        return this.warn(text, options);
    };

    warn(text, options) {
        return this.tag("warn", text, options);
    };

    inform(text, options) {
        return this.tag("info", text, options);
    };

    info(text, options) {
        return this.inform(text, options);
    };

    debug(text, options) {
        return this.tag("debug", text, options);
    };

    notice(text, options) {
        return this.tag("notice", text, options);
    };
}

module.exports = Printer.static = new Printer();