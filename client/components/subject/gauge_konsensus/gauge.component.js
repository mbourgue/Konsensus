'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

// import './gauge.scss';

export class SubjectGaugeKonsensusComponent {

  constructor($scope) {
    'ngInject';

    // this.isLoggedIn = Auth.isLoggedInSync;
    // this.isAdmin = Auth.isAdminSync;
    // this.getCurrentUser = Auth.getCurrentUserSync;

    $scope.value = 5;
    this.color = "#990009";

    
  }

  

}

export default angular.module('directives.subject.gauge_konsensus', [])
  .directive('gaugekonsensus', function() {
    return {
      template: require('./gauge.pug'),
      link: function(scope, element, attrs, controller) {

        // scope.$ctrl.value = attrs.value
        scope.value = attrs.value;
        console.log(controller,'  ',attrs.value);
        // let value = ;
      },
    controller: SubjectGaugeKonsensusComponent,
    };
    // controllerAs: 'gaugeCtrl'
  })
  .name;
