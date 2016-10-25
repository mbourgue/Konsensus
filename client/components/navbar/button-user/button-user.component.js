'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarButtonUserComponent {

  constructor(Auth, $scope) {
    'ngInject';

    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;

    $scope.user_dropdown_is_extended = false;  
  }

}

export default angular.module('directives.navbar.user', [])
  .component('navbarButtonUser', {
    template: require('./button-user.pug'),
    controller: NavbarButtonUserComponent
  })
  .name;
