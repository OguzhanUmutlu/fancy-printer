require("./index").makeGlobal().makeLoggerFile();

(async () => {
    const {inline} = printer;

    inline.log("Type something: ");
    const something = await printer.readLine();
    printer.warn("You entered: %s", something);

    inline.log("Press a key: ");
    const key = await printer.readKey();
    inline.print(key + "\n");
    printer.warn("You pressed: %s", key);

    inline.log("Enter your password: ");
    const pass = await printer.readPassword({character: "*"});
    printer.warn("You entered: %s", pass);

    const list = ["an apple", "a grape", "a watermelon", "a piano!"];
    inline.log("Select something: ");
    const selection = await printer.readSelection(list);
    printer.warn("You entered: %s", list[selection]);
})();