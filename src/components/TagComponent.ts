import Component, {BaseComponentOptions} from "../component";
import {Printer} from "../printer";

export default new class TagComponent extends Component {
    defaultOptions = {padding: 2, bold: true};

    get(opts: BaseComponentOptions, p: Printer) {
        const tag = p.options.currentTag;
        if (!tag) return "??";
        opts.padding = tag.padding ?? 2;
        opts.background = tag.background;
        opts.color = tag.color || tag.textColor;
        opts.bold = tag.bold ?? true;
        opts.italic = tag.italic;
        opts.underline = tag.underline;
        opts.strikethrough = tag.strikethrough;
        return tag.text;
    };
}