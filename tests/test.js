const printer = require("../index");


printer.options.styleSubstitutionsEnabled = true;

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

printer.addStyle("h", "color: red; background: yellow");

printer.info("my own styling starts &hnow! yay!");

global.__DEV__ = true; // do not set this to true.