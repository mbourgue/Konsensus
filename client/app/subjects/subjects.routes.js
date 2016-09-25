'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('subjects', {
      url: '/subjects',
      template: require('./subjects.pug'),
      controller: 'SubjectsController',
      controllerAs: 'subjects',
      // authenticate: 'admin'
    })
    .state('subjects_create', {
      url: '/subjects/create',
      template: require('./create/create.pug'),
      controller: 'CreateSubjectController',
      controllerAs: 'subjects',
      // template: 'hey'
    })
    .state('subjects_show', {
      url: '/subjects/:id',
      template: require('./show/show.pug'),
      controller: 'ShowSubjectController',
      controllerAs: 'SubjectCtrl'
    });
}
