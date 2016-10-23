'use strict';

export default class CreateSubjectController {

  /*@ngInject*/
  constructor($scope, $http, $location) {
    this.$http = $http;
    this.$scope = $scope;
    this.$location = $location;
  }

  // transform: 'tag1;tag2;tag3' to [{ name: 'tag1'}, { name: 'tag2'}, { name: 'tag3'}]
  // for the body of the backend POST request
  //
  smashTags(subject) {
    let tags = subject.tags.split(';');
    subject.tags = [];
    console.log(tags);
    tags.map((current) => {
      subject.tags.push({ name: current });
    }); 
  }

  create(subject) {

    this.smashTags(subject);

    console.log(subject);

    this.$http.post('/api/subjects', subject).then(() => {
      console.log('Subject Added !');
      that.$location.path('subjects');  
    });
  }

}
