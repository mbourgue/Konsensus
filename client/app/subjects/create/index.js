'use strict';

import angular from 'angular';
import CreateSubjectController from './create.controller';

export default angular.module('konsensus.subjects.create', [])
    .controller('CreateSubjectController', CreateSubjectController)
    .name;