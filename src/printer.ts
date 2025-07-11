// @ts-ignore

import Component, {BaseComponentOptions} from "./component";
import DateComponent from "./components/DateComponent";
import TimeComponent from "./components/TimeComponent";
import UptimeComponent from "./components/UptimeComponent";
import FileComponent from "./components/FileComponent";
import FunctionComponent from "./components/FunctionComponent";
import ColumnComponent from "./components/ColumnComponent";
import LineComponent from "./components/LineComponent";
import styles, {foregroundColorNames} from "ansi-styles";
import TagComponent from "./components/TagComponent";
import {ColorPalettes, hslToRgb, hsvToRgb, parseCSS, RGB} from "./utils";
import CallbackComponent from "./components/CallbackComponent";
import NamespaceComponent from "./components/NamespaceComponent";
import supportsColor from "supports-color";
import colorNames from "color-name";

let glob_: any;
if (typeof global !== "undefined") glob_ = global;
else if (typeof window !== "undefined") glob_ = window;
else if (typeof self !== "undefined") glob_ = self;
else if (typeof globalThis !== "undefined") glob_ = globalThis;
else glob_ = {};
const globalVar = glob_;
const isReactNative = typeof glob_.navigator !== "undefined" && glob_.navigator["product"] === "ReactNative";
const isWeb = (typeof window !== "undefined" || typeof self !== "undefined" || isReactNative) && typeof process === "undefined";
// const hasAnsi256Stdout = supportsColor.stdout && supportsColor.stdout.has256;
const hasAnsi16mStdout = supportsColor.stdout && supportsColor.stdout.has16m;
// const hasAnsi256Stderr = supportsColor.stderr && supportsColor.stderr.has256;
// const hasAnsi16mStderr = supportsColor.stderr && supportsColor.stderr.has16m;
let req: any;
try {
    req = eval("require");
} catch (e) {
    req = () => null;
}

export type Printer<Tags extends string[] = string[], Components extends Record<string, Component> = Record<string, Component>> =
    BasePrinter<Tags, Components> & { [k in Tags[number]]: (...args: any[]) => Printer<Tags, Components>; };

const ExtraOptions = {
    componentSymbol: "$",
    allowSubstitutions: true,
    allowTextSubstitutions: false,
    namespaceValue: "",
    format: <string | ((p: Printer) => string)>"$namespace$date $time $tag $text",
    end: "\n",
    sep: " ",
    currentTag: null as TagOptions | null
};

enum LogLevel {
    log = "log",
    info = "info",
    warn = "warn",
    error = "error",
    debug = "debug"
}

type TagOptions = BaseComponentOptions & {
    assert?: boolean,
    textColor?: string,
    text: string,
    level?: LogLevel
};

const DefaultTagOptions = {
    level: LogLevel.log
} as const;

type AllOptions<Components extends Record<string, Component>> =
    { [k in keyof Components]: Components[k]["__TYPE__"] }
    & { [k in keyof typeof ExtraOptions]: typeof ExtraOptions[k] };

type HashedLoggerOptions = {
    format?: string | (() => string), folder?: string,
    radix?: number, divide?: number, fs?: any
};

type PeriodicLoggerOptions = {
    format?: string | (() => string), folder?: string,
    month?: "numeric" | "2-digit" | "long" | "short" | "narrow", day?: "long" | "short" | "narrow", fs?: any
};

const periodicLogger = {};

type BasicPrinter = Printer<["pass", "fail", "error", "warn", "info", "debug", "notice", "log", "assert", "ready"], {
    tag: typeof TagComponent,
    date: typeof DateComponent,
    time: typeof TimeComponent,
    uptime: typeof UptimeComponent,
    filename: typeof FileComponent,
    function: typeof FunctionComponent,
    line: typeof LineComponent,
    column: typeof ColumnComponent,
    namespace: typeof NamespaceComponent
}>;

const streamsLength = new Map<any, number>;

