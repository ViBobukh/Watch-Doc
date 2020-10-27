const User = require("../User/User");
const parser = require("../parser");
const { spawn } = require('child_process');

/**
 * This class controlled work application and restarted or finished if application stopped
 */
class Manager {
    constructor() {
        this.users = [];
    }

    /**
     * Added user data in class User
     * @param data - information about user
     * @param socket - location user
     */
    
    addUser(data, socket) {
        let parse = parser(data);
        this.user = (new User({
            socket: socket,
            message: parse,
            state: false
        }));
        this.users.push(this.user);
        this.startPing(this.user)
    }

    /**
     * Run timer on 3 sec, and do callback
     * @param callback
     */

    timer(callback) {
        setTimeout(callback, 3000)
    }

    /**
     * Started control above the user
     * @param user
     */
    startPing(user) {
        user.subscribe((data) => {
            if( parser(data) === "pong") {
                user.state = "pong";
            }
        });
        this.sendPing(user);
    }

    /**
     * Send ping user which controlled
     * @param user
     */

    sendPing(user) {
        user.state = "ping";
        user.sendMessage("ping");
        this.timer(()=>{
            if(user.state === "pong") {
                this.timer(()=> {this.sendPing(user)});
            } else {
                this.handleAction(user);
            }
        });
    }

    /**
     * This function controlled restart or finished and do it
     * @param user
     */

    handleAction(user) {
        if (user.getAction() === "restart") {
            console.log("restart");
            spawn(user.getProcess(), user.getArgs(), {
                detached: true
            }).on('error', function( err ){ throw err })
        } else {
            console.log(`Program ${user.getName()} finished`);
        }
    }
}

module.exports = exports = Manager;