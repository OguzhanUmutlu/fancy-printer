# 🌟 Fancy Printer 🌟

A fancy logger with a lot of customization!

[![](https://img.shields.io/badge/Discord-black?style=for-the-badge&logo=discord)](https://discord.gg/emAhrw3mvM)

# 🔧 Usage 🔧

## ✨ Creating a printer ✨

```js
const printer = require("fancy-printer");


const newPrinter = printer.create(options);
newPrinter.log("Hello, world!");
// OR just use it normally
printer.log("Hello, world!");
```

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
printer.assert(5 % 2 === 0, "5 is not divisible by 2!");

printer.tag("pass", "This worked as well!");
```

![](https://raw.githubusercontent.com/OguzhanUmutlu/fancy-printer/main/screenshots/img.png)

## ✨ Creating tags ✨

```js
printer.addTag("test", "HEY!", "", "#bb7373", "#ffff00");
printer.tag("test", "Hello, world!");
```

![](https://raw.githubusercontent.com/OguzhanUmutlu/fancy-printer/main/screenshots/img_1.png)

## ✨ Formatting & Using/adding components & Changing the chr ✨

```js
printer.setFormat("$date $time $tag $text"); // default
printer.info("Hello, world!");
printer.setFormat("$date $time $tag > $text");
printer.info("Hello, world!");
printer.setFormat("$date $time $tag $random $text");
printer.addComponent("2plus2", () => {
    return 2 + 2;
});
printer.info("Hello, world!");

printer.setCharacter("!");
printer.setFormat("!date !time !tag !2plus2 !text");
printer.info("Hello, world!");

printer.setCharacter("$");
printer.setFormat("$file:$row:$column $tag $text");
// or
printer.setFormat("$stack $tag $text");
printer.info("Hello, world!");
```

![](https://raw.githubusercontent.com/OguzhanUmutlu/fancy-printer/main/screenshots/img_2.png)

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

## ✨ Logging to a specific file ✨

```js
printer.addFile("./myFile.txt");
```

## ✨ Logging to a file *periodically* ✨

```js
printer.makeLoggerFile();
// which makes a "logs" folder and puts a unique file in it to log into
// OPTIONAL:
printer.makeLoggerFile({
    folder: "./myFolder/", // Default: logs. This is where the log files will be saved in.
    format: "my log $DD-$MM-$YYYY.txt" // Default: log-DD-MM-YYYY.log. The format of the name of the file.
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

### ✨ Padding on formatting arguments ✨

The length of the argument determines how long it should be.

For example if it's `DD` and if the day is 4, it becomes 04.

If it's `YY` and if the year is 2023, it becomes 23. (so it cuts from the end)

## ✨ Logging to a file with a *hash* ✨

```js
printer.makeHashedLoggerFile();
// which makes a "logs" folder and puts a unique file in it to log into
// OPTIONAL:
printer.makeHashedLoggerFile({
    folder: "./myFolder/", // Default: logs. This is where the log files will be saved in.
    radix: 16, // max and default 16. This is the time encoder setting
    divide: 3, // Default: 3. Divides the current timestamp into 10^divide. For example 3 would divide it to 1000 which makes it depend on seconds.
    format: "my log $t.txt" // Default: log-$t.log. The format of the name of the file. $t will be replaced by the time
});
```

## ✨ Substitutions ✨



## ✨ Clearing the terminal ✨

```js
printer.clear();
```

## ✨ Logging Options ✨

| Key                       | Default                | Expected type                                                                                      | Description                                                                                                                         |
|---------------------------|------------------------|----------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| format                    | $date $time $tag $text | string                                                                                             | The formatting                                                                                                                      |
| substitutions             | true                   | boolean                                                                                            | Whether the substitutions should work                                                                                               |
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

