import Component from "../component";
import {getStack} from "../utils";

export default new class LineComponent extends Component {
    defaultOptions = {color: "red", bold: true};

    get() {
        const stack = getStack()[3];
        return (stack.getLineNumber() ?? stack.getEnclosingLineNumber() ?? "??").toString();
    };
}