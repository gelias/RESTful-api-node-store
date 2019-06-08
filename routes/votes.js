var express = require('express');
var router = express.Router();
const Store = require('data-store');
const store = new Store({ path: 'config.json' });
const URL = 'http://localhost:3000';
const RESOURCE = 'votes';
const util = require('util');
const EMPTY = '';

router.put('/', function(req, res, next) {
    let vote = req.body;
    let generatedId =  Math.floor(Math.random()*10);
    vote.href = `${URL}/votes/${generatedId}`;
    vote.id = generatedId;
    store.set(generatedId.toString(), vote);
    
    res.setHeader('Content-Type', 'application/json');
    res.status(201);
    res.send(JSON.stringify(vote));
});

router.get('/:id', function(req, res, next) {
    let vote = store.get(req.param('id'));
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(
        vote
        )
    );
});

router.delete('/:id', function(req, res, next) {
    store.del(req.params['id']);
    res.setHeader('Content-Type', 'application/json');
    res.status(202);
    res.send(EMPTY);
});

router.get('/', function(req, res, next) {
    let json = store.json(null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(json);
});

router.purge('/clear', function(req, res, next) {
    store.clear();
    res.setHeader('Content-Type', 'application/json');
    res.status(202);
    res.send();
});

module.exports = router;
