const net = require('net');
const Manager = require("./manager/manager");

/**
 * New exemplars class Manager
 * @type {Manager}
 */

let manager = new Manager();

/**
 * Create server and handle this
 * @type {Server}
 */

let server = net.createServer(function(socket) {
    socket.on("error", (err) => {
        socket.removeAllListeners();
    })
    const handler = (data) => {
        socket.off("data", handler);
        manager.addUser(data,socket);
    }
    socket.on("data", handler)
});

/**
 * Server listener
 */

server.listen(1337, '127.0.0.1');