export class BasePrinter<Tags extends string[] = any[], Components extends Record<string, Component> = Record<string, Component>> {
    private defaultStream = (text: string, clean: string, level: LogLevel) => {
        if (isWeb) console[level](text);
        else {
            const out = globalVar.process[level === LogLevel.error ? "stderr" : "stdout"];
            const lineLength = streamsLength.get(out) || 0;
            const info = this.readInfo;
            if (info) {
                if (lineLength !== 0) out.write(`\r\x1b[1A\x1b[${lineLength}C`); // up(1), right(oldLineLength)
                else out.write(`\r${" ".repeat(info.question.length + info.text.length)}\r`); // clear
            }
            const lineIndex = text.lastIndexOf("\n");
            streamsLength.set(out, text.length - lineIndex - 1);
            out.write(text);
            if (info) {
                if (lineIndex !== text.length - 1) out.write("\n");
                out.write(info.question + info.text);
            }
        }
    };

    private tags: Record<string, TagOptions> = {};
    private components = {} as Components;
    private componentNames: string[] = []; // sorted so the longest component names are first
    private substitutions: Record<string, string | ((printer: Printer) => string)> = {};
    private parsed: (string | { name: string, comp: Component })[] = [];
    private parsedComponents = new Set<string>;
    private streams: Map<any, (s: string, clean: string, level: LogLevel, printer: Printer) => void> = new Map([[this.defaultStream, this.defaultStream]]);
    private _periodicOptions: PeriodicLoggerOptions;
    private _inline: Printer<Tags, Components>;
    private palette: Record<string, RGB> = {};
    private alreadyReading: Promise<string | null> = null;
    private readInfo: { question: string, cursor: number, text: string } | null = null;


    get inline() {
        if (this.options.end === "") return this as Printer<Tags, Components>;
        this._inline ??= this.create();
        this._inline.options.end = "";
        return this._inline;
    };

    get brackets() {
        return brackets as BasicPrinter;
    };

    options = {...ExtraOptions} as AllOptions<Components>;

    setOptions(value: { [k in keyof AllOptions<Components>]?: Partial<AllOptions<Components>[k]> }) {
        for (const key in value) if (this.components[key]) {
            const val = value[key];
            if (!val || typeof val !== "object") continue;
            Object.assign(this.options[key], val);
        } else (this.options as any)[key] = value[key];
        this.parse();
        return this as Printer<Tags, Components>;
    };

    getTags(): string[] {
        return Object.keys(this.tags);
    };

    getTag(name: string): TagOptions {
        if (!this.tags[name]) throw new Error(`Tag "${name}" does not exist.`);
        return this.tags[name];
    };

    hasTag(name: string): boolean {
        return name in this.tags;
    };

    getComponents(): string[] {
        return this.componentNames;
    };

    hasComponent<Name extends string>(name: Name): boolean {
        return this.componentNames.includes(name);
    };

    getComponent<Name extends keyof Components>(component: Name): Components[Name] {
        return this.components[component];
    };

    getComponentValue(name: keyof Components) {
        const component = this.getComponent(name);
        if (!component) throw new Error(`Component "${name.toString()}" does not exist.`);
        const opts = this.options[name];
        const st = opts as BaseComponentOptions;
        let text = component.get(opts, this as any);
        if (!text) return ["", ""];
        text = this.applySubstitutions(text);
        const cleaned = this.cleanSubstitutions(text);
        if (st.padding) text = " ".repeat(st.padding) + text + " ".repeat(st.padding);
        if (st.background) text = this.color(st.background, true) + text;
        if (st.color) text = this.color(st.background, true) + text;
        if (st.italic) text = styles.italic.open + text;
        if (st.underline) text = styles.underline.open + text;
        if (st.strikethrough) text = styles.strikethrough.open + text;
        if (st.bold) text = styles.bold.open + text;
        if (st.background || st.color || st.italic || st.underline || st.strikethrough || st.bold) text += styles.reset.open;
        return [text, cleaned];
    };

    private parse() {
        let format = this.options.format;
        if (typeof format === "function") format = this.format(this as any)[0];
        const symbol = this.options.componentSymbol;
        const parsed = this.parsed;
        parsed.length = 0;
        const comps = this.parsedComponents;
        comps.clear();
        const spl = format.split(symbol);
        if (spl[0]) parsed.push(spl[0]);
        const components = this.getComponents();
        for (let i = 1; i < spl.length; i++) {
            const sp = spl[i];
            if (sp.startsWith("text")) {
                parsed.push(null);
                parsed.push(sp.slice("text".length));
                continue;
            }
            let found = false;
            for (const name of components) {
                if (sp.startsWith(name)) {
                    comps.add(name);
                    parsed.push({name, comp: this.getComponent(name as never)});
                    parsed.push(sp.slice(name.length));
                    found = true;
                    break;
                }
            }
            if (!found) parsed.push(symbol + sp);
        }
    };

