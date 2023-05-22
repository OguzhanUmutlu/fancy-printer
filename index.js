// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols

const chalk = require("chalk");

const supportsBasicColor = chalk.supportsColor.hasBasic;
const supportsHexColor = chalk.supportsColor.has256;

if (!supportsBasicColor) console.warn("WARNING: The current terminal doesn't support basic colors! Basic colors will be ignored.");
if (!supportsHexColor) console.warn("WARNING: The current terminal doesn't support hexadecimal colors! Hexadecimal colors will be ignored.");

class Printer {
    static DEFAULT_OPTIONS = {
        format: "$date $tag $text",

        defaultColor: "",
        defaultBackgroundColor: "",

        tagColor: "",

        dateColor: "",
        dateBackgroundColor: "blueBright",
        dateBold: true,
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
        }
    };

    tags = {
        pass: {text: "PASS", backgroundColor: "greenBright", textColor: "green"},
        fail: {text: "FAIL", backgroundColor: "redBright", textColor: "redBright"},
        error: {text: "ERR!", backgroundColor: "red", textColor: "red"},
        warn: {text: "WARN", backgroundColor: "greenBright", textColor: "green"},
        info: {text: "INFO", backgroundColor: "blueBright", textColor: "blue"},
        debug: {text: "DBG~", backgroundColor: "gray", textColor: "gray"},
        log: {text: "LOG~", backgroundColor: "gray", textColor: "white"},
    };

    static paint(text, options) {
        Printer.setDefault(options, {
            color: "", backgroundColor: "", bold: true, italic: false, underline: false, strikethrough: false,
            padding: 0
        });
        if (options.padding > 0) text = " ".repeat(options.padding) + text + " ".repeat(options.padding);
        if (options.color) text = Printer.color(text, options.color);
        if (options.backgroundColor) text = Printer.background(text, options.backgroundColor);
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
        if (!chalk.supportsColor) return text;
        const isBg = color[0] === "b" && color[1] === "g";
        if (color[0] === "#" || (isBg && color[2] === "#")) return chalk[isBg ? "bgHex" : "hex"](color)(text);
        return chalk[color](text);
    };

    static background = (text, color) => Printer.color(text, "bg" + color[0].toUpperCase() + color.substring(1));

    static setDefault(got, def) {
        Object.keys(def).forEach(i => {
            if (got[i] === undefined) got[i] = def[i];
            else if (typeof def[i] === "object") Printer.setDefault(got[i], def[i]);
        });
    };

    static makeGlobal(_console = false) {
        if (_console) global.console = Printer.static;
        global.Printer = Printer;
        global.printer = Printer.static;
    };

    components = {
        date: opts => {
            const date = new Date;
            return Printer.paint(date.toLocaleString("en", opts.dateOptions), {
                backgroundColor: opts.dateBackgroundColor, color: opts.dateColor, bold: opts.dateBold, padding: 1
            });
        },
        tag: opts => {
            const tag = this.tags[(opts.tag || "").toLowerCase()] || this.tags.log;
            opts.defaultColor = opts.defaultColor || tag.textColor;
            return Printer.paint(tag.text, {
                color: tag.color || opts.tagColor, backgroundColor: tag.backgroundColor, padding: 2
            });
        }
    };

    constructor(options) {
        if (typeof options !== "object" || Array.isArray(options)) options = {};
        Printer.setDefault(options, Printer.DEFAULT_OPTIONS);
        this.options = options;
    };

    addComponent(name, callback) {
        this.components[name] = callback;
    };

    removeComponent(name) {
        delete this.components[name];
    };

    getComponents() {
        return this.components;
    };

    getComponent(name) {
        return this.components[name];
    };

    addTag(key, text, color, backgroundColor, textColor = "", textBackgroundColor = "") {
        this.tags[key] = {text, color, backgroundColor, textColor, textBackgroundColor};
    };

    removeTag(key) {
        delete this.tags[key];
    };

    getTags() {
        return this.tags;
    };

    getTag(key) {
        return this.tags[key];
    };

    setFormat(format) {
        this.options.format = format;
    };

    getFormat() {
        return this.options.format;
    };

    log(text, options) {
        options = {...this.options, ...options};
        const lines = Printer.stringify(text).split("\n");
        let comp = {};
        const formatted = options.format.replaceAll(/\$\w+/g, s => {
            s = s.substring(1);
            if (!this.components[s]) return "$" + s;
            s = comp[s] || this.components[s](options);
            return Printer.stringify(s);
        });
        lines.forEach(line => {
            if (options.defaultColor) line = Printer.color(line, options.defaultColor);
            if (options.defaultBackgroundColor) line = Printer.color(line, options.defaultBackgroundColor);
            console.log(formatted.replaceAll("$text", line));
        });
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
}

Printer.static = new Printer();

module.exports = Printer;