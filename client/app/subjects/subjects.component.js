import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routes from './subjects.routes';

import create from './create/index';
import show from './show/index';

export class SubjectsController {

  /*@ngInject*/
  constructor($scope, $http, SubjectsFactory) {
    var that = this;
    this.$http = $http;

    SubjectsFactory.init();
    
    // $scope.subjects = SubjectsFactory.list;



    console.log($scope.subjects);

    // this.list = SubjectsFactory.list;
    this.list = [];
    SubjectsFactory.load(function(res) {
      that.list = res;
    });
    // this.list =  SubjectsFactory.get();
  }

  $onInit() {
  }
}

SubjectsFactory.$inject = ['$http']; 
export function SubjectsFactory($http) {

    var factory = {
      
      list: [],

      init: function() {
        this.load();
      },

      add: function(el) {
        this.list.push(el);
      },

      remove: function(subject) {
        // alert('remove');
        var that = this;
        $http.delete('/api/subjects/' + subject._id).then(
          function() { that.list.splice(that.list.indexOf(subject), 1)
        });
      },

      load: function(callback) {
        var that = this;
        $http.get('/api/subjects').then(function(response) {

          callback(response.data);
          that.list = response.data;
          // console.log(that.list);
          
        });
      },

      get: function(el) {
        if(el === undefined) 
          return this.list; 
        
        return this.list.indexOf(el);
        
      },

      length: function() {
        return this.list.length;
      }
    };

    return factory;
}

export default angular.module('konsensus.subjects', [create, show])
  .config(routes)
  .controller('SubjectsController', SubjectsController)
  .factory('SubjectsFactory', SubjectsFactory)
  .name;