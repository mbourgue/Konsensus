'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class SearchbarController {

  constructor($scope, $state, SearchbarService) {
    'ngInject';
    
    $scope.changeSearch = function(text) {
      SearchbarService.change(text);
      $state.transitionTo('subjects');
    }
    
  }

}

export class SearchbarService {

  constructor(Auth) {
    'ngInject';

      this.text = "";
      this.change = function(newText) {
        this.text = newText;
      }
  }

}

export default angular.module('konsensusApp.searchbar', [])
  .service('SearchbarService', SearchbarService)
  .directive('searchbar', function() {
    return {
      template: require('./searchbar.pug'),
      restrict: 'EA',
      controller: SearchbarController,
      scope: {
        classes: '@'
      },
      link: function(scope, element, attributes){
        element.addClass('searchbar');
      }
    };
  })
  .name;