    applySubstitutions(text: string): string {
        if (!this.options.allowSubstitutions) return text;
        for (const name in this.substitutions) {
            const sub = this.substitutions[name]
            text = text.replaceAll(name, typeof sub === "string" ? sub : sub(this as any));
        }
        return text;
    };

    private cleanSubstitutions(text: string): string {
        if (!this.options.allowTextSubstitutions) return text;
        for (const name in this.substitutions) text = text.replaceAll(name, "");
        return text;
    };

    tag(name: Tags[number], ...args: any[]) {
        const tag = this.tags[name];
        this.options.currentTag = tag;
        if (tag.assert) {
            if (args.length === 0) throw new Error(`Tag "${name}" requires a message.`);
            if (args[0]) return;
            args.splice(0, 1);
            if (args.length === 0) args.push("Assertion failed.");
        }
        let result = this.format(...args)[0];
        const lines = result.split("\n");

        const isNormalText = tag.textColor && ((tag.level !== LogLevel.error && tag.level !== LogLevel.warn) || !isWeb);

        let result2 = "";
        let cleanResult2 = "";
        for (let i = 0; i < lines.length; i++) {
            const text = lines[i];
            for (let i = 0; i < this.parsed.length; i++) {
                const part = this.parsed[i];
                if (typeof part === "string") {
                    cleanResult2 += this.cleanSubstitutions(part);
                    result2 += this.applySubstitutions(part);
                } else if (!part) {
                    if (isNormalText) result2 += this.color(tag.textColor);
                    result2 += this.options.allowTextSubstitutions ? this.applySubstitutions(text) : text;
                    cleanResult2 += this.options.allowTextSubstitutions ? this.cleanSubstitutions(text) : text;
                    if (isNormalText) result2 += styles.reset.open;
                } else {
                    const [comp, cleanComp] = this.getComponentValue(part.name);
                    result2 += comp;
                    cleanResult2 += cleanComp;
                }
            }
            result2 += this.options.end;
            cleanResult2 += this.options.end;
        }

        this.write(result2, cleanResult2, tag.level || LogLevel.log);
    };

    private write(text: string, cleanText: string, level: LogLevel) {
        for (const fn of this.streams.values()) fn(text, cleanText, level, this as any);
    };

    addTag<Name extends string>(name: Name, options: TagOptions): Printer<[...Tags, Name], Components> {
        if (this.tags[name]) throw new Error(`Tag "${name}" already exists.`);
        this.tags[name] = {...DefaultTagOptions, ...options};
        // @ts-ignore
        this[name] = (...args: any[]) => this.tag(name, ...args);
        return this as any;
    };

    removeTag<Names extends Tags[number][]>(...names: Names): Printer<Exclude<Tags[number], Names[number]>[], Components> {
        for (const name of names) {
            if (typeof name !== "string") continue;
            if (!this.tags[name]) throw new Error(`Tag "${name}" does not exist.`);
            delete this.tags[name];
            delete (this as any)[name];
        }
        return this as any;
    };

    addComponent<Name extends string, Comp extends Component | (() => any)>(
        name: Name, component: Comp
    ): Printer<Tags, Components & { [k in Name]: Comp extends Component ? Comp : CallbackComponent }> {
        if (this.components[name]) throw new Error(`Component "${name}" already exists.`);
        if (component instanceof Function) component = new CallbackComponent(component) as any;
        (this.components as any)[name] = component;
        this.componentNames.push(name);
        this.componentNames.sort((a, b) => b.length - a.length);
        this.options[name] = {...(component as any).defaultOptions} as any;
        this.parse();
        return this as any;
    };

    removeComponent<Names extends (keyof Components)[]>(...name: Names): Printer<Tags, Omit<Components, Names[number]>> {
        for (const key of name) {
            if (typeof key !== "string" || !this.components[key]) continue;
            delete this.components[key];
            const index = this.componentNames.indexOf(key);
            if (index !== -1) this.componentNames.splice(index, 1);
            delete this.options[key];
        }
        this.parse();
        return this as any;
    };

    addSubstitution(name: string, style: string | ((printer: Printer) => string)): Printer<Tags, Components> {
        if (this.substitutions[name]) throw new Error(`Substitution "${name}" already exists.`);
        this.substitutions[name] = style;
        this.parse();
        return this as any;
    };

