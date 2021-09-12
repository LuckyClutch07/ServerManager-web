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
    path: "/socket",
    cors: {
        origin: '*',
      }
});

app.locals.SERVERS_EVENT = 'servers-event';
app.locals.SERVER_CONSOLE_OUTPUT = "server-console-output";
app.locals.SERVER_DELETE_REQUEST = "server-delete-request";
app.locals.SERVER_ADD_REQUEST = "server-add-request";
app.locals.WEBUI_INSERT_COMMAND = "webui-insert-command";
app.locals.WEBUI_SHUTDOWN_SERVER = "webui-shutdown-server";

app.locals.io.on('connection', (socket) => {
    app.locals.socket = socket;

    socket.on(app.locals.SERVERS_EVENT, (event, obj, callback) => {
        switch (event) {
            case app.locals.SERVER_CONSOLE_OUTPUT:
                var lines = []
                if(app.locals.servers_console.has(obj.name)){
                    Object.values(app.locals.servers_console.get(obj.name)).forEach(line => {
                        lines.push(line)
                    })
                }

                obj.lines.forEach(line => {
                    lines.push(line);
                });
                app.locals.servers_console.set(obj.name, lines);
                app.locals.io.sockets.emit(app.locals.SERVERS_EVENT, app.locals.SERVER_CONSOLE_OUTPUT, obj);
                return;
            case app.locals.SERVER_ADD_REQUEST:
                app.locals.servers = app.locals.servers.filter(function(ele){
                    return ele.name != obj.name;
                });

                app.locals.servers.push(obj);
                app.locals.io.sockets.emit(app.locals.SERVERS_EVENT, app.locals.SERVER_ADD_REQUEST, obj);
                return;
            case app.locals.SERVER_DELETE_REQUEST:
                var server = obj.server;

                app.locals.servers = app.locals.servers.filter(function(ele){
                    return ele.name != server;
                });

                app.locals.io.sockets.emit(app.locals.SERVERS_EVENT, app.locals.SERVER_DELETE_REQUEST, obj);
                return;
            default:
                app.locals.io.sockets.emit(app.locals.SERVERS_EVENT, event, obj);
            return;
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