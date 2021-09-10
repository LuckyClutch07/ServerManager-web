const express = require('express');
const mongodb = require('mongodb');
const dotend = require('dotenv');

const router = express.Router();

//GET SERVERS MAP.
router.get('/', async (req, res) => {
    await req.app.locals.socket.emit('servers-request', {});

    res.status(200).send(Object.fromEntries(req.app.locals.servers));
});


//GET LIST FILE-MANAGERS
router.get('/list', async (req, res) => {
    if(req.app.locals.servers && req.app.locals.socket) {
        await req.app.locals.socket.emit('servers-request', {});

        let keys = [...req.app.locals.servers.keys()];

        res.status(200).send(keys);
    }
});


//GET FILE-MANAGER SERVERS.
router.get('/list/:fileManager', async (req, res) => {
    if(req.app.locals.servers.has(req.params.fileManager)) {
        await req.app.locals.socket.emit('servers-request', {});

        res.status(200).send(req.app.locals.servers.get(req.params.fileManager));
    } else {
        res.status(404).send({ "err": "Requested File-Manager not found."});
    }
});

module.exports = router;