// noinspection JSUnusedGlobalSymbols

type Color = string;//todo
type BackgroundColor = string;
type LogOptions = {
    format?: string,

    defaultColor?: Color,
    defaultBackgroundColor?: Color,

    tagColor?: Color,

    dateColor?: Color,
    dateBackgroundColor?: Color,
    dateBold?: boolean,
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
    }
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
type TagName = "pass" | "fail" | "error" | "warn" | "info" | "debug" | "log" | string;

export default class FancyPrinter {
    static static: FancyPrinter;

    static DEFAULT_options?: LogOptions;

    tags: Record<string, TagComponent> | {
        pass: { text: "PASS", backgroundColor: "greenBright", textColor: "green" },
        fail: { text: "FAIL", backgroundColor: "redBright", textColor: "redBright" },
        error: { text: "ERR!", backgroundColor: "red", textColor: "red" },
        warn: { text: "WARN", backgroundColor: "greenBright", textColor: "green" },
        info: { text: "INFO", backgroundColor: "blueBright", textColor: "blue" },
        debug: { text: "DBG~", backgroundColor: "gray", textColor: "gray" },
        log: { text: "LOG~", backgroundColor: "gray", textColor: "white" },
    };

    static paint(text: string, options?: PaintOptions): string;

    static stringify(any: any): string;

    static color(text: string, color: Color): string;

    static background(text: string, color: Color): string;

    static setDefault(got, default_): void;

    static makeGlobal(console?: boolean): void;

    options: LogOptions;

    components: Record<string, ComponentFunction> | {
        date: ComponentFunction,
        tag: ComponentFunction
    };

    constructor(options?: LogOptions);

    addComponent(name: string, callback: ComponentFunction): void;

    removeComponent(name: string): void;

    getComponents(): Record<string, ComponentFunction>;

    getComponent(name: string): ComponentFunction;

    addTag(key: string, text: string, color: Color, backgroundColor: BackgroundColor, textColor: Color): void;

    removeTag(key): void;

    getTags(): Record<string, TagComponent>

    getTag(key): TagComponent;

    setFormat(format): void;

    getFormat(): string;

    log(text: string, options?: LogOptions): void;

    tag(tag: TagName, text: string, options?: LogOptions): void;

    pass(text: string, options?: LogOptions): void;

    fail(text: string, options?: LogOptions): void;

    error(text: string, options?: LogOptions): void;

    err(text: string, options?: LogOptions): void;

    warning(text: string, options?: LogOptions): void;

    warn(text: string, options?: LogOptions): void;

    inform(text: string, options?: LogOptions): void;

    info(text: string, options?: LogOptions): void;

    debug(text: string, options?: LogOptions): void;
}