    removeSubstitution(name: string): Printer<Tags, Components> {
        if (!this.substitutions[name]) throw new Error(`Substitution "${name}" does not exist.`);
        delete this.substitutions[name];
        this.parse();
        return this as any;
    };

    addStyle(name: string, css: string | ((printer: Printer) => string)) {
        return this.addSubstitution(name, typeof css === "string" ? styles.reset.open + this.css(css) : (printer: Printer) => styles.reset.open + printer.css(css(printer)));
    };

    create() {
        const printer = new BasePrinter<Tags, Components>();
        for (const name of this.componentNames) printer.addComponent(name, this.components[name]);
        for (const tagName in this.tags) printer.addTag(tagName, this.tags[tagName]);
        for (const regex in this.substitutions) printer.addSubstitution(regex, this.substitutions[regex]);
        printer.setOptions(this.options as any);
        printer.usePalette(this.palette);
        return printer as Printer<Tags, Components>;
    };

    namespace(namespace: string): Printer<Tags, Components> {
        if (typeof namespace !== "string") throw new Error("Namespace must be a string.");
        const printer = this.create();
        printer.options.namespaceValue = namespace;
        return printer;
    };

    print(...stuff: any[]) {
        const [text, cleanText] = this.format(...stuff);
        this.write(text, cleanText, LogLevel.log);
        return this as Printer<Tags, Components>;
    };

    println(...stuff: any[]) {
        const [text, cleanText] = this.format(...stuff);
        this.write(text + "\n", cleanText + "\n", LogLevel.log);
        return this as Printer<Tags, Components>;
    };

    color(val: string | RGB, bg = false): string {
        if (!val) return "";
        const c = bg ? "bgColor" : "color";
        if (typeof val !== "string") return hasAnsi16mStdout ? styles[c].ansi16m(...val) : "";
        if (val.startsWith("#")) {
            return hasAnsi16mStdout ? styles[c].ansi16m(...styles.hexToRgb(val)) : "";
        }
        if (val.startsWith("rgb(") || val.startsWith("rgba(")) {
            const rgb = val.slice(val[3] === "a" ? 5 : 4, -1).split(",").map(Number);
            return hasAnsi16mStdout ? styles[c].ansi16m(rgb[0], rgb[1], rgb[2]) : "";
        }
        if (val.startsWith("hsl(") || val.startsWith("hsla(")) {
            const hsl = val.slice(val[3] === "a" ? 5 : 4, -1).split(",").map(Number);
            return hasAnsi16mStdout ? styles[c].ansi16m(...hslToRgb(hsl[0], hsl[1], hsl[2])) : "";
        }
        if (val.startsWith("hsv(") || val.startsWith("hsva(")) {
            const hsv = val.slice(val[3] === "a" ? 5 : 4, -1).split(",").map(Number);
            return hasAnsi16mStdout ? styles[c].ansi16m(...hsvToRgb(hsv[0], hsv[1], hsv[2])) : "";
        }
        if (val in this.palette && hasAnsi16mStdout) return this.color(this.palette[val], bg);
        if (foregroundColorNames.includes(val as any)) return styles[bg ? "bg" + val[0].toUpperCase() + val.slice(1) : val].open;
        if (val in colorNames) {
            const rgb = colorNames[val];
            if (hasAnsi16mStdout) return styles[c].ansi16m(rgb[0], rgb[1], rgb[2]);
        }
        return "";
    };

    css(css: string | Record<string, any>): string {
        if (typeof css === "string") css = parseCSS(css);
        let result = "";
        if (css.font && css.font.color) {
            result += this.color(css.font.color);
            if (css.font.style.italic) result += styles.italic.open;
            if (css.font.weight >= 600) result += styles.bold.open;
        }
        if (css.background && css.background.color) result += this.color(css.background.color, true);
        if (css.textDecoration && css.textDecoration.line.under) result += styles.underline.open;
        if (css.textDecoration && css.textDecoration.line.through) result += styles.strikethrough.open;
        return result;
    };

