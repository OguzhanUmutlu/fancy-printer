# 🌟 Fancy Printer 🌟

A fancy logger with a lot of customizations and blazingly fast speed!

[![](https://img.shields.io/badge/Discord-black?style=for-the-badge&logo=discord)](https://discord.gg/emAhrw3mvM)
[![npm](https://img.shields.io/npm/v/fancy-printer.svg?style=for-the-badge)](https://www.npmjs.com/package/fancy-printer)

## [🤩 Don't forget to star the project on GitHub! 🤩](https://github.com/OguzhanUmutlu/fancy-printer)

## 🌟 Table Of Contents 🌟

<!-- TOC -->
* [🌟 Fancy Printer 🌟](#-fancy-printer-)
  * [🤩 Don't forget to star the project on GitHub! 🤩](#-dont-forget-to-star-the-project-on-github--)
  * [🌟 Table Of Contents 🌟](#-table-of-contents-)
* [📩 Installation 📩](#-installation-)
  * [✨ Fanciness continues on Web ✨](#-fanciness-continues-on-web-)
* [🔧 Usage 🔧](#-usage-)
  * [✨ Creating a printer ✨](#-creating-a-printer-)
  * [✨ Default tags ✨](#-default-tags-)
  * [✨ Creating tags ✨](#-creating-tags-)
  * [✨ Formatting & Using/adding components & Changing the chr ✨](#-formatting--usingadding-components--changing-the-chr-)
  * [✨ Making the printer global ✨](#-making-the-printer-global-)
  * [✨ Logging to a specific file ✨](#-logging-to-a-specific-file-)
  * [✨ Logging to a file *periodically* ✨](#-logging-to-a-file-periodically-)
    * [✨ Formatting arguments ✨](#-formatting-arguments-)
    * [✨ Padding on formatting arguments ✨](#-padding-on-formatting-arguments-)
  * [✨ Logging to a file with a *hash* ✨](#-logging-to-a-file-with-a-hash-)
  * [✨ Substitutions ✨](#-substitutions-)
    * [✨ %o, %O, %s, %v ✨](#-o-o-s-v-)
    * [✨ %d, %i ✨](#-d-i-)
    * [✨ %f ✨](#-f-)
    * [✨ %c ✨](#-c-)
  * [✨ Utilities ✨](#-utilities-)
  * [✨ Fast Styling ✨](#-fast-styling-)
  * [✨ Presets ✨](#-presets-)
    * [✨ Inline Preset ✨](#-inline-preset-)
    * [✨ Brackets Preset ✨](#-brackets-preset-)
  * [✨ Logging Options ✨](#-logging-options-)
    * [✨ Component-specific options: ✨](#-component-specific-options-)
<!-- TOC -->

***

# 📩 Installation 📩

```shell
npm install fancy-printer
```

***

## ✨ Fanciness continues on Web ✨

```html

<script src="./node_modules/fancy-printer/index.js"></script>

<script>
    printer.log("Hello, world!");
</script>
```

- Note: Web doesn't have features like logging to a file because it is not possible.

***

# 🔧 Usage 🔧

## ✨ Creating a printer ✨

```js
const printer = require("fancy-printer");

const options = {
    // some options...
};
const newPrinter = printer.create(options);
newPrinter.log("Hello, world!");
// OR just use it normally
printer.log("Hello, world!");
```

***

## ✨ Default tags ✨

```js
printer.pass("Passed!");
printer.fail("Failed!");
printer.error("An error occurred!");
printer.warn("Something might go wrong!");
printer.info("This is a message!");
printer.debug("Check the line 5!");
printer.notice("Attention please!");
printer.log("An original log!");
printer.ready("I am ready!");
printer.assert(5 % 2 === 0, "5 is not divisible by 2!");

printer.tag("pass", "This worked as well!");
```

![](https://raw.githubusercontent.com/OguzhanUmutlu/fancy-printer/main/screenshots/img.png)

***

## ✨ Creating tags ✨

```js
printer = printer.addTag("test", {text: "HEY!", background: "#bb7373", textColor: "#ffff00"});
printer.test("Hello, world!");
```

![](https://raw.githubusercontent.com/OguzhanUmutlu/fancy-printer/main/screenshots/img_1.png)

***

## ✨ Formatting & Using/adding components & Changing the chr ✨

```js
const DEFAULT_FORMAT = "$namespace$date $time $tag $text"; // this is the default format
printer.options.namespaceValue = "My namespace"
// OR
const newPrinter = printer.namespace("My new namespace!");

printer.options.namespaceValue = "";
printer.options.format = "$date $time $tag $text";
printer.info("Hello, world!");
printer.options.format = "$date $time $tag > $text";
printer.info("Hello, world!");
printer.options.format = "$date $time $tag $2plus2 $text";
printer.addComponent("2plus2", () => {
    return 2 + 2;
});
printer.info("Hello, world!");

printer.options.componentSymbol = "!";
printer.options.format = "!date !time !tag !2plus2 !text";
printer.info("Hello, world!");

printer.options.format = "!filename&c:!line&c:!column or just [ !filename:!line:!column ] !date !time !tag !2plus2 !text";
printer.info("Hello, world!");
```

![](https://raw.githubusercontent.com/OguzhanUmutlu/fancy-printer/main/screenshots/img_2.png)

***

## ✨ Making the printer global ✨

```ts
const myPrinter = printer.create()
    .addTag("test") // do more stuff if needed, or just use the default

declare global {
    let printer: typeof myPrinter;
}
myPrinter.makeGlobal();

// some file where printer isn't imported:
printer.info("test");

declare global {
    // @ts-ignore
    let console: typeof myPrinter;
}
printer.replaceConsole();

// Now you can use the static printer from `console`
console.info("test");
```

***

## ✨ Logging to a specific file ✨

```js
printer.addFile("./myFile.txt");
```

***

## ✨ Logging to a file *periodically* ✨

```js
printer.makeLoggerFile();
// which makes a "logs" folder and puts a unique file in it to log into
// OPTIONAL:
printer.makeLoggerFile({
    folder: "./myFolder/", // Default: logs. This is where the log files will be saved in.
    format: "my log $DD-$MM-$YYYY.txt", // Default: log-DD-MM-YYYY.log. The format of the name of the file.
    month: "long", // the type of the $month, expects: "numeric" | "2-digit" | "long" | "short" | "narrow"
    day: "long", // the type of the $date variable, expects: "long" | "short" | "narrow"
});
```

### ✨ Formatting arguments ✨

- **Y:** Year
- **M:** Month
- **D**: Day
- **h**: Hour
- **m**: Minute
- **s**: Second
- **S**: Millisecond
- **month** Gives the name of the month
- **day** Gives the name of the day

### ✨ Padding on formatting arguments ✨

The length of the argument determines how long it should be.

For example if it's `DD` and if the day is 4, it becomes 04.

If it's `YY` and if the year is 2023, it becomes 23. (so it cuts from the end)

***

## ✨ Logging to a file with a *hash* ✨

```js
printer.makeHashedLoggerFile();
// which makes a "logs" folder and puts a unique file in it to log into
// OPTIONAL:
printer.makeHashedLoggerFile({
    folder: "./myFolder/", // Default: logs. This is where the log files will be saved in.
    radix: 16, // default 16, max 32. This is the time encoder setting
    divide: 3, // Default: 3. Divides the current timestamp into 10^divide. For example 3 would divide it to 1000 which makes it depend on seconds.
    format: "my log $t.txt" // Default: log-$t.log. The format of the name of the file. $t will be replaced by the time
});
```

***

## ✨ Substitutions ✨

### ✨ %o, %O, %s, %v ✨

Puts the object into place by making it a string.

Note: %o and %O only works on objects. %s only works on strings. %v works on everything.

```js
printer.log("Hello, %s!", "world");
```

![](https://raw.githubusercontent.com/OguzhanUmutlu/fancy-printer/main/screenshots/img_4.png)

### ✨ %d, %i ✨

Puts the integer into place.

```js
printer.log("Hello, %d!", 12.34);
printer.log("Hello, %i!", 12.34);
```

![](https://raw.githubusercontent.com/OguzhanUmutlu/fancy-printer/main/screenshots/img_5.png)

### ✨ %f ✨

Puts the floating number into place.

```js
printer.log("Hello, %f!", 12.34);
```

![](https://raw.githubusercontent.com/OguzhanUmutlu/fancy-printer/main/screenshots/img_6.png)

### ✨ %c ✨

Adds styling to the rest of the text. Uses CSS syntax.

```js
printer.log("Hello, %cthis is red!%c and now it's blue!", "color: red", "color: blue");
```

![](https://raw.githubusercontent.com/OguzhanUmutlu/fancy-printer/main/screenshots/img_7.png)

| Property                       | Default | Expected type                                                               | Description                                                                     |
|--------------------------------|---------|-----------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| background or background-color | None    | Color                                                                       | The background color of the text                                                |
| color                          | None    | Color                                                                       | The color of the text                                                           |
| font-weight                    | normal  | normal \| bold \| bolder \| A positive integer                              | The boldness of the text                                                        |
| text-decoration                | none    | underline \| line-through \| linethrough \| strike-through \| strikethrough | The decorations of the text. More than one can be used by separating with space |
| font-style                     | normal  | normal \| italic \| oblique                                                 | The style of the text.                                                          |

***

## ✨ Utilities ✨

```js
printer.print("Hello, world!%c RED!", "color: red"); // No substitutions or text components will be used and won't break line.

printer.println("Hello, world!"); // Same as print, will break line.

printer.print("Hello! You!")
printer.backspace(5); // Erases 5 characters from the text written.
printer.cursorUp(5); // Moves 5 up.
printer.cursorRight(5); // Moves 5 right
printer.cursorDown(5); // Moves 5 down
printer.cursorLeft(5); // Moves 5 left

printer.clear(); // Clears the console (it's not included in the screenshot)
```

![](https://raw.githubusercontent.com/OguzhanUmutlu/fancy-printer/main/screenshots/img_9.png)

## ✨ Fast Styling ✨

- NOTE: This feature is disabled by default! This first line will enable it:

```js
printer.options.allowTextSubstitutions = true; // allows the input to use substitutions

printer.info(
    "&0This is black",
    "&1This is blue",
    "&2This is green",
    "&3This is cyan",
    "&4This is red",
    "&5This is purple",
    "&6This is gold",
    "&7This is gray",
    "&8This is bold gray",
    "&9This is light blue",
    "&aThis is light green",
    "&bThis is cyan",
    "&cThis is light red",
    "&dThis is pink",
    "&eThis is yellow",
    "&fThis is white",
    "&lThis is bold",
    "&mThis is strike-through",
    "&nThis is underlined",
    "&oThis is italic",
    "&rThis will reset the styling",
    "&tBack to the 'info' tag's text color"
);

printer.addStyle("&h", "color: red; background: yellow");
// OR
printer.addSubstitution("&h", printer.css("color: red; background: yellow"));

printer.info("my own styling starts &hnow! yay!");
```

![](https://raw.githubusercontent.com/OguzhanUmutlu/fancy-printer/main/screenshots/img_14.png)

***

## ✨ Presets ✨

### ✨ Inline Preset ✨

This preset basically stops putting a line break at the end of logs.

Can be achieved by doing `printer.options.end = ""` or just using the existing preset:

```js
inline.inline.log("Hello, ");
inline.inline.print("world!");
```

![](https://raw.githubusercontent.com/OguzhanUmutlu/fancy-printer/main/screenshots/img_10.png)

### ✨ Brackets Preset ✨

This preset is a custom preset requested by a user.

Can be achieved by using the preset:

```js
const {brackets} = printer;

brackets.pass("Passed!");
brackets.fail("Failed!");
brackets.error("An error occurred!");
brackets.warn("Something might go wrong!");
brackets.info("This is a message!");
brackets.debug("Check the line 5!");
brackets.notice("Attention please!");
brackets.log("An original log!");
brackets.ready("I am ready!");
brackets.assert(5 % 2 === 0, "5 is not divisible by 2!");
```

![](https://raw.githubusercontent.com/OguzhanUmutlu/fancy-printer/main/screenshots/img_12.png)

***

## ✨ Logging Options ✨

Base options:

| Key                    | Default                            | Expected type | Description                                         |
|------------------------|------------------------------------|---------------|-----------------------------------------------------|
| format                 | "$namespace$date $time $tag $text" | string        | The format of the log.                              |
| componentSymbol        | "$"                                | string        | The symbol used to access components in the format. |
| namespaceValue         | ""                                 | string        | The value of the namespace component.               |
| allowSubstitutions     | true                               | boolean       | Whether to allow substitutions in the format.       |
| allowTextSubstitutions | false                              | boolean       | Whether to allow substitutions in the text.         |
| end                    | "\n"                               | string        | The ending character of the log.                    |
| sep                    | " "                                | string        | The separator between given texts.                  |

Default components: `pass`, `fail`, `error`, `warn`, `info`, `debug`, `notice`, `log`, `ready`, `assert`.

Every component has these options:

| Key           | Default | Expected type | Description                                    |
|---------------|---------|---------------|------------------------------------------------|
| color         | ""      | Color(string) | The text color of the component                |
| background    | ""      | Color(string) | The background color of the component          |
| bold          | true    | boolean       | Whether the component is bold or not           |
| italic        | false   | boolean       | Whether the component is italic or not         |
| underline     | false   | boolean       | Whether the component is underlined or not     |
| strikethrough | false   | boolean       | Whether the component is struck-through or not |
| padding       | 2       | number        | The padding of the component                   |

Which can be accessed like so:

```ts
printer.options.pass.italic = true;
// OR
printer.setOptions({
    pass: {
        italic: true
    }
});
```

### ✨ Component-specific options: ✨

| Key                      | Default    | Expected type                                                                         | Description                                                         |
|--------------------------|------------|---------------------------------------------------------------------------------------|---------------------------------------------------------------------|
| date.localeMatcher       | "best fit" | "best fit" or "lookup"                                                                | The locale matcher for the date component                           |
| date.weekday             | "long"     | "long" or "short" or "narrow"                                                         | The weekday type for the date component                             |
| date.era                 | "long"     | "long" or "short" or "narrow"                                                         | The era type for the date component                                 |
| date.year                | "numeric"  | "numeric" or "2-digit"                                                                | The year type for the date component                                |
| date.month               | "short"    | "numeric" or "2-digit" or "long" or "short" or "narrow"                               | The month type for the date component                               |
| date.day                 | "numeric"  | "numeric" or "2-digit"                                                                | The day type for the date component                                 |
| date.hour                | undefined  | "numeric" or "2-digit"                                                                | The hour type for the date component                                |
| date.minute              | undefined  | "numeric" or "2-digit"                                                                | The minute type for the date component                              |
| date.second              | undefined  | "numeric" or "2-digit"                                                                | The second type for the date component                              |
| date.timeZoneName        | undefined  | "short" or "long" or "shortOffset" or "longOffset" or "shortGeneric" or "longGeneric" | The time zone name type for the date component                      |
| date.formatMatcher       | undefined  | "best fit" or "basic"                                                                 | The format matcher for the date component                           |
| date.hour12              | undefined  | boolean                                                                               | Whether the date component should use 12-hour format or not         |
| date.timeZone            | undefined  | string                                                                                | The time zone for the date component                                |
| filename.base            | ""         | string                                                                                | The base folder to be truncated                                     |
| filename.basename        | true       | boolean                                                                               | Whether the filename component should show only the basename or not |
| filename.extension       | true       | boolean                                                                               | Whether the filename component should show the extension or not     |
| time.hour12              | false      | boolean                                                                               | Whether the time component should use 12-hour format or not         |
| time.date                | false      | boolean                                                                               | Whether the time component should show the date or not              |
| time.hour                | true       | boolean                                                                               | Whether the time component should show the hour or not              |
| time.minute              | true       | boolean                                                                               | Whether the time component should show the minute or not            |
| time.second              | true       | boolean                                                                               | Whether the time component should show the second or not            |
| time.millisecond         | false      | boolean                                                                               | Whether the time component should show the millisecond or not       |
| time.hourLength          | 2          | number                                                                                | The maximum length of the hour part of the time component           |
| time.minuteLength        | 2          | number                                                                                | The maximum length of the minute part of the time component         |
| time.secondLength        | 2          | number                                                                                | The maximum length of the second part of the time component         |
| time.millisecondLength   | 3          | number                                                                                | The maximum length of the millisecond part of the time component    |
| uptime.day               | false      | boolean                                                                               | Whether the uptime component should show the day or not             |
| uptime.hour              | true       | boolean                                                                               | Whether the uptime component should show the hour or not            |
| uptime.minute            | true       | boolean                                                                               | Whether the uptime component should show the minute or not          |
| uptime.second            | true       | boolean                                                                               | Whether the uptime component should show the second or not          |
| uptime.millisecond       | true       | boolean                                                                               | Whether the uptime component should show the millisecond or not     |
| uptime.dayLength         | 2          | number                                                                                | The maximum length of the day part of the uptime component          |
| uptime.hourLength        | 2          | number                                                                                | The maximum length of the hour part of the uptime component         |
| uptime.minuteLength      | 2          | number                                                                                | The maximum length of the minute part of the uptime component       |
| uptime.secondLength      | 2          | number                                                                                | The maximum length of the second part of the uptime component       |
| uptime.millisecondLength | 2          | number                                                                                | The maximum length of the millisecond part of the uptime component  |
| namespace.before         | ""         | string                                                                                | The text to be put before namespace component if it's not empty.    |
| namespace.after          | " "        | string                                                                                | The text to be put after namespace component if it's not empty.     |
