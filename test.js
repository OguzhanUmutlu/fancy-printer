const printer = require("./index").static;

printer.setFormat("$date $time $tag $text"); // default
printer.info("Hello, world!");
printer.setFormat("$date $time $tag > $text");
printer.info("Hello, world!");
printer.setFormat("$date $time $tag $2plus2 $text");
printer.addComponent("2plus2", () => {
    return 2 + 2;
});
printer.info("Hello, world!");

printer.setCharacter("!");
printer.setFormat("!date !time !tag !2plus2 !text");
printer.info("Hello, world!");