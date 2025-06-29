import Component from "../component";
import {getStack} from "../utils";

interface FilenameComponentOptions {
    base?: string;
    basename?: boolean;
    extension?: boolean;
}

export default new class FilenameComponent extends Component<FilenameComponentOptions> {
    defaultOptions = {basename: true, extension: true, color: "red", bold: true};

    get(options: FilenameComponentOptions) {
        let filepath = getStack()[3]?.getFileName();
        if (options.base && filepath.startsWith(options.base)) filepath = filepath.slice(options.base.length);
        if (options.basename) filepath = filepath.split(/[/\\]/).at(-1) || "";
        filepath ||= "??.js";
        if (!options.extension) {
            const extIndex = filepath.lastIndexOf(".");
            if (extIndex !== -1) {
                filepath = filepath.slice(0, extIndex);
            }
        }
        return filepath;
    };
}