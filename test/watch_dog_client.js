const parser = require("../src/parser");
const net = require('net');

/**
 * This function create and start connected with server, answer the "ping" and write information in console
 * @param userInfo - information about user
 */
function start(userInfo) {
    let client = new net.Socket();

    /**
     * Connect with server and send information about user
     */

    client.connect(1337, '127.0.0.1', function () {
        console.log('Connected');
        setTimeout(() => {
            client.write(`${JSON.stringify(userInfo)}`);
        }, 2000)
    });

    /**
     * Get pong if work
     */
    client.on('data', function (data) {
        let parse = parser(data);
        if (parse === "ping") {
            setTimeout(() => {
                client.write(`${JSON.stringify("pong")}`)
            }, 1000)
        }
        console.log('Received: ' + data);
    });

    /**
     * Close connection with server
     */
    client.on('close', function () {
        console.log('Connection closed');
    });
}

module.exports = start;