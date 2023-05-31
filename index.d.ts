// noinspection JSUnusedGlobalSymbols

import * as tty from "node:tty";

type Color = "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white" | "blackBright" | "gray"
    | "grey" | "redBright" | "greenBright" | "yellowBright" | "blueBright" | "magentaBright" | "cyanBright"
    | "whiteBright" | "transparent" | "default" | "none" | "" | `#${string}`;
type BackgroundColor = Color;

type LogOptions = {
    format?: string,
    substitutions?: boolean,
    newLine?: boolean,

    defaultColor?: Color,
    defaultBackgroundColor?: Color,

    tagColor?: Color,
    tagBold?: boolean,
    tagItalic?: boolean,
    tagUnderline?: boolean,
    tagStrikethrough?: boolean,
    tagPadding?: number,

    dateColor?: Color,
    dateBackgroundColor?: Color,
    dateBold?: boolean,
    dateItalic?: boolean,
    dateUnderline?: boolean,
    dateStrikethrough?: boolean,
    datePadding?: number,
    dateOptions?: {
        localeMatcher?: "best fit" | "lookup" | undefined;
        weekday?: "long" | "short" | "narrow" | undefined;
        era?: "long" | "short" | "narrow" | undefined;
        year?: "numeric" | "2-digit" | undefined;
        month?: "numeric" | "2-digit" | "long" | "short" | "narrow" | undefined;
        day?: "numeric" | "2-digit" | undefined;
        hour?: "numeric" | "2-digit" | undefined;
        minute?: "numeric" | "2-digit" | undefined;
        second?: "numeric" | "2-digit" | undefined;
        timeZoneName?: "short" | "long" | "shortOffset" | "longOffset" | "shortGeneric" | "longGeneric" | undefined;
        formatMatcher?: "best fit" | "basic" | undefined;
        hour12?: boolean | undefined;
        timeZone?: string | undefined;
    },

    timeColor?: string,
    timeBackgroundColor?: Color,
    timeBold?: boolean,
    timeItalic?: boolean,
    timeUnderline?: boolean,
    timeStrikethrough?: boolean,
    timePadding?: number,
    timeDate?: boolean,
    timeHour?: boolean,
    timeMinute?: boolean,
    timeSecond?: boolean,
    timeMillisecond?: boolean,
    timeMillisecondLength?: number,

    groupColor?: Color,
    groupBackgroundColor?: Color
};
type ComponentFunction = (options?: LogOptions) => ({
    result: any,
    plain: any
} | string | number);
type PaintOptions = {
    color?: Color,
    backgroundColor?: Color,
    bold?: boolean,
    italic?: boolean,
    underline?: boolean,
    strikethrough?: boolean,
    padding?: number
};
type LoggerOptions = {
    folder?: string, radix?: number, divide?: number, format?: string
};
type PeriodicLoggerOptions = {
    folder?: string, format?: string
};
type TagComponent = {
    text: string | (() => string),
    color: Color | (() => Color),
    backgroundColor: Color | (() => Color),
    textColor: Color | (() => Color)
};
type TagName = "pass" | "fail" | "error" | "warn" | "info" | "debug" | "notice" | "log" | string;
type SubstitutionFunction = (text: string, match: string) => string;
type Substitution = { regex: string | RegExp, run: SubstitutionFunction };
type ReadOptions = {
    onKey?: (key: string) => void,
    onBackspace?: () => void,
    onArrow?: (key: "up" | "down" | "right" | "left", text: string) => void,
    onTermination?: () => void
};

declare class FancyPrinter {
    static static: FancyPrinter;
    static DEFAULT_options?: LogOptions;
    stdout: tty.WriteStream & { fd: 1 };
    Printer: typeof FancyPrinter;
    tags: Record<string, TagComponent> | {
        pass: { text: "PASS", backgroundColor: "greenBright", textColor: "green" },
        fail: { text: "FAIL", backgroundColor: "redBright", textColor: "redBright" },
        error: { text: "ERR!", backgroundColor: "red", textColor: "red" },
        warn: { text: "WARN", backgroundColor: "yellow", textColor: "yellow" },
        info: { text: "INFO", backgroundColor: "blueBright", textColor: "blue" },
        debug: { text: "DEBUG", backgroundColor: "gray", textColor: "gray" },
        notice: { text: "NOTICE", backgroundColor: "cyanBright", textColor: "cyan" },
        log: { text: "LOG", backgroundColor: "gray", textColor: "white" },
        assert: { text: "ASSERT", backgroundColor: "white", color: "black", textColor: "gray" }
    };
    options: LogOptions;
    components: Record<string, ComponentFunction> | {
        date: ComponentFunction,
        tag: ComponentFunction
    };
    substitutions: Substitution[];

