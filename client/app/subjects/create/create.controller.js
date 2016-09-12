'use strict';

export default class CreateSubjectController {

  /*@ngInject*/
  constructor($scope, $http) {
    this.$http = $http;
    this.$scope = $scope;
    console.log('HEY');    
  }


  create(subject) {
    console.log('HHH');
    this.$http.post('/api/subjects', subject).then(function() {
      console.log('Subject Added !');
    });
  }

}