'use strict';

var express = require('express');
var controller = require('./subject.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
// router.get('/:id', controller.create);
// router.patch('/:id', controller.create);
// router.delete('/:id', controller.create);

module.exports = router;