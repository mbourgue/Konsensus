'use strict';

import {Router} from 'express';
import * as controller from './subject.controller';
import * as auth from '../../auth/auth.service';

import * as chunkController from './chunk/chunk.controller';

var router = new Router();

router.get('/', controller.index);
router.post('/', auth.isAuthenticated(), controller.create);
router.get('/:id', controller.show);
// router.patch('/:id', controller.create);
router.delete('/:id', controller.remove);

// chunks

router.post('/:id/chunks', 
// auth.isAuthenticated(), 
chunkController.create);

router.post('/:id/chunks/:chunkid/vote', chunkController.vote);

module.exports = router;