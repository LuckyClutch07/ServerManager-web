const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

var servers = [{
    "file-manager-h2H8-Gd63": 
    [
        {
            "serverName": "XD",
            "address": "127.0.0.1",
            "port": "4653"
        },
        {
            "serverName": "Server2",
            "address": "127.0.0.1",
            "port": "4645"
        }
    ]
}];

//GET
router.get('', async (req, res) => {
    const servers = await getServersList();

    res.send(await servers);
});

const key = "jahsvbd7653rf276rt2487fhb37if476";

router.get('/add', async (req, res) => {
    if(req.query.key != key) 
    {
        res.sendStatus(404);
    } else {
        servers.push({"file-manager-h2H8-Gd63": [{
            "serverName": "XD",
            "address": "127.0.0.1",
            "port": "4653"
        }]});
        res.send(servers);
    }
    
});

async function getServersList() {
    return {
        "file-manager-h2H8-Gd63": 
        [
            {
                "serverName": "XD",
                "address": "127.0.0.1",
                "port": "4653"
            },
            {
                "serverName": "Server2",
                "address": "127.0.0.1",
                "port": "4645"
            }
        ]
    }
}

// Add

module.exports = router;
