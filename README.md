# 🌟 Fancy Printer 🌟

A fancy logger with a lot of customizations and blazingly fast speed!

No dependencies! Just one file!

[![](https://img.shields.io/badge/Discord-black?style=for-the-badge&logo=discord)](https://discord.gg/emAhrw3mvM)
[![npm](https://img.shields.io/npm/v/fancy-printer.svg?style=for-the-badge)](https://www.npmjs.com/package/fancy-printer)

# 🤩 Don't forget to star! 🤩

<!-- TOC -->
* [🌟 Fancy Printer 🌟](#-fancy-printer-)
* [🤩 Don't forget to star! 🤩](#-dont-forget-to-star-)
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
  * [✨ Reading input ✨](#-reading-input-)
  * [✨ Utilities ✨](#-utilities-)
  * [✨ Presets ✨](#-presets-)
    * [✨ Inline Preset ✨](#-inline-preset-)
    * [✨ Raw Preset ✨](#-raw-preset-)
    * [✨ Brackets Preset ✨](#-brackets-preset-)
  * [✨ Logging Options ✨](#-logging-options-)
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

![](https://raw.githubusercontent.com/larvance/fancy-printer/main/screenshots/img.png)

***

## ✨ Creating tags ✨

```js
printer.addTag("test", "HEY!", "", "#bb7373", "#ffff00");
printer.tag("test", "Hello, world!");
```

![](https://raw.githubusercontent.com/larvance/fancy-printer/main/screenshots/img_1.png)

***

## ✨ Formatting & Using/adding components & Changing the chr ✨

```js
const DEFAULT_FORMAT = "%namespace%date %time %tag %text"; // this is the default format
printer.options.namespace = "My namespace"
// OR
const newPrinter = printer.namespace("My new namespace!");

printer.options.namespace = "";
printer.setFormat("%date %time %tag %text");
printer.info("Hello, world!");
printer.setFormat("%date %time %tag > %text");
printer.info("Hello, world!");
printer.setFormat("%date %time %tag %2plus2 %text");
printer.addComponent("2plus2", () => {
    return 2 + 2;
});
printer.info("Hello, world!");

printer.setCharacter("!");
printer.setFormat("!date !time !tag !2plus2 !text");
printer.info("Hello, world!");

printer.setFormat("!stack [ !filename:!line:!column ] !date !time !tag !2plus2 !text");
printer.info("Hello, world!");
```

![](https://raw.githubusercontent.com/larvance/fancy-printer/main/screenshots/img_2.png)

***

## ✨ Making the printer global ✨

```js
printer.makeGlobal();

// some file.js where printer nor Printer is defined
printer.info("test");
Printer.static.info("test");
```

```js
printer.makeGlobal(true);

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
    format: "my log %DD-%MM-%YYYY.txt", // Default: log-DD-MM-YYYY.log. The format of the name of the file.
    month: "long", // the type of the %month, expects: "numeric" | "2-digit" | "long" | "short" | "narrow"
    day: "long", // the type of the %month variable, expects: "long" | "short" | "narrow"
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
    format: "my log %t.txt" // Default: log-%t.log. The format of the name of the file. %t will be replaced by the time
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

![](https://raw.githubusercontent.com/larvance/fancy-printer/main/screenshots/img_4.png)

### ✨ %d, %i ✨

Puts the integer into place.

```js
printer.log("Hello, %d!", 12.34);
printer.log("Hello, %i!", 12.34);
```

![](https://raw.githubusercontent.com/larvance/fancy-printer/main/screenshots/img_5.png)

### ✨ %f ✨

Puts the floating number into place.

```js
printer.log("Hello, %f!", 12.34);
```

![](https://raw.githubusercontent.com/larvance/fancy-printer/main/screenshots/img_6.png)

### ✨ %c ✨

Adds styling to the rest of the text. Uses CSS syntax.

```js
printer.log("Hello, %cthis is red!%c and now it's blue!", "color: red", "color: blue");
```

![](https://raw.githubusercontent.com/larvance/fancy-printer/main/screenshots/img_7.png)

| Property                       | Default | Expected type                                                               | Description                                                                     |
|--------------------------------|---------|-----------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| background or background-color | None    | Color                                                                       | The background color of the text                                                |
| color                          | None    | Color                                                                       | The color of the text                                                           |
| font-weight                    | normal  | normal \| bold \| bolder \| A positive integer                              | The boldness of the text                                                        |
| text-decoration                | none    | underline \| line-through \| linethrough \| strike-through \| strikethrough | The decorations of the text. More than one can be used by separating with space |
| padding                        | 0       | A positive integer                                                          | The amount of white space to add on both sides                                  |
| font-style                     | normal  | normal \| italic \| oblique                                                 | The style of the text.                                                          |

***

## ✨ Reading input ✨

```js
const {inline} = printer;

(async () => {
  inline.log("Type something: ");
  const something = await printer.readLine();
  printer.warn("You entered: %s", something);

  inline.log("Press a key: ");
  const key = await printer.readKey();
  inline.print(key + "\n");
  printer.warn("You pressed: %s", key);

  inline.log("Enter your password: ");
  const pass = await printer.readPassword({character: "*"}); // Character is "*" by default.
  printer.warn("You entered: %s", pass);

  const list = ["an apple", "a grape", "a watermelon", "a piano!"];
  inline.log("Select something: ");
  const selection = await printer.readSelection(list);
  printer.warn("You entered: %s", list[selection]);

  const list2 = ["audi", "ford", "lamborghini", "beans"];
  inline.log("Select something: ");
  const selection2 = await printer.readSelectionListed(list2);
  printer.warn("You entered: %s", list2[selection2]);
})();
```

![](https://raw.githubusercontent.com/larvance/fancy-printer/main/screenshots/img_8.png)

***

## ✨ Utilities ✨

```js
printer.print("Hello, world!"); // No substitution or formatting will be used and won't break line.

printer.printLine("Hello, world!"); // No substitution or formatting will be used and will break line.
printer.println("Hello, world!");

printer.println(printer.substitute("Hello,%c world!", "color: red")); // Manual substitution

printer.print("Hello! You!")
printer.backspace(5); // Erases 5 characters from the text written.

printer.clear(); // Clears the console (it's not included in the screenshot)
```

![](https://raw.githubusercontent.com/larvance/fancy-printer/main/screenshots/img_9.png)

***

## ✨ Presets ✨

### ✨ Inline Preset ✨

This preset basically stops putting a line break at the end of logs.

Can be achieved by doing `printer.options.newLine = false` or just using the existing preset:

```js
const {inline} = require("fancy-printer");

inline.log("Hello, ");
inline.print("world!");
```

![](https://raw.githubusercontent.com/larvance/fancy-printer/main/screenshots/img_10.png)

### ✨ Raw Preset ✨

This preset basically removes tags, dates and time from the format.

Can be achieved by doing `printer.setFormat("%text")` or just using the existing preset:

```js
const {raw} = require("fancy-printer");

raw.log("Hello, world!");
raw.log("%cNeeds some coloring!", "color: red");
```

![](https://raw.githubusercontent.com/larvance/fancy-printer/main/screenshots/img_11.png)

### ✨ Brackets Preset ✨

This preset is a custom preset requested by a user.

Can be achieved by using the preset:

```js
const {brackets} = require("fancy-printer");

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

![](https://raw.githubusercontent.com/larvance/fancy-printer/main/screenshots/img_12.png)

***

## ✨ Logging Options ✨

| Key                       | Default                | Expected type                                                                                      | Description                                                                                                                         |
|---------------------------|------------------------|----------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| format                    | %date %time %tag %text | string                                                                                             | The formatting                                                                                                                      |
| substitutionsEnabled      | true                   | boolean                                                                                            | Whether the substitutions should work                                                                                               |
| componentsEnabled         | true                   | boolean                                                                                            | Whether the components should work                                                                                                  |
| newLine                   | true                   | boolean                                                                                            | Whether the logger should print the text with a line break at the end                                                               |
| defaultColor              | None                   | Color(string)                                                                                      | The default text color for the printer                                                                                              |
| defaultBackgroundColor    | None                   | Color(string)                                                                                      | The default text background color for the printer                                                                                   |
| tagColor                  | None                   | Color(string)                                                                                      | The default text color for the tags                                                                                                 |
| tagBold                   | true                   | boolean                                                                                            | Whether the tag component is bold or not                                                                                            |
| tagItalic                 | false                  | boolean                                                                                            | Whether the tag component is italic or not                                                                                          |
| tagUnderline              | false                  | boolean                                                                                            | Whether the tag component is underlined or not                                                                                      |
| tagStrikethrough          | false                  | boolean                                                                                            | Whether the tag component is struck-through or not                                                                                  |
| tagPadding                | 2                      | number                                                                                             | The padding of the tag component                                                                                                    |
| dateColor                 | None                   | Color(string)                                                                                      | The text color of the date component                                                                                                |
| dateBackgroundColor       | blueBright             | Color(string)                                                                                      | The text background color of the date                                                                                               |
| dateBold                  | true                   | boolean                                                                                            | Whether the date component is bold or not                                                                                           |
| dateItalic                | false                  | boolean                                                                                            | Whether the date component is italic or not                                                                                         |
| dateUnderline             | false                  | boolean                                                                                            | Whether the date component is underlined or not                                                                                     |
| dateStrikethrough         | false                  | boolean                                                                                            | Whether the date component is struck-through or not                                                                                 |
| datePadding               | 1                      | number                                                                                             | The padding of the date component                                                                                                   |
| dateOptions.localeMatcher | undefined              | "best fit" or "lookup" or undefined                                                                | [Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options) |
| dateOptions.weekday       | undefined              | "long" or "short" or "narrow" or undefined                                                         | [Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options) |
| dateOptions.era           | undefined              | "long" or "short" or "narrow" or undefined                                                         | [Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options) |
| dateOptions.year          | undefined              | "numeric" or "2-digit" or undefined                                                                | [Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options) |
| dateOptions.month         | "short"                | "numeric" or "2-digit" or "long" or "short" or "narrow" or undefined                               | [Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options) |
| dateOptions.day           | "numeric"              | "numeric" or "2-digit" or undefined                                                                | [Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options) |
| dateOptions.hour          | undefined              | "numeric" or "2-digit" or undefined                                                                | [Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options) |
| dateOptions.minute        | undefined              | "numeric" or "2-digit" or undefined                                                                | [Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options) |
| dateOptions.second        | undefined              | "numeric" or "2-digit" or undefined                                                                | [Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options) |
| dateOptions.timeZoneName  | undefined              | "short" or "long" or "shortOffset" or "longOffset" or "shortGeneric" or "longGeneric" or undefined | [Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options) |
| dateOptions.formatMatcher | undefined              | "best fit" or "basic" or undefined                                                                 | [Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options) |
| dateOptions.hour12        | undefined              | boolean or undefined                                                                               | [Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options) |
| dateOptions.timeZone      | undefined              | string or undefined                                                                                | [Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options) |
| timeColor                 | None                   | Color(string)                                                                                      | The text color of the time component                                                                                                |
| timeBackgroundColor       | blue                   | Color(string)                                                                                      | The text background color of the time                                                                                               |
| timeBold                  | true                   | boolean                                                                                            | Whether the time component is bold or not                                                                                           |
| timeItalic                | false                  | boolean                                                                                            | Whether the time component is italic or not                                                                                         |
| timeUnderline             | false                  | boolean                                                                                            | Whether the time component is underlined or not                                                                                     |
| timeStrikethrough         | false                  | boolean                                                                                            | Whether the time component is struck-through or not                                                                                 |
| timePadding               | 1                      | number                                                                                             | The padding of the time component                                                                                                   |
| timeDate                  | false                  | boolean                                                                                            | Whether the time component has the date in it                                                                                       |
| timeHour                  | true                   | boolean                                                                                            | Whether the time component has the hours in it                                                                                      |
| timeMinute                | true                   | boolean                                                                                            | Whether the time component has the minutes in it                                                                                    |
| timeSecond                | true                   | boolean                                                                                            | Whether the time component has the seconds in it                                                                                    |
| timeMillisecond           | false                  | boolean                                                                                            | Whether the time component has the milliseconds in it                                                                               |
| timeMillisecondLength     | 3                      | number                                                                                             | The maximum length of the millisecond part of the time component                                                                    |
| groupColor                | None                   | Color(string)                                                                                      | The text color of the group                                                                                                         |
| groupBackgroundColor      | None                   | Color(string)                                                                                      | The text background color of the group                                                                                              |

