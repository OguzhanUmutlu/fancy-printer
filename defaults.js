const fnCheck = (s, ...args) => typeof s === "function" ? s(...args) : s;
const cH = (opts, name, c) => fnCheck(opts[name + c]);
const componentHelper = (name, opts) => ({
    color: cH(opts, name, "Color"),
    backgroundColor: cH(opts, name, "BackgroundColor"),
    padding: cH(opts, name, "Padding"),
    bold: cH(opts, name, "Bold"),
    italic: cH(opts, name, "Italic"),
    underline: cH(opts, name, "Underline"),
    strikethrough: cH(opts, name, "Strikethrough")
});

/*** @param {Printer | any} instance */
module.exports = instance => {
    instance._periodicOptions = null;
    instance.stdin = process.stdin || process.openStdin();
    instance.stdout = process.stdout;
    instance.tags = {
        pass: {text: "PASS", backgroundColor: "greenBright", textColor: "green"},
        fail: {text: "FAIL", backgroundColor: "redBright", textColor: "redBright"},
        error: {text: "ERR!", backgroundColor: "red", textColor: "red"},
        warn: {text: "WARN", backgroundColor: "yellow", textColor: "yellow"},
        info: {text: "INFO", backgroundColor: "blueBright", textColor: "blue"},
        debug: {text: "DEBUG", backgroundColor: "gray", textColor: "gray"},
        notice: {text: "NOTICE", backgroundColor: "cyanBright", textColor: "cyan"},
        log: {text: "LOG", backgroundColor: "gray", textColor: "white"},
        assert: {text: "ASSERT", backgroundColor: "white", color: "black", textColor: "gray"}
    };
    instance.streams = new Map;
    instance.chr = "%";
    instance.components = {};
    instance.substitutions = {};
    instance._times = {};
    instance._counts = {};
    instance._group = 0;
    const Printer = instance.Printer;

    /// COMPONENTS ///

    instance.addComponent("date", opts => {
        const date = new Date;
        const rs = date.toLocaleString("en", {month: "short", day: "numeric"});
        return {result: Printer.paint(rs, componentHelper("date", opts)), plain: rs};
    });
    instance.addComponent("tag", opts => {
        const tag = instance.tags[opts.tag || ""] || instance.tags[(opts.tag || "").toLowerCase()] || instance.tags.log;
        opts.defaultColor = /*opts.defaultColor || */tag.textColor;
        const txt = typeof tag.text === "function" ? tag.text() : tag.text;
        const gotOpts = componentHelper("tag", opts);
        return {
            result: Printer.paint(txt, {
                ...gotOpts,
                color: fnCheck(tag.color) || gotOpts.color,
                backgroundColor: fnCheck(tag.backgroundColor)
            }), plain: txt
        };
    });
    instance.addComponent("time", opts => {
        const date = new Date;
        const l = [["Date", "getDate"], ["Hour", "getDate"], ["Minute", "getMinutes"], ["Second", "getSeconds"], ["Millisecond", "getMilliseconds", opts.timeMillisecondLength],];
        let text = "";
        for (let i = 0; i < l.length; i++) {
            const k = l[i];
            if (opts["time" + k[0]]) text += date[k[1]]().toString().padStart(k[2] || 2, "0").substring(0, k[2] || 2) + (k[0] === "Second" ? "." : ":");
        }
        text = text.substring(0, text.length - 1);
        return {
            result: Printer.paint(text, componentHelper("time", opts)), plain: text
        };
    });

    /// SUBSTITUTIONS ///

    instance.addSubstitution("v", s => Printer.stringify(s));
    const objectSub = (s, {Cancel}) => {
        const type = typeof s;
        if (type !== "object" && type !== "function") return Cancel;
        return Printer.stringify(s);
    };
    instance.addSubstitution("o", objectSub);
    instance.addSubstitution("O", objectSub);
    instance.addSubstitution("s", (s, {Cancel}) => {
        if (typeof s !== "string") return Cancel;
        return s;
    });
    instance.addSubstitution("j", (s, {Cancel}) => {
        if (typeof s !== "object" || s.constructor !== Object) return Cancel;
        try {
            return JSON.stringify(s);
        } catch (e) {
            return Cancel;
        }
    });
    instance.addSubstitution("d", (s, Cancel) => {
        if (typeof s !== "number") return Cancel;
        return ((Math.sign(s) * Math.floor(Math.abs(s)))).toString();
    });
    instance.addSubstitution("f", (s, Cancel) => {
        if (typeof s !== "number") return Cancel;
        return s.toString();
    });
    instance.addSubstitution("c", (s, {Cancel, Color}) => {
        if (typeof s !== "string") return Cancel;
        Color.value = printer.css(s);
        return Color;
    });
};

// FUTURE CSS:
// [ ] background and its longhand equivalents
// [ ] border and its longhand equivalents
// [ ] outline and its longhand equivalents
// [ ] text-* properties such as text-transform
// [ ] font and its longhand equivalents
// [ ] box-decoration-break
// [ ] writing-mode
// [ ] clear and float
// [ ] box-shadow
// [ ] line-height
// [ ] word-spacing and word-break
// [ ] white-space
// [ ] margin
// [ ] display
// [ ] cursor
// [ ] border-radius