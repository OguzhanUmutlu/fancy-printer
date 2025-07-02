import printer from "../src/printer";

setInterval(() => {
    printer.info("Trying to interrupt the input!");
}, 500);

const history = [];

async function listenForCommand() {
    const response = await printer.readline("> ", {history, allowClear: true});
    if (response === null) process.exit();
    history.push(response);
    console.log(JSON.stringify(response));
    setTimeout(listenForCommand);
}

listenForCommand().then(r => r);