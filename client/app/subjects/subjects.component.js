import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routes from './subjects.routes';

import create from './create/index';
import show from './show/index';

export class SubjectsController {

  /*@ngInject*/
  constructor($scope, $filter, $http, SubjectsFactory, SearchbarService) {
    this.$http = $http;

    SubjectsFactory.init();

    this.search = SearchbarService;

    this.list = [];
    SubjectsFactory.load((res) => this.list = res);
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
        $http.delete('/api/subjects/' + subject._id).then(
          () => this.list.splice(that.list.indexOf(subject), 1)
        );
      },

      load: function(callback) {
        $http.get('/api/subjects').then((response) => {

          callback(response.data);
          this.list = response.data;
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