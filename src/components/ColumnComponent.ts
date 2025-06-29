import Component from "../component";
import {getStack} from "../utils";

export default new class ColumnComponent extends Component {
    defaultOptions = {color: "red", bold: true};

    get() {
        const stack = getStack()[3];
        return (stack.getColumnNumber() ?? stack.getEnclosingColumnNumber() ?? "??").toString();
    };
}