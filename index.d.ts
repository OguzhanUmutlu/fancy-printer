// noinspection JSUnusedGlobalSymbols

import * as tty from "node:tty";

type Color = "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white" | "blackBright" | "gray"
    | "grey" | "redBright" | "greenBright" | "yellowBright" | "blueBright" | "magentaBright" | "cyanBright"
    | "whiteBright" | "transparent" | "default" | "none" | "" | `#${string}`;
type BackgroundColor = Color;

type LogOptions = {
    format?: string,
    substitutionsEnabled?: boolean,
    componentsEnabled?: boolean,
    newLine?: boolean,
    namespace?: string,
    stylingEnabled?: boolean,
    stdout?: StandardOutput | null,
    stdin?: StandardInput | null,
    htmlOut?: Element | ((html: string) => void) | null,
    alwaysRGB?: boolean,
    paletteName?: string,
    disabledTags?: string[],

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
    groupBackgroundColor?: Color,

    namespaceColor?: string,
    namespaceBackgroundColor?: string,
    namespaceBold?: boolean,
    namespaceItalic?: boolean,
    namespaceUnderline?: boolean,
    namespaceStrikethrough?: boolean,
    namespacePadding?: number,

    filenameColor?: string,
    filenameBackgroundColor?: string,
    filenameBold?: boolean,
    filenameItalic?: boolean,
    filenameUnderline?: boolean,
    filenameStrikethrough?: boolean,
    filenamePadding?: number,
    filenameBase?: boolean,

    lineColor?: string,
    lineBackgroundColor?: string,
    lineBold?: boolean,
    lineItalic?: boolean,
    lineUnderline?: boolean,
    lineStrikethrough?: boolean,
    linePadding?: number,

    columnColor?: string,
    columnBackgroundColor?: string,
    columnBold?: boolean,
    columnItalic?: boolean,
    columnUnderline?: boolean,
    columnStrikethrough?: boolean,
    columnPadding?: number,

    stackColor?: string,
    stackBackgroundColor?: string,
    stackBold?: boolean,
    stackItalic?: boolean,
    stackUnderline?: boolean,
    stackStrikethrough?: boolean,
    stackPadding?: number,
    stackBase?: boolean,

    readonly tag?: string
} | Record<any, any>;
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
    padding?: number,
    ending?: boolean,
    alwaysRGB?: boolean
};
type LoggerOptions = {
    folder?: string, radix?: number, divide?: number, format?: string
};
type PeriodicLoggerOptions = {
    folder?: string, format?: string, month?: "numeric" | "2-digit" | "long" | "short" | "narrow",
    day?: "long" | "short" | "narrow"
};
type TagComponent = {
    text: string | (() => string),
    color: Color | (() => Color),
    backgroundColor: Color | (() => Color),
    textColor: Color | (() => Color)
};
type TagName = "pass" | "fail" | "error" | "warn" | "info" | "debug" | "notice" | "log" | "ready" | string;
type SubstitutionFunction = (text: string, responses: { Cancel: {}, Color: { value: string } }) => string | Object;
type ReadOptions<T> = {
    onKey?: (key: string) => void | Function | any,
    onBackspace?: () => void | Function | any,
    onArrow?: (key: "up" | "down" | "right" | "left", text: string) => void | Function | any,
    onTermination?: () => void | Function | any,
    timeout?: number | -1,
    expectPromise: T
} | Record<any, any>;
type Styles = {
    font: {
        color: Color,
        style: {
            italic: boolean
        },
        weight: number
    },
    background: {
        color: Color
    },
    textDecoration: {
        //color: Color,
        line: {
            under: boolean,
            //over: boolean,
            through: boolean
        }
    },
    padding: number,
    //margin: number,
};
type ListSelectionOptions = {
    selectedColor: string,
    selectedBackgroundColor: string,
    selectedPadding: number,
    selectedBold: boolean,
    selectedItalic: boolean,
    selectedUnderline: boolean,
    selectedStrikethrough: boolean,
    normalColor: string,
    normalBackgroundColor: string,
    normalPadding: number,
    normalBold: boolean,
    normalItalic: boolean,
    normalUnderline: boolean,
    normalStrikethrough: boolean
};
type ReadResponse<T> = {
    promise: Promise<T>,
    end: () => void
};
type StandardOutput = tty.WriteStream & { fd: 1 };
type StandardInput = tty.ReadStream & { fd: 0 };

type ColorPalette = {
    black: [number, number, number],
    red: [number, number, number],
    green: [number, number, number],
    yellow: [number, number, number],
    blue: [number, number, number],
    magenta: [number, number, number],
    cyan: [number, number, number],
    white: [number, number, number],
    blackBright: [number, number, number],
    redBright: [number, number, number],
    greenBright: [number, number, number],
    yellowBright: [number, number, number],
    blueBright: [number, number, number],
    magentaBright: [number, number, number],
    cyanBright: [number, number, number],
    whiteBright: [number, number, number]
};

type WebPalette = {
    black: [string, string | null, string | null],
    red: [string, string | null, string | null],
    green: [string, string | null, string | null],
    yellow: [string, string | null, string | null],
    blue: [string, string | null, string | null],
    magenta: [string, string | null, string | null],
    cyan: [string, string | null, string | null],
    white: [string, string | null, string | null],
    blackBright: [string, string | null, string | null],
    redBright: [string, string | null, string | null],
    greenBright: [string, string | null, string | null],
    yellowBright: [string, string | null, string | null],
    blueBright: [string, string | null, string | null],
    magentaBright: [string, string | null, string | null],
    cyanBright: [string, string | null, string | null],
    whiteBright: [string, string | null, string | null]
};

declare class FancyPrinter {
    static DEFAULT_OPTIONS?: LogOptions;
    static DEFAULT_COLOR_PALETTES?: Record<string, ColorPalette>;
    static DEFAULT_WEB_PALETTES?: Record<string, WebPalette>;

    static DEFAULT_OUTPUTS: Record<string, (self: FancyPrinter) => { write: (text: string) => void }> | {
        terminal: () => StandardOutput
        web: () => { write: (text: string) => void }
        html: () => { write: (text: string) => void }
    };

    static static: FancyPrinter;
    static raw: FancyPrinter;
    static brackets: FancyPrinter;
    static inline: FancyPrinter;
    static html: FancyPrinter;
    static: FancyPrinter;
    raw: FancyPrinter;
    brackets: FancyPrinter;
    inline: FancyPrinter;
    html: FancyPrinter;

    stdout: StandardOutput;
    stdin: StandardInput;
    Printer: typeof FancyPrinter;
    tags: Record<string, TagComponent> | {
        pass: TagComponent,
        fail: TagComponent,
        error: TagComponent,
        warn: TagComponent,
        info: TagComponent,
        debug: TagComponent,
        notice: TagComponent,
        log: TagComponent,
        assert: TagComponent,
        ready: TagComponent
    } | Record<any, any>;
    options: LogOptions;
    components: Record<string, ComponentFunction> | {
        date: ComponentFunction,
        tag: ComponentFunction
    };
    substitutions: Record<string, SubstitutionFunction>;

    constructor(options: LogOptions);
    constructor();

    static paint(text: string, options: PaintOptions): string;
    static paint(text: string): string;

    static stringify(any: any): string;

    static color(text: string, color: Color, alwaysRGB: boolean): string;
    static color(text: string, color: Color): string;

    static background(text: string, color: Color, alwaysRGB: boolean): string;
    static background(text: string, color: Color): string;

    static setDefault(got, default_): void;

    static makeGlobal(console: boolean): void;
    static makeGlobal(): void;

    static new(options: LogOptions): FancyPrinter;
    static new(): FancyPrinter;

    static create(options: LogOptions): FancyPrinter;
    static create(): FancyPrinter;

    makeGlobal(console: boolean): FancyPrinter;
    makeGlobal(): FancyPrinter;

    new(options: LogOptions): FancyPrinter;
    new(): FancyPrinter;

    create(options: LogOptions): FancyPrinter;
    create(): FancyPrinter;

    addFile(file: string): FancyPrinter;

    removeFile(file: string): FancyPrinter;

    makeLoggerFile(options: PeriodicLoggerOptions): FancyPrinter;
    makeLoggerFile(): FancyPrinter;

    makeHashedLoggerFile(options: LoggerOptions): FancyPrinter;
    makeHashedLoggerFile(): FancyPrinter;

    addComponent(name: string, callback: ComponentFunction): FancyPrinter;

    removeComponent(name: string): FancyPrinter;

    getComponents(): Record<string, ComponentFunction>;

    getComponent(name: string): ComponentFunction;

    addSubstitution(key: string, callback: SubstitutionFunction): FancyPrinter;

    removeSubstitution(key: string): FancyPrinter;

    getSubstitution(key: string): SubstitutionFunction;

    getSubstitutions(): Record<string, SubstitutionFunction>;

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

    ready(...any: any[]): FancyPrinter;

    clear(): FancyPrinter;

    table(object: any, columns: string[] | null, tagName: TagName): FancyPrinter;
    table(object: any, columns: string[] | null): FancyPrinter;
    table(object: any): FancyPrinter;

    assert(assertion: boolean, ...any: any[]): FancyPrinter;

    time(name: string): FancyPrinter;
    time(): FancyPrinter;

    timeGet(name: string): number;
    timeGet(): number;

    timeLog(name: string, fixed: number): FancyPrinter;
    timeLog(name: string): FancyPrinter;
    timeLog(): FancyPrinter;

    timeEnd(name: string, fixed: number): FancyPrinter;
    timeEnd(name: string): FancyPrinter;
    timeEnd(): FancyPrinter;

    count(name: string): FancyPrinter;
    count(): FancyPrinter;

    countGet(name: string): number;
    countGet(): number;

    countReset(name: string): FancyPrinter;
    countReset(): FancyPrinter;

    group(): FancyPrinter;

    groupEnd(): FancyPrinter;

    getGroup(): number;

    updateOptions(options: LogOptions): FancyPrinter;

    print(text: string): FancyPrinter;

    printLine(text: string): FancyPrinter;

    println(text: string): FancyPrinter;

    backspace(amount: number): FancyPrinter;
    backspace(): FancyPrinter;

    substitute(...any: any[]): string;

    static substitute(substitutions: Record<string, SubstitutionFunction>, chr: string, ...any: any[]): string;

    readLine(stringify: true, trim: boolean): Promise<string>;
    readLine(stringify: false, trim: boolean): Promise<Buffer>;
    readLine(stringify: true): Promise<string>;
    readLine(stringify: false): Promise<Buffer>;
    readLine(): Promise<string>;

    readKey(stringify: true, trim: boolean): Promise<string>;
    readKey(stringify: false, trim: boolean): Promise<Buffer>;
    readKey(stringify: true): Promise<string>;
    readKey(stringify: false): Promise<Buffer>;
    readKey(): Promise<string>;

    readCustom(options: ReadOptions<boolean>): ReadResponse<string>;
    readCustom(): ReadResponse<string>;

    readPassword(options: ReadOptions<true> & { character: string }): Promise<string>;
    readPassword(options: ReadOptions<false> & { character: string }): ReadResponse<string>;
    readPassword(): Promise<string>;

    readSelection(list: string[], options: ReadOptions<true>): Promise<number>;
    readSelection(list: string[], options: ReadOptions<false>): ReadResponse<number>;
    readSelection(list: string[]): Promise<number>;

    readSelectionListed(list: string[], options: ReadOptions<true> & ListSelectionOptions): Promise<number>;
    readSelectionListed(list: string[], options: ReadOptions<false> & ListSelectionOptions): ReadResponse<number>;
    readSelectionListed(list: string[]): Promise<number>;

    static parseCSS(text: string): Object;

    static cleanCSS(object: Object): Styles;

    static applyCSS(styles: Styles): string;

    static css(text: string): string;

    parseCSS(text: string): Object;

    cleanCSS(object: Object): Styles;

    applyCSS(styles: Styles): string;

    css(text: string): string;

    setOptions(options: LogOptions): FancyPrinter;

    namespace(namespace: string): FancyPrinter;

    updateBodyStyle(element: Element): void;
    updateBodyStyle(): void;

    static makeWebPalette(palette: ColorPalette): WebPalette;

    static colorTag(options: LogOptions): string;

    static backgroundColorTag(options: LogOptions): string;
}

declare global {
    let printer: FancyPrinter;
    // @ts-ignore
    let console: FancyPrinter;
}

type pkg = FancyPrinter;
export = pkg;