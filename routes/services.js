var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('services', { title: 'Services - Maanas Arora' });
});

module.exports = router;
