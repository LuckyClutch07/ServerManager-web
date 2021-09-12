const express = require('express');
const mongodb = require('mongodb');
const dotend = require('dotenv');

const router = express.Router();


router.post('/server/:name', async (req, res) => {
    var contains = '';
    req.app.locals.servers.forEach((server) => {
        if(server.name === req.params.name)
            contains = server.name;
    });

    if(!contains.includes(req.params.name)){
        res.status(404).send("Requested Server not found, Mispelled?");
                return;
    }

    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(404).send("POST needs a body with a action.");
        return;
    }

    if(req.body.action){
        switch (req.body.action) {
            case "shutdown":
                req.app.locals.socket.broadcast.emit(req.app.locals.SERVERS_EVENT, req.app.locals.WEBUI_SHUTDOWN_SERVER, { "server": req.params.name });
                res.status(200).send();
                return;
            case "command":
                req.app.locals.socket.broadcast.emit(req.app.locals.SERVERS_EVENT, req.app.locals.WEBUI_INSERT_COMMAND, { "server": req.params.name, "command": req.body.command })
                res.status(200).send();
                return;
            default:
                res.status(404).send("Requested Action not found, Mispelled?");
                return;
        }
    }
});

router.get('/console/:name', async (req, res) => {

    if(req.params.name && req.app.locals.servers_console.has(req.params.name)) {
        res.status(200).send(req.app.locals.servers_console.get(req.params.name));
        return;
    }
    res.status(404).send("Requested Server not found, Mispelled?");
});

//GET SERVERS MAP.
router.get('/all', async (req, res) => {
    res.status(200).send(req.app.locals.servers);
});


//GET LIST FILE-MANAGERS
router.get('/fileManagers', async (req, res) => {
    if(req.app.locals.servers) {
        let managers = [];

        req.app.locals.servers.forEach(s => {
            if(!managers.includes(s.fileManager)){
                managers.push(s.fileManager);
            }
        });

        res.status(200).send(managers);
    }
});


//GET FILE-MANAGER SERVERS.
router.get('/:fileManager', async (req, res) => {
    let managers = [];

    req.app.locals.servers.forEach(s => {
        if(!managers.includes(s.fileManager)){
            managers.push(s.fileManager);
        }
    });

    if(managers.includes(req.params.fileManager)) {
        let servers = [];

        req.app.locals.servers.forEach(s => {
            if(s.fileManager === req.params.fileManager){
                servers.push(s);
            }
        });
        
        res.status(200).send(servers);
    } else {
        res.status(404).send({ "err": "Requested File-Manager not found."});
    }
});

module.exports = router;