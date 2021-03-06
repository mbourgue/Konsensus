'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

import button_user from './button-user/button-user.component';

export class NavbarComponent {

  constructor(Auth, $scope) {
    'ngInject';

    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;

    $scope.user_dropdown_is_extended = false;  
    $scope.ul_is_focus = false;
  }

}

export default angular.module('directives.navbar', [button_user])
  .component('navbar', {
    template: require('./navbar.pug'),
    controller: NavbarComponent
  })
  .name;
