'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('main', {
    name: 'main',
    url: '/',
    template: '<main></main>'
  });
  
}
