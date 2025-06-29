import Component from "../component";

interface UptimeOptions {
    day?: boolean;
    dayLength?: number;
    hour?: boolean;
    hourLength?: number;
    minute?: boolean;
    minuteLength?: number;
    second?: boolean;
    secondLength?: number;
    millisecond?: boolean;
    millisecondLength?: number;
}

export default new class UptimeComponent extends Component<UptimeOptions> {
    defaultOptions = {
        day: false,
        hour: true,
        minute: true,
        second: true,
        millisecond: true,
        millisecondLength: 2,
        background: "cyan",
        bold: true,
        padding: 1
    };

    get(options: UptimeOptions) {
        const timeFast: [string, number][] = [["day", 1000 * 60 * 60 * 24], ["hour", 1000 * 60 * 60], ["minute", 1000 * 60], ["second", 1000], ["millisecond", 1]];
        let time = performance.now();
        let text = "";
        for (let i = 0; i < timeFast.length; i++) {
            const [opt, k] = timeFast[i];
            const value = Math.floor(time / k);
            time -= value * k;
            if (options[opt]) {
                const padding = options[opt + "Length"] ?? 2;
                text += value.toString().padStart(padding, "0").substring(0, padding) + (i == timeFast.length - 1 ? "" : opt === "second" ? "." : ":");
            }
        }
        return text;
    };
}