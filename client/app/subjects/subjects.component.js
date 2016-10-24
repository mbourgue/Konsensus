import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routes from './subjects.routes';

import create from './create/index';
import show from './show/index';

export class SubjectsController {

  /*@ngInject*/
  constructor($scope, $filter, $http, SubjectsFactory, SearchbarService) {
    this.$http = $http;

    this.service = SubjectsFactory;
    this.search = SearchbarService;

    SubjectsFactory.init();
  }

  $onInit() {
  }
}

export function SubjectsFactory($http, Auth) {
    'ngInject';

    return {
      
      list: [],

      init: function() {
        this.load();
      },

      add: function(el) {
        this.list.push(el);
      },

      remove: function(subject) {
        if(Auth.isAdminSync) {  // Admin Check
          $http.delete('/api/subjects/' + subject._id).then(
            () => this.list.splice(this.list.indexOf(subject), 1)
          );
        }
      },

      load: function(callback) {
        $http.get('/api/subjects').then((response) => {
          this.list = response.data;
        });
      },

      // when .get() (no parameters) it return the complete list
      get: function(el) {
        if(el === undefined) 
          return this.list; 

        return this.list.indexOf(el);
      },

      length: function() {
        return this.list.length;
      }
    };
}

export default angular.module('konsensus.subjects', [create, show])
  .config(routes)
  .controller('SubjectsController', SubjectsController)
  .factory('SubjectsFactory', SubjectsFactory)
  .name;