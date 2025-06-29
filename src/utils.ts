export function cleanText(str: string) {
    return str.replaceAll(/\x1b\[\d+(;\d+)*m/g, "");
}

export function getStack() {
    const oldLimit = Error.stackTraceLimit;
    Error.stackTraceLimit = Infinity;
    const orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function (_, stack) {
        return stack;
    };
    const err = new Error;
    // noinspection JSAnnotator
    Error.captureStackTrace(err, arguments.callee);
    const stack = [...err.stack] as unknown as NodeJS.CallSite[];
    Error.prepareStackTrace = orig;
    Error.stackTraceLimit = oldLimit;
    return stack;
}

export type RGB = [red: number, green: number, blue: number];

export function hslToRgb(h: number, s: number, l: number): RGB {
    h /= 360;
    s /= 100;
    l /= 100;
    if (s === 0) {
        const val = l * 255;
        return [val, val, val];
    }
    let t2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const t1 = 2 * l - t2;
    const rgb = [0, 0, 0];
    for (let i = 0; i < 3; i++) {
        let t3 = h + 1 / 3 * (1 - i);
        if (t3 < 0) t3++;
        if (t3 > 1) t3--;
        let val: number;
        if (6 * t3 < 1) val = t1 + (t2 - t1) * 6 * t3;
        else if (2 * t3 < 1) val = t2;
        else if (3 * t3 < 2) val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
        else val = t1;
        rgb[i] = val * 255;
    }
    return rgb as RGB;
}

export function hsvToRgb(h: number, s: number, v: number): RGB {
    h /= 60;
    s /= 100;
    v /= 100;
    const i = Math.floor(h) % 6;
    const f = h - Math.floor(h);
    const p = 255 * v * (1 - s);
    const q = 255 * v * (1 - (s * f));
    const t = 255 * v * (1 - (s * (1 - f)));
    v *= 255;
    return [
        [v, t, p],
        [q, v, p],
        [p, v, t],
        [p, q, v],
        [t, p, v],
        [v, p, q]
    ][i] as RGB;
}

export function parseCSS(css: string) {
    const opts = {};
    const spl = css.split(";");
    for (let i = 0; i < spl.length; i++) {
        const part = spl[i].trim().split(":");
        if (part.length < 2) continue;
        opts[part[0].trim()] = part.slice(1).join(":").trim();
    }
    const styles = {
        font: {
            color: "",
            style: {
                italic: false
            },
            weight: <number | string>100
        },
        background: {
            color: ""
        },
        textDecoration: {
            //color: "",
            line: {
                under: false,
                //over: false,
                through: false
            }
        },
        padding: 0,
        //margin: 0,
    };
    styles.font.color = opts["color"] || opts["font-color"] || opts["fontColor"] || "";
    styles.background.color = opts["background"] || opts["background-color"] || opts["backgroundColor"] || "";
    styles.font.weight = opts["font-weight"] || opts["fontWeight"];
    if (styles.font.weight === "bold" || styles.font.weight === "bolder") styles.font.weight = 600;
    else if (typeof styles.font.weight !== "number") styles.font.weight = 100;
    const fontStyle = opts["font-style"] || opts["fontStyle"] || "";
    styles.font.style.italic = fontStyle.includes("italic") || fontStyle.includes("oblique");
    const textDecoration = opts["text-decoration"] || opts["textDecoration"] || "";
    styles.textDecoration.line.under =
        textDecoration.includes("underline") ||
        textDecoration.includes("under");
    styles.textDecoration.line.through =
        textDecoration.includes("strikethrough") ||
        textDecoration.includes("strike-through") ||
        textDecoration.includes("linethrough") ||
        textDecoration.includes("line-through");
    styles.padding = opts["padding"];
    if (typeof styles.padding !== "number" || styles.padding < 0) styles.padding = 0;
    return styles;
}

export const ColorPalettes = {
    JetBrains: {
        black: [0, 0, 0],
        red: [119, 46, 44],
        green: [57, 81, 31],
        yellow: [92, 79, 23],
        blue: [36, 89, 128],
        magenta: [92, 64, 105],
        cyan: [21, 79, 79],
        white: [97, 97, 97],
        blackBright: [66, 66, 66],
        redBright: [184, 36, 33],
        greenBright: [69, 133, 0],
        yellowBright: [168, 123, 0],
        blueBright: [23, 120, 189],
        magentaBright: [178, 71, 178],
        cyanBright: [0, 150, 150],
        whiteBright: [255, 255, 255]
    } as Record<string, RGB>
} as const;