    constructor(options?: LogOptions);

    static paint(text: string, options?: PaintOptions): string;

    static stringify(any: any): string;

    static color(text: string, color: Color): string;

    static background(text: string, color: Color): string;

    static setDefault(got, default_): void;

    static makeGlobal(console?: boolean): void;

    static new(options?: LogOptions): FancyPrinter;

    static create(options?: LogOptions): FancyPrinter;

    makeGlobal(console?: boolean): FancyPrinter;

    new(options?: LogOptions): FancyPrinter;

    create(options?: LogOptions): FancyPrinter;

    addFile(file: string): FancyPrinter;

    removeFile(file: string): FancyPrinter;

    makeLoggerFile(options?: PeriodicLoggerOptions): FancyPrinter;

    makeHashedLoggerFile(options?: LoggerOptions): FancyPrinter;

    addComponent(name: string, callback: ComponentFunction): FancyPrinter;

    removeComponent(name: string): FancyPrinter;

    getComponents(): Record<string, ComponentFunction>;

    getComponent(name: string): ComponentFunction;

    addSubstitution(regex: string | RegExp, callback: SubstitutionFunction): FancyPrinter;

    removeSubstitution(substitution: Substitution): FancyPrinter;

    getSubstitutions(): Substitution[];

    addTag(key: string, text: string, color: Color, backgroundColor: BackgroundColor, textColor: Color): FancyPrinter;

    removeTag(key: string): FancyPrinter;

    getTags(): Record<string, TagComponent>

    getTag(key: string): TagComponent;

    setFormat(format: string): FancyPrinter;

    getFormat(): string;

    setCharacter(character: string): FancyPrinter;

    getCharacter(): string;

    log(...any: any[]): FancyPrinter;

    tag(tag: TagName, ...any: any[]): FancyPrinter;

    pass(...any: any[]): FancyPrinter;

    fail(...any: any[]): FancyPrinter;

    error(...any: any[]): FancyPrinter;

    err(...any: any[]): FancyPrinter;

    warning(...any: any[]): FancyPrinter;

    warn(...any: any[]): FancyPrinter;

    inform(...any: any[]): FancyPrinter;

    info(...any: any[]): FancyPrinter;

    debug(...any: any[]): FancyPrinter;

    notice(...any: any[]): FancyPrinter;

    clear(): FancyPrinter;

    table(object, columns?: string[] | null, tagName?: TagName): FancyPrinter;

    assert(assertion: boolean, ...any: any[]): FancyPrinter;

    time(name?: string): FancyPrinter;

    timeGet(name?: string): number;

    timeLog(name?: string, fixed?: number): FancyPrinter;

    timeEnd(name?: string, fixed?: number): FancyPrinter;

    count(name?: string): FancyPrinter;

    countGet(name?: string): number;

    countReset(name?: string): FancyPrinter;

    group(): FancyPrinter;

    groupEnd(): FancyPrinter;

    getGroup(): number;

    updateOptions(options: LogOptions): FancyPrinter;

    print(text: string): FancyPrinter;

    printLine(text: string): FancyPrinter;

    println(text: string): FancyPrinter;

    backspace(): FancyPrinter;

    substitute(...any: any[]): FancyPrinter;

    static substitute(substitutions?: Substitution[], chr?: string, ...any: any[]): FancyPrinter;

    readLine(stringify?: boolean, trim?: boolean): Promise<string>;

    readKey(stringify?: boolean, trim?: boolean): Promise<string>;

    readCustom(options?: ReadOptions): Promise<string>;

    readPassword(options?: ReadOptions & {character?: string}): Promise<string>;

    readSelection(list: string[], options?: ReadOptions): Promise<string>;
}

declare global {
    let printer: FancyPrinter;
    // @ts-ignore
    let console: FancyPrinter;
}

type pkg = FancyPrinter;
export = pkg;