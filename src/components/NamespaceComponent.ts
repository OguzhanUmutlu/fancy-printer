import Component from "../component";
import {Printer} from "../printer";

export default new class NamespaceComponent extends Component<{ before?: string, after?: string }> {
    defaultOptions = {background: "magenta", bold: true, padding: 0, before: "", after: " "};

    get(opts: { before: string, after: string }, printer: Printer) {
        const ns = printer.options.namespaceValue;
        return ns ? opts.before + ns + opts.after : "";
    };
}