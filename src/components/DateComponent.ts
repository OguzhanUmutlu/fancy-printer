import Component from "../component";

export default new class DateComponent extends Component<Intl.DateTimeFormatOptions> {
    defaultOptions = {month: "short", day: "numeric", background: "blueBright", bold: true, padding: 1} as const;

    get(options: Intl.DateTimeFormatOptions) {
        return new Date().toLocaleString("en", options);
    };
}