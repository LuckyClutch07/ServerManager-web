const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv').config();
const { Server } = require('socket.io');

const app = express();

const socketPort = process.env.SOCKET_PORT || 3000;
app.locals.servers = new Map();


app.locals.io = new Server(socketPort, {
    path: "/socket"
});
app.locals.socket = null;

app.locals.io.on('connection', (socket) => {
    app.locals.socket = socket;
    socket.emit('servers-request', {});

    socket.on('servers-request', (arg1, arg2, callback) => {
        let keyName = Object.keys(arg2)[0];
        let values = Object.values(arg2);   

        if(app.locals.servers.has(keyName)){
            app.locals.servers.delete(keyName);
        }

        app.locals.servers.set(keyName, values);

        callback({
            status: "ok"
        });
    });

    socket.setMaxListeners(100);
});

//Middleware
app.use(express.json());
app.use(cors());

const servers = require('./routes/api/servers');
const { post } = require('./routes/api/servers');
app.use('/api/servers', servers);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));