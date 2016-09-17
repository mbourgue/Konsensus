import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routes from './subjects.routes';

import create from './create/index';
import show from './show/index';

export class SubjectsController {

  /*@ngInject*/
  constructor($scope, $filter, $http, SearchbarService) {
    var that = this;
    this.$http = $http;
    this.list = [];
    this.load(function(datas) {
      that.list = datas;
    });

    this.search = SearchbarService;

/*
    $scope.subjects = [
      {
        name: "Name hohoho",
        date: Date.now(),
        votes: 39,
        answers: 12,
        sources: 31,
        shared: 6,
        views: 92,
        user: {
          name: "Matthieu BOURGUE",
          influence: { points: 1345, pastille: {color: "#22EE33"} } 
        },
        tags: [
          {
            name: 'Politics'
          },
          {
            name: 'Nutrition'
          },
          {
            name: 'Future'
          }
        ]
      },
*/


  }

  $onInit() {

  }

  load(callback) {
    this.$http.get('/api/subjects').then(function(response) {
      // console.log(response.data);
      callback(response.data);
    });
  }

  remove(subject) {
    // alert('remove');
    var that = this;
    this.$http.delete('/api/subjects/' + subject._id).then(
      function() { that.list.splice(that.list.indexOf(subject), 1)
      });
  }

}

export default angular.module('konsensus.subjects', [create, show])
  .config(routes)
  .controller('SubjectsController', SubjectsController)
  .name;
