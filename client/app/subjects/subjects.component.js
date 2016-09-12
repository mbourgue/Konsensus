import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routes from './subjects.routes';

import create from './create/index';

export class SubjectsController {

  /*@ngInject*/
  constructor($scope, $http) {
    this.$http = $http;

    this.load(function(datas) {
      $scope.subjects = datas;
    });

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
      {
        name: "Name hohoho",
        date: Date.now(),
        votes: 39,
        answers: 12,
        sources: 34,
        shared: 6,
        views: 92,
        user: {
          name: "Matthieu BOURGUE",
          influence: { points: 1345, pastille: {color: "#22CC33"} } 
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
      }
    ]; */



  }

  $onInit() {

  }

  load(callback) {
    this.$http.get('/api/subjects').then(function(response) {
      console.log(response.data);
      callback(response.data);
    });
  }

}

export default angular.module('konsensus.subjects', [create])
  .config(routes)
  .controller('SubjectsController', SubjectsController)
  .name;