    format(...texts: any[]) {
        let result = "";
        let cleanResult = "";
        for (let i = 0; i < texts.length; i++) {
            const text = texts[i];
            if (typeof text !== "string") {
                const ins = this.inspect(text);
                result += ins;
                cleanResult += ins;
                continue;
            }
            if (i > 0) {
                result += this.options.sep;
                cleanResult += this.options.sep;
            }
            result += text.replaceAll(/%[cfdioOsv]/g, r => {
                if (i === texts.length - 1) {
                    cleanResult += r;
                    return r;
                }
                const k = r[1];
                i++;
                const val = texts[i];
                if (k === "c") return this.css(val);
                const v = this.inspect(val);
                cleanResult += v;
                return v;
            });
        }
        return [result, cleanResult];
    };

    inspect(value: any) {
        switch (typeof value) {
            case "number":
            case "boolean":
            case "string":
            case "symbol":
            case "undefined":
            case "bigint":
                return String(value);
            case "function":
                return `[Function: ${value.name || "anonymous"}]`;
            case "object":
                if (value === null) return "null";
                if (Array.isArray(value)) return `[ ${value.map(v => this.inspect(v)).join(", ")} ]`;
                if (value instanceof Set) return `Set(${value.size}) { ${[...value].map(v => this.inspect(v)).join(", ")} }`;
                if (value instanceof Map) return `Map(${value.size}) { ${[...value.entries()].map(([k, v]) => `${this.inspect(k)} => ${this.inspect(v)}`).join(", ")} }`;
                if (value instanceof Date) return `Date(${value.toISOString()})`;
                if (value instanceof RegExp) return `RegExp(${value.toString()})`;
                if (value instanceof Error) return value.stack;
                return `{ ${Object.entries(value).map(([k, v]) => `${k}: ${this.inspect(v)}`).join(", ")} }`;
        }
    };

    usePalette(palette: keyof typeof ColorPalettes | Record<string, RGB>) {
        if (typeof palette === "string") palette = ColorPalettes[palette];
        this.palette = {...palette};
        return this as Printer<Tags, Components>;
    };

    makeGlobal(name = "printer") {
        globalVar[name] = this;
        return this as Printer<Tags, Components>;
    };

    replaceConsole() {
        globalVar.console = this;
        return this as Printer<Tags, Components>;
    };

    addFile(filename: string, fs = req("fs")) {
        if (typeof filename !== "string") throw new Error("Filename must be a string.");
        if (this.streams.has(filename)) throw new Error(`File stream "${filename}" already exists.`);
        if (!fs) throw new Error("File stream requires 'fs' module.");
        this.streams.set(filename, (text: string) => fs.appendFileSync(filename, text, {encoding: "utf8"}));
        return this as Printer<Tags, Components>;
    };

    removeFile(filename: string) {
        if (typeof filename !== "string") throw new Error("Filename must be a string.");
        if (!this.streams.has(filename)) throw new Error(`File stream "${filename}" does not exist.`);
        this.streams.delete(filename);
        return this as Printer<Tags, Components>;
    };

    makeLoggerFile(options: PeriodicLoggerOptions = {}) {
        const chr = this.options.componentSymbol;
        options = {
            folder: "./logs",
            format: "log-" + chr + "DD-" + chr + "MM-" + chr + "YYYY.log",
            month: "long",
            day: "long", ...options
        };
        this._periodicOptions = options;
        if (this.streams.get(periodicLogger)) return;
        let currentFile = "";
        let currentStream = null;
        const fs = options.fs || req("fs");
        this.streams.set(periodicLogger, (_, cleanContent) => {
            const chr = this.options.componentSymbol;
            const chrLen = chr.length;
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
            const ls = {
                date: date.toLocaleString("en", {weekday: options.day}),
                month: date.toLocaleString("en", {month: options.month}),
                D: day, M: month, Y: year, h: hours, m: minutes, s: seconds, S: ms
            };
            let file = typeof options.format === "function" ? options.format() : options.format;

            file = file.replaceAll(new RegExp(`${chr.split("").map(i=>`\\${i}`)}(date|month|[DMYShms]+)`, "g"), str => {
                str = str.slice(chrLen);
                if (str === "date" || str === "month") return ls[str];
                const len = str.length;
                str = ls[str[0]].toString().padStart(len, "0");
                if (str.length > len) str = str.slice(str.length - len);
                return str;
            });

            let folder = options.folder;
            if (folder.endsWith("/") || folder.endsWith("\\")) folder = folder.slice(0, -1);
            file = folder + "/" + file;
            if (file !== currentFile) {
                if (currentStream) currentStream.close();
                fs.mkdirSync(folder + "/", {recursive: true});
                currentStream = fs.createWriteStream(file, {flags: "a"});
            }
            currentStream.write(cleanContent);
        });
        return this;
    };

