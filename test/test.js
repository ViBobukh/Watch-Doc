const start = require("./watch_dog_client")
const { spawn } = require('child_process');


let filename = "test.js";
let filepath = __dirname + "\\" + filename;
const ACTION = {
    RESTART: "restart",
    FINISH: "finish"
}

/**
 * Information about user
 * @type {{args: [string], process: string, name: string, action: string}}
 */

let userInfo = {
    process: "node",
    args: [filepath],
    name: "test application",
    action: ACTION.RESTART
}

/**
 * Start server with information about server
 */

start(userInfo);

/**
 * Start Notepad
 */

spawn("notepad");