# fancy-printer

A fancy logger with a lot of customization!

# Usage

## Creating a printer

```js
const Printer = require("fancy-printer");


const printer = new Printer(options);
// OR
const printer = Printer.static;
```

## Default tags

```js
printer.pass("Passed!");
printer.fail("Failed!");
printer.error("An error occurred!");
printer.warn("Something might go wrong!");
printer.info("This is a message!");
printer.debug("Check the line 5!");
printer.log("An original log!");

printer.tag("pass", "This worked as well!");
```

![](https://github.com/OguzhanUmutlu/fancy-printer/screenshots/img.png)

## Creating tags

```js
printer.addTag("test", "HEY!", "", "#bb7373", "#ffff00");
printer.tag("test", "Hello, world!");
```

![](https://github.com/OguzhanUmutlu/fancy-printer/screenshots/img_1.png)

## Formatting & Using/adding components

```js
printer.setFormat("$date $tag $text"); // default
printer.info("Hello, world!");
printer.setFormat("$date $tag > $text");
printer.info("Hello, world!");
printer.setFormat("$date $tag $random $text");
printer.addComponent("random", () => {
    return 2 + 2;
});
printer.info("Hello, world!");
```

![](https://github.com/OguzhanUmutlu/fancy-printer/screenshots/img_2.png)

## Making the printer global

```js
Printer.makeGlobal();

// some file.js where printer nor Printer is defined
printer.info("test");
Printer.static.info("test");
```

```js
Printer.makeGlobal(true);

// Now you can use the static printer from `console`
console.info("test");
```

## Logging Options

Tip: You can add custom options to nearly every function!

```js
printer.info("Text!", additionalOptions);
```

| Key                       | Default          | Expected                                                                                           | Description                                                                                                                         |
|---------------------------|------------------|----------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| format                    | $date $tag $text | string                                                                                             | The formatting                                                                                                                      |
| defaultColor              | None             | Color(string)                                                                                      | The default text color for the printer                                                                                              |
| defaultBackgroundColor    | None             | Color(string)                                                                                      | The default text background color for the printer                                                                                   |
| tagColor                  | None             | Color(string)                                                                                      | The default text color for the tags                                                                                                 |
| dateColor                 | None             | Color(string)                                                                                      | The text color of the date component                                                                                                |
| dateBackgroundColor       | blueBright       | Color(string)                                                                                      | The text background color of the date                                                                                               |
| dateBold                  | true             | boolean                                                                                            | Whether the date component is bold or not                                                                                           |
| dateOptions.localeMatcher | undefined        | "best fit" or "lookup" or undefined                                                                | [Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options) |
| dateOptions.weekday       | undefined        | "long" or "short" or "narrow" or undefined                                                         | [Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options) |
| dateOptions.era           | undefined        | "long" or "short" or "narrow" or undefined                                                         | [Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options) |
| dateOptions.year          | undefined        | "numeric" or "2-digit" or undefined                                                                | [Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options) |
| dateOptions.month         | "short"          | "numeric" or "2-digit" or "long" or "short" or "narrow" or undefined                               | [Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options) |
| dateOptions.day           | "numeric"        | "numeric" or "2-digit" or undefined                                                                | [Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options) |
| dateOptions.hour          | undefined        | "numeric" or "2-digit" or undefined                                                                | [Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options) |
| dateOptions.minute        | undefined        | "numeric" or "2-digit" or undefined                                                                | [Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options) |
| dateOptions.second        | undefined        | "numeric" or "2-digit" or undefined                                                                | [Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options) |
| dateOptions.timeZoneName  | undefined        | "short" or "long" or "shortOffset" or "longOffset" or "shortGeneric" or "longGeneric" or undefined | [Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options) |
| dateOptions.formatMatcher | undefined        | "best fit" or "basic" or undefined                                                                 | [Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options) |
| dateOptions.hour12        | undefined        | boolean or undefined                                                                               | [Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options) |
| dateOptions.timeZone      | undefined        | string or undefined                                                                                | [Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options) |