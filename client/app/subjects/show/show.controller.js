'use strict';

export default class ShowSubjectController {

  /*@ngInject*/
  constructor($http, $stateParams, $scope) {
    this.$http = $http;
    this.$stateParams = $stateParams;
    $scope.subject = {};
    var that = this;
    this.get(this.$stateParams.id).then(function(response) {
      console.log(response);
      $scope.subject = response.data;
    });
  }

  createChunk(chunk) {
    let that = this; 
    this.$http.post('/api/subjects/' + this.$stateParams.id +'/chunks/', chunk).then(
      () => that.subject.chunks.push(chunk) 
    );
  }

  voteChunk(_id, value) {
    if(value === '+') {
      this.$http.post('/api/subjects/' + this.$stateParams.id + '/chunks/' + _id  + '/vote');
      


    }else{

    }
  }

  get(id) {
    // var that = this;
    return this.$http.get('/api/subjects/' + this.$stateParams.id);
  }



}