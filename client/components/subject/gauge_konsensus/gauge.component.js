'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class SubjectGaugeKonsensusComponent {

  constructor($scope) {
    'ngInject';

    $scope.value = 5;
    this.color = '#990009';
  }
}

export default angular.module('directives.subject.gauge_konsensus', [])
  .directive('gaugekonsensus', function() {
    return {
      template: require('./gauge.pug'),
      link: (scope, element, attrs, controller) => {
        // scope.$ctrl.value = attrs.value
        scope.value = attrs.value;
        console.log('oooooooooooooo');
        console.log('ok' + controller, '  ', attrs.value);
        // let value = ;
      },
      controller: SubjectGaugeKonsensusComponent,
      controllerAs: 'gaugeCtrl'
    };
  })
  .name;
