import Component from "../component";

interface TimeOptions {
    hour12?: boolean

    date?: boolean
    hour?: boolean
    hourLength?: number
    minute?: boolean
    minuteLength?: boolean
    second?: boolean
    secondLength?: number
    millisecond?: boolean
    millisecondLength?: number
}

export default new class TimeComponent extends Component<TimeOptions> {
    defaultOptions = {hour: true, minute: true, second: true, background: "blue", bold: true, padding: 1};

    get(options: TimeOptions) {
        const date = new Date;
        const timeFast = [["date", "getDate"], ["hour", "getHours"], ["minute", "getMinutes"], ["second", "getSeconds"], ["millisecond", "getMilliseconds"]];
        let text = "";
        for (let i = 0, k = 0; i < timeFast.length; i++) {
            const [opt, fn] = timeFast[i];
            if (options[opt]) {
                let value = date[fn]();
                if (opt === "hour" && options.hour12 && value > 12) value -= 12;
                const length = options[opt + "Length"] ?? 2;
                text += (k > 0 ? (opt === "millisecond" ? "." : ":") : "") + value.toString().padStart(length, "0").substring(0, length);
                k++;
            }
        }
        if (options.hour12) text += " " + (date.getHours() > 12 ? "PM" : "AM");
        return text;
    };
}