const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv').config();
const { Server } = require('socket.io');

const app = express();

const socketPort = process.env.SOCKET_PORT || 3000;
app.locals.servers = [];
app.locals.servers_console = new Map();

app.locals.socket = null;

app.locals.io = new Server(socketPort, {
    path: "/socket"
});

app.locals.SERVERS_EVENT = 'servers-event';
app.locals.SERVER_CONSOLE_OUTPUT = "server-console-output";
app.locals.SERVER_DELETE_REQUEST = "server-delete";
app.locals.SERVER_ADD_REQUEST = "server-add";
app.locals.WEBUI_INSERT_COMMAND = "webui-insert-command";
app.locals.WEBUI_SHUTDOWN_SERVER = "webui-shutdown-server";

app.locals.io.on('connection', (socket) => {
    app.locals.socket = socket;

    socket.on(app.locals.SERVERS_EVENT, (event, obj, callback) => {
        switch (event) {
            case app.locals.SERVER_CONSOLE_OUTPUT:
                app.locals.servers_console.push(obj.name, obj.lines)
                callback ({
                    status: "200",
                    error: "OK, Successfully registered new lines."
                });
                return;
            case app.locals.SERVER_ADD_REQUEST:
                app.locals.servers.push(obj);

                callback ({
                    status: "200",
                    error: "OK, Successfully registered new server."
                });
                return;
            case app.locals.SERVER_DELETE_REQUEST:
                var server = obj.server;

                app.locals.servers = app.locals.servers.filter(function(ele){
                    return ele.name != server;
                });

                callback ({
                    status: "200",
                    error: "OK, Successfully removed server."
                });
                return;
            default:
                callback ({
                    status: "400",
                    error: "No Listener found with that name, forgot to pass the listener name?"
                });
        }
    });
});

//Middleware
app.use(express.json());
app.use(cors());

const servers = require('./routes/api/servers');
app.use('/api/servers', servers);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));