const _ = require('lodash');
const express = require('express');
const cors = require('cors');

const dbMongo = require('./db');

const server = express();

server.get('/api/addr/:publicKey', cors(), (req, res) => {
    if (_.isNil(req.params.publicKey)) {
        res.json({"error": "no address param."})
    } else {
        dbMongo.getUserByPublicKey(req.params.publicKey, (err, user) => {
            if (err) {
                res.json({"error": "missing data."});
            } else {
                res.json(user);                
            }
        })        
    }
});

console.log('Server started ...');
server.listen(80);