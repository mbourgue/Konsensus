'use strict';


export default class ShowSubjectController {

  /*@ngInject*/
  constructor($http, $stateParams) {
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.subject = {};
    var that = this;
    this.get(this.$stateParams.id).then(function(response) {
      console.log(response);
      that.subject = response.data;
    });
  }

  createChunk(chunk) {
    this.$http.post('/api/subjects/'+ this.$stateParams.id +'/chunks/', chunk);
  }

  get(id) {
    // var that = this;
    return this.$http.get('/api/subjects/' + this.$stateParams.id);
  }


}