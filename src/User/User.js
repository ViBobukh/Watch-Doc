const parser = require("../parser");

/**
 * This class keep and get data about user
 */
class User {
    constructor({socket, message}) {
        this.process = message.process;
        this.args = message.args;
        this.name = message.name;
        this.socket = socket;
        this.action = message.action;
        this.isConnected = true;

        /**
         * Controlled error and crash connection if error
         */

        this.socket.on("error", () => {
            this.isConnected = false;
            this.socket.removeAllListeners();
        });
    }

    /**
     * Send message if is connected
     * @param message
     */

    sendMessage(message) {
        if(this.isConnected){
            this.socket.write(`${JSON.stringify(message)}`);
        }
    }

    /**
     * It is subscribe at users data
     * @param callback
     */

    subscribe(callback) {
        this.socket.on("data", callback);
    }

    unsubscribe(callback) {
        this.socket.off("data", callback);
    }

    getName() {
        return this.name;
    }

    getProcess() {
        return this.process;
    }

    getArgs() {
        return this.args;
    }

    getAction() {
        return this.action;
    }
}

module.exports = User;