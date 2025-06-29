import Component from "../component";
import {Printer} from "../printer";

export default class CallbackComponent extends Component {
    defaultOptions = {};

    constructor(private callback: () => any) {
        super();
    };

    get(_: {}, printer: Printer) {
        return printer.inspect(this.callback());
    };
}