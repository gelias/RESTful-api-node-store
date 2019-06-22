var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.send(JSON.stringify(
        {
            hasErrors: false,
            version: '0.1.2'
        }
    ));
});

module.exports = router;
