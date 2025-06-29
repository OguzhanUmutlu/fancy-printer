import {Printer} from "./printer";

export type BaseComponentOptions = {
    color?: string,
    background?: string,
    bold?: boolean,
    italic?: boolean,
    underline?: boolean,
    strikethrough?: boolean,
    padding?: number
};

export default abstract class Component<DefaultOptions extends object = {}> {
    __TYPE__: DefaultOptions & BaseComponentOptions;
    abstract defaultOptions: DefaultOptions & BaseComponentOptions;

    abstract get(options: DefaultOptions, printer: Printer): string;
}