    makeHashedLoggerFile(options: HashedLoggerOptions = {}) {
        const chr = this.options.componentSymbol;
        options = {folder: "./logs", radix: 16, divide: 3, format: "log-" + chr + "t.log", ...options};
        const fs = options.fs || req("fs");
        if (!fs.existsSync(options.folder)) fs.mkdirSync(options.folder);
        const format = typeof options.format === "function" ? options.format() : options.format;
        let folder = options.folder;
        if (folder.endsWith("/") || folder.endsWith("\\")) folder = folder.slice(0, -1);
        const file = folder + "/" + format.replaceAll(chr + "t", Math.floor(Date.now() / (10 ** options.divide)).toString(options.radix));
        this.addFile(file);
        return this;
    };

    backspace(count: number) {
        if (typeof count !== "number" || count < 0) throw new Error("Count must be a positive number.");
        const text = "\x1b[" + count + "D" + " ".repeat(count) + "\x1b[" + count + "C";
        this.write(text, "", LogLevel.log);
        return this as Printer<Tags, Components>;
    };

    cursorUp(count: number) {
        if (typeof count !== "number" || count < 0) throw new Error("Count must be a positive number.");
        const text = "\x1b[" + count + "A";
        this.write(text, "", LogLevel.log);
        return this as Printer<Tags, Components>;
    };

    cursorDown(count: number) {
        if (typeof count !== "number" || count < 0) throw new Error("Count must be a positive number.");
        const text = "\x1b[" + count + "B";
        this.write(text, "", LogLevel.log);
        return this as Printer<Tags, Components>;
    };

    cursorLeft(count: number) {
        if (typeof count !== "number" || count < 0) throw new Error("Count must be a positive number.");
        const text = "\x1b[" + count + "D";
        this.write(text, "", LogLevel.log);
        return this as Printer<Tags, Components>;
    };

    cursorRight(count: number) {
        if (typeof count !== "number" || count < 0) throw new Error("Count must be a positive number.");
        const text = "\x1b[" + count + "C";
        this.write(text, "", LogLevel.log);
        return this as Printer<Tags, Components>;
    };

    clear() {
        const text = "\x1b[2J\x1b[0;0H";
        this.write(text, "", LogLevel.log);
        return this as Printer<Tags, Components>;
    };

    addDefaultStream() {
        this.streams.set(this.defaultStream, this.defaultStream);
        return this as Printer<Tags, Components>;
    };

    removeDefaultStream() {
        this.streams.delete(this.defaultStream);
        return this as Printer<Tags, Components>;
    };

    removeAllSubstitutions() {
        this.substitutions = {};
        this.parse();
        return this as Printer<Tags, Components>;
    };

    addDefaultSubstitutions(character = "&") {
        const baseStyles = {
            0: "color: #000000",
            1: "color: #0000AA",
            2: "color: #00AA00",
            3: "color: #00AAAA",
            4: "color: #AA0000",
            5: "color: #AA00AA",
            6: "color: #FFAA00",
            7: "color: #AAAAAA",
            8: "color: #555555",
            9: "color: #5555FF",
            a: "color: #55FF55",
            b: "color: #55FFFF",
            c: "color: #FF5555",
            d: "color: #FF55FF",
            e: "color: #FFFF55",
            f: "color: #FFFFFF",
            l: "font-weight: bold",
            m: "text-decoration: line-through",
            n: "text-decoration: underline",
            o: "font-style: italic",
            r: "",
            t: (p: Printer) => "color: " + p.options.currentTag.textColor
        };

        for (const k in baseStyles) this.addStyle(character + k, baseStyles[k]);
        return this as Printer<Tags, Components>;
    };

    get isReading() {
        return !!this.alreadyReading;
    };

