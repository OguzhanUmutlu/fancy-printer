import Component from "../component";
import {getStack} from "../utils";

export default new class FunctionComponent extends Component {
    defaultOptions = {};

    get() {
        return getStack()[3]?.getFunctionName();
    };
}