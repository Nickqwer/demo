var Game = {};

function Message() {
    this.action = null;
    this.parameters = {};
}

Game.context;
Game.canvas;

Game.init = function() {
    Console.log("Inner_height = " + window.innerHeight);
    Console.log("Inner_width = " + window.innerWidth);
    Console.log("Outer_height = " + window.outerHeight);
    Console.log("Outer_width = " + window.outerWidth);
    Game.canvas = document.getElementById('playground');
    Game.context = Game.canvas.getContext('2d');
    var wsUri = "ws://" + window.location.hostname + ":8081/";
    Game.connect(wsUri);
}

Game.connect = function(wsUri) {
    Console.log("CONNECT = " + wsUri);
    Game.socket = new WebSocket(wsUri);
    Console.log("SOCKET = " + Game.socket);

    Game.socket.onopen = function (evt) {
        Console.log("Opened");
        window.setInterval(function () {
            // Prevent server read timeout.
            Game.socket.send('ping');
        }, 5000);
    };
    Game.socket.onclose = function (evt) {
        Console.log("Closed");
        Console.log("Reason: " + evt.reason);
        Console.log("Code: " + evt.code);
    };
    Game.socket.onmessage = function (message) {
        Console.log("Message = " + message.data);
        var msg = JSON.parse(message.data);

        if (msg.action == "join") {
            Game.join();
        } else if (msg.action == "wait") {
            Console.log("Wait for other players...");
        } else if (msg.action == "start") {
            Game.start(msg.parameters);
        } else if (msg.action == "mark") {
            Game.mark(msg.parameters);
        } else if (msg.action == "finish") {
            Game.finish(msg.parameters);
        }
    };
    Game.socket.onerror = function() {
        Console.log("ERROR");
    }

    window.addEventListener("click", Game.sendCoordinates, false);
}

Game.sendCoordinates = function(event) {
    var msg = new Message();
    msg.action = "click";
    msg.parameters["x"] = event.clientX;
    msg.parameters["y"] = event.clientY;
    var msgToSend = JSON.stringify(msg);
    Console.log("SEND_COORDINATED = " + msgToSend);
    Game.socket.send(msgToSend);
}

Game.join = function() {
    var msg = new Message();
    msg.action = "join";
    msg.parameters["width"] = Game.canvas.width;
    msg.parameters["height"] = Game.canvas.height;
    msg.parameters["absX"] = Game.canvas.offsetLeft;
    msg.parameters["absY"] = Game.canvas.offsetTop;
    var msgToSend = JSON.stringify(msg);
    Game.socket.send(msgToSend);
}

Game.start = function(parameters) {
    Console.log("Start game.");
    var players = parameters["players"];
    var myName = parameters["myName"];
    Console.log("Your name: " + myName);
    Console.log("Players: " + players[0] + " " + players[1]);

    Game.drawGrid();
}

Game.drawGrid = function() {
    var width = Game.canvas.width;
    var height = Game.canvas.height;

    Game.context.beginPath();
    Game.context.moveTo(0, height / 3);
    Game.context.lineTo(width, height / 3);
    Game.context.stroke();

    Game.context.beginPath();
    Game.context.moveTo(0, 2 * height / 3);
    Game.context.lineTo(width, 2 * height / 3);
    Game.context.stroke();

    Game.context.beginPath();
    Game.context.moveTo(width / 3, 0);
    Game.context.lineTo(width / 3, height);
    Game.context.stroke();

    Game.context.beginPath();
    Game.context.moveTo(2 * width / 3, 0);
    Game.context.lineTo(2 * width / 3, height);
    Game.context.stroke();
}

var Console = {};

Console.log = function(message) {
    var console = document.getElementById("console");
    var p = document.createElement('p');
    p.innerText = message;
    console.appendChild(p);
}