    async readline(question: string | (() => string) = "", {
        history = [], allowClear = false, stdin = process.stdin, stdout = process.stdout
    }: { history?: string[], allowClear?: boolean, stdin?: any, stdout?: any } = {}): Promise<string | null> {
        await this.alreadyReading;
        stdin.setRawMode(true);
        stdin.resume();

        if (typeof question === "function") question = question();

        const info = this.readInfo = {
            question,
            cursor: 0,
            text: ""
        };

        let lastText = "";
        let historyIndex = history.length;

        const lineLength = streamsLength.get(stdout) || 0;
        if (lineLength !== 0) stdout.write(`\n${question}`);
        else stdout.write(question);

        let runFn: (buf: Buffer) => void;

        this.alreadyReading = new Promise(r => {
            stdin.on("data", run);

            runFn = run;

            function run(buf: Buffer) {
                if (buf[0] == 0x7f) {
                    // ctrl backspace
                    if (info.cursor === 0) return;
                    const index = info.text.lastIndexOf(" ", info.cursor - 1);
                    if (index === -1) {
                        const rest = info.text.slice(info.cursor);
                        stdout.write(`\r${question}${rest}${" ".repeat(info.text.length - rest.length)}\x1b[${info.text.length}D`);
                        info.text = rest;
                        info.cursor = 0;
                    } else {
                        const text = info.text.slice(0, index) + info.text.slice(info.cursor);
                        stdout.write(`\r${question}${text}${" ".repeat(info.text.length - text.length)}\x1b[${info.text.length - index}D`);
                        info.text = text;
                        info.cursor = index;
                    }
                    return;
                }
                let str = buf.toString();
                switch (str) {
                    case "\x03":
                    case "\x04":
                        r(null);
                        break;
                    case "\x1b[A": // up
                    case "\x1b[B": { // down
                        if (str === "\x1b[A") {
                            if (historyIndex === 0) return;
                            historyIndex--;
                        } else {
                            if (historyIndex === history.length) return;
                            historyIndex++;
                        }
                        const current = historyIndex === history.length ? lastText : history[historyIndex];
                        const erase = info.text.length - current.length;
                        stdout.write(`\r${question}${current}${erase > 0 ? " ".repeat(erase) + "\b".repeat(erase) : ""}`);
                        info.text = current;
                        info.cursor = info.text.length;
                        break;
                    }
                    case "\x1b[C": // right
                        if (info.cursor >= info.text.length) return;
                        info.cursor++;
                        stdout.write(`\x1b[1C`);
                        break;
                    case "\x1b[D": // left
                        if (info.cursor === 0) return;
                        info.cursor--;
                        stdout.write(`\x1b[1D`);
                        break;
                    case "\x1b[1~": // home
                        info.cursor = 0;
                        info.text = "";
                        stdout.write(`\r${question}`);
                        break;
                    case "\x1b[2~": // insert
                        break;
                    case "\x1b[1;5D": // ctrl + left
                        if (info.cursor === 0) return;
                        const index = info.text.lastIndexOf(" ", info.cursor - 1);
                        if (index === -1) {
                            stdout.write(`\x1b[${info.cursor}D`);
                            info.cursor = 0;
                        } else {
                            stdout.write(`\x1b[${info.cursor - index}D`);
                            info.cursor = index;
                        }
                        break;
                    case "\x1b[1;5C": // ctrl + right
                        if (info.cursor >= info.text.length) return;
                        const nextIndex = info.text.indexOf(" ", info.cursor + 1);
                        if (nextIndex === -1) {
                            stdout.write(`\x1b[${info.text.length - info.cursor}C`);
                            info.cursor = info.text.length;
                        } else {
                            stdout.write(`\x1b[${nextIndex - info.cursor}C`);
                            info.cursor = nextIndex;
                        }
                        break;
                    case "\x1b[1;2D": // shift + left
                        break;
                    case "\x1b[1;2C": // shift + right
                        break;
                    case "\x1b[1;2A": // shift + up
                        break;
                    case "\x1b[1;2B": // shift + down
                        break;
                    case "\x1b[3~": { // delete
                        if (info.cursor >= info.text.length) return;
                        const rest = info.text.slice(info.cursor + 1);
                        info.text = info.text.slice(0, info.cursor) + rest;
                        stdout.write(`${rest} ${"\b".repeat(rest.length + 1)}`);
                        if (historyIndex === history.length) lastText = info.text;
                        break;
                    }
                    case "\x1b[3;5~": // ctrl + delete
                        if (info.cursor >= info.text.length) return;
                        const nextSpace = info.text.indexOf(" ", info.cursor + 1);
                        if (nextSpace === -1) {
                            const c = info.text.length - info.cursor;
                            stdout.write(`${" ".repeat(c)}\x1b[${c}D`);
                            info.text = info.text.slice(0, info.cursor);
                            info.cursor = info.text.length;
                        } else {
                            const rest = info.text.slice(nextSpace + 1);
                            const c = nextSpace - info.cursor + 1;
                            stdout.write(`${rest}${" ".repeat(c)}\x1b[${c + rest.length}D`);
                            info.text = info.text.slice(0, info.cursor) + rest;
                        }
                        break;
                    case "\b": { // backspace
                        if (info.cursor === 0) return;
                        const rest = info.text.slice(info.cursor);
                        info.text = info.text.slice(0, info.cursor - 1) + rest;
                        info.cursor--;
                        stdout.write(`\b${rest} ${"\b".repeat(rest.length + 1)}`);
                        if (historyIndex === history.length) lastText = info.text;
                        break;
                    }
                    case "\f": // CTRL + L
                        if (allowClear) {
                            stdout.write("\x1b[2J\x1b[0;0H");
                            stdout.write(`${question}${info.text}${"\b".repeat(info.text.length - info.cursor)}`);
                        }
                        break;
                    case "\n":
                    case "\r":
                        r(info.text);
                        const lineLength = streamsLength.get(stdout) || 0;
                        if (lineLength !== 0) {
                            stdout.write(`\x1b[1A\x1b[${lineLength - info.cursor}C`); // move the cursor where it belongs
                        } else stdout.write("\n");
                        break;
                    default:
                        /*if (buf.length !== 1 || buf[0] < 32 || buf[0] > 126) {
                            console.log(buf); for debug
                            return;
                        }*/
                        if (str === "\t") str = "  ";
                        if (info.cursor === info.text.length) {
                            info.text += str;
                            info.cursor += str.length;
                            stdout.write(str);
                        } else {
                            const rest = info.text.slice(info.cursor);
                            info.text = info.text.slice(0, info.cursor) + str + rest;
                            info.cursor += str.length;
                            stdout.write(`${str}${rest} ${"\b".repeat(rest.length + 1)}`);
                        }
                        if (historyIndex === history.length) lastText = info.text;
                        break;
                }
            }
        });
        const response = await this.alreadyReading;
        this.alreadyReading = null;
        this.readInfo = null;

        stdin.removeListener("data", runFn);
        stdin.setRawMode(false);
        stdin.pause();

        return response as string | null;
    };
}

export const printer = (new BasePrinter() as Printer<[], {}>)
    .addTag("pass", {text: "PASS", background: "greenBright", textColor: "greenBright"})
    .addTag("fail", {text: "FAIL", background: "redBright", textColor: "redBright", level: LogLevel.error})
    .addTag("error", {text: "ERR!", background: "red", textColor: "red", level: LogLevel.error})
    .addTag("warn", {text: "WARN", background: "yellow", textColor: "yellow", level: LogLevel.warn})
    .addTag("info", {text: "INFO", background: "blue", textColor: "blue", level: LogLevel.info})
    .addTag("debug", {text: "DEBUG", background: "gray", textColor: "gray", level: LogLevel.debug})
    .addTag("notice", {text: "NOTICE", background: "cyan", textColor: "cyan"})
    .addTag("log", {text: "LOG", background: "white", textColor: "white"})
    .addTag("ready", {text: "READY", background: "magenta", textColor: "magenta"})
    .addTag("assert", {text: "ASSERT", background: "gray", textColor: "gray", assert: true})
    .addComponent("tag", TagComponent)
    .addComponent("date", DateComponent)
    .addComponent("time", TimeComponent)
    .addComponent("uptime", UptimeComponent)
    .addComponent("filename", FileComponent)
    .addComponent("function", FunctionComponent)
    .addComponent("line", LineComponent)
    .addComponent("column", ColumnComponent)
    .addComponent("namespace", NamespaceComponent)
    .usePalette("JetBrains")
    .addDefaultSubstitutions() as BasicPrinter;

const brackets = printer.create().setOptions({
    tag: {bold: true, padding: 0, color: "", background: ""},
    date: {background: "", padding: 0},
    time: {background: "", padding: 0},
    namespace: {
        padding: 0,
        color: "",
        background: "",
        after: "&t] | ",
        before: "["
    },
    format: "&t$namespace&t[$date&t] | [&t$time&t] [&t$tag&t] > $text"
}).usePalette({});

for (const tag of brackets.getTags()) {
    brackets.getTag(tag).background = "";
    brackets.getTag(tag).padding = 0;
}

globalVar.Printer = printer;

declare global {
    let Printer: typeof printer;
}

export default printer;