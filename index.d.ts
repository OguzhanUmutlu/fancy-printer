// noinspection JSUnusedGlobalSymbols

type Color =
    "black"
    | "red"
    | "green"
    | "yellow"
    | "blue"
    | "magenta"
    | "cyan"
    | "white"
    | "blackBright"
    | "gray"
    | "grey"
    | "redBright"
    | "greenBright"
    | "yellowBright"
    | "blueBright"
    | "magentaBright"
    | "cyanBright"
    | "whiteBright"
    | "transparent"
    | "default"
    | "none"
    | ""
    | `#${string}`;
type BackgroundColor = Color;

type LogOptions = {
    format?: string,

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
    timeMillisecondLength?: number
};
type ComponentFunction = (options?: LogOptions) => any;
type PaintOptions = {
    color?: Color,
    backgroundColor?: Color,
    bold?: boolean,
    italic?: boolean,
    underline?: boolean,
    strikethrough?: boolean,
    padding?: number
};
type TagComponent = { text: string, backgroundColor: Color, textColor: Color };
type TagName = "pass" | "fail" | "error" | "warn" | "info" | "debug" | "notice" | "log" | string;

declare class FancyPrinter {
    class: typeof FancyPrinter;
    static static: FancyPrinter;

    static DEFAULT_options?: LogOptions;

    tags: Record<string, TagComponent> | {
        pass: { text: "PASS", backgroundColor: "greenBright", textColor: "green" },
        fail: { text: "FAIL", backgroundColor: "redBright", textColor: "redBright" },
        error: { text: "ERR!", backgroundColor: "red", textColor: "red" },
        warn: { text: "WARN", backgroundColor: "greenBright", textColor: "green" },
        info: { text: "INFO", backgroundColor: "blueBright", textColor: "blue" },
        debug: { text: "DEBUG", backgroundColor: "gray", textColor: "gray" },
        notice: { text: "NOTICE", backgroundColor: "purpleBright", textColor: "purple" },
        log: { text: "LOG", backgroundColor: "gray", textColor: "white" }
    };

    static paint(text: string, options?: PaintOptions): string;

    static stringify(any: any): string;

    static color(text: string, color: Color): string;

    static background(text: string, color: Color): string;

    static setDefault(got, default_): FancyPrinter;

    static makeGlobal(console?: boolean): FancyPrinter;

    static new(options?: LogOptions): FancyPrinter;

    static create(options?: LogOptions): FancyPrinter;

    new(options?: LogOptions): FancyPrinter;

    create(options?: LogOptions): FancyPrinter;

    options: LogOptions;

    components: Record<string, ComponentFunction> | {
        date: ComponentFunction,
        tag: ComponentFunction
    };

    constructor(options?: LogOptions);

    addComponent(name: string, callback: ComponentFunction): FancyPrinter;

    removeComponent(name: string): FancyPrinter;

    getComponents(): Record<string, ComponentFunction>;

    getComponent(name: string): ComponentFunction;

    addTag(key: string, text: string, color: Color, backgroundColor: BackgroundColor, textColor: Color): FancyPrinter;

    removeTag(key): FancyPrinter;

    getTags(): Record<string, TagComponent>

    getTag(key): TagComponent;

    setFormat(format): FancyPrinter;

    getFormat(): string;

    setCharacter(character): FancyPrinter;

    getCharacter(): string;

    log(text: string, options?: LogOptions): FancyPrinter;

    tag(tag: TagName, text: string, options?: LogOptions): FancyPrinter;

    pass(text: string, options?: LogOptions): FancyPrinter;

    fail(text: string, options?: LogOptions): FancyPrinter;

    error(text: string, options?: LogOptions): FancyPrinter;

    err(text: string, options?: LogOptions): FancyPrinter;

    warning(text: string, options?: LogOptions): FancyPrinter;

    warn(text: string, options?: LogOptions): FancyPrinter;

    inform(text: string, options?: LogOptions): FancyPrinter;

    info(text: string, options?: LogOptions): FancyPrinter;

    debug(text: string, options?: LogOptions): FancyPrinter;

    notice(text: string, options?: LogOptions): FancyPrinter;
}

type pkg = FancyPrinter;
export = pkg;