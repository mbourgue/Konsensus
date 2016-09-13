'use strict';

import {Router} from 'express';
import * as controller from './subject.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', controller.index);
router.post('/', auth.isAuthenticated(), controller.create);
router.get('/:id', controller.show);
// router.patch('/:id', controller.create);
router.delete('/:id', controller.remove);

router.post('/:id/chunks', 
// auth.isAuthenticated(), 
controller.createChunk);

module.exports = router;