const express = require('express');
const mongodb = require('mongodb');
const dotend = require('dotenv');

const router = express.Router();


router.post('/server/:name', async (req, res) => {
    if(!req.app.locals.servers.filter(server => server.name === req.params.name).includes(req.params.name)){
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
                req.app.locals.socket.emmit(req.app.locals.SERVERS_EVENT, req.app.locals.WEBUI_SHUTDOWN_SERVER, { "server": req.params.name });
                res.status(200).send();
                return;
            case "command":
                req.app.locals.socket.emmit(req.app.locals.SERVERS_EVENT, req.app.locals.WEBUI_INSERT_COMMAND, { "server": req.params.name, "command": req.body.command })
                res.status(200).send();
                return;
            default:
                res.status(404).send("Requested Action not found, Mispelled?");
                return;
        }
    }
});

router.get('/console/:name', async (req, res) => {
    if(app.locals.servers_console.contains(req.params.name)) {
        
        res.status(200).send(app.locals.servers_console.get(req.params.name));
        return;
    }
    res.status(404).send("Requested Server not found, Mispelled?");
});

//GET SERVERS MAP.
router.get('/all', async (req, res) => {
    res.status(200).send(eq.app.locals.servers);
});


//GET LIST FILE-MANAGERS
router.get('/fileManagers', async (req, res) => {
    if(req.app.locals.servers) {
        let managers = [];

        req.app.locals.servers.filter(function(server){
            return managers.includes(server.fileManager)
        }).forEach(s => managers.push(s.fileManager));

        res.status(200).send(managers);
    }
});


//GET FILE-MANAGER SERVERS.
router.get('/:fileManager', async (req, res) => {
    if(req.app.locals.servers.filter(server => server.fileManager === req.params.fileManager).includes(req.params.fileManager))
    {
        res.status(200).send(req.app.locals.servers.filter(server => server.fileManager === req.params.fileManager));
    } else {
        res.status(404).send({ "err": "Requested File-Manager not found."});
    }
});

module.exports = router;