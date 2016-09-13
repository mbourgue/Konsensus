'use strict';

export default class CreateSubjectController {

  /*@ngInject*/
  constructor($scope, $http, $location) {
    this.$http = $http;
    this.$scope = $scope;
    this.$location = $location;
  }

  create(subject) {
    var that = this;
    this.$http.post('/api/subjects', subject).then(function() {
      console.log('Subject Added !');
      that.$location.path('subjects');  
    });
  }

}