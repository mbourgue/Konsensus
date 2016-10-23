'use strict';

import jQuery from 'jquery';

export default class ShowSubjectController {

  /*@ngInject*/
  constructor($http, $stateParams, $scope, $sce, $anchorScroll, $location) {
    
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.$scope = $scope;

    $scope.trustedHtml = function (plainText) {
      return $sce.trustAsHtml(plainText);
    }

    // $scope.myHtml = "";
    $scope.froalaOptions = {
      toolbarButtons: [ 'insertLink', 'insertImage', 'insertVideo', 'insertFile', '|', 'undo', '|', 'fullscreen', 'bold', 'italic', 'underline', 'strikeThrough',/* 'subscript', 'superscript',*/ 'fontFamily', 'fontSize', '|', 'quote', '|', 'color', 'emoticons', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', '|', 'insertTable', '|', 'insertHR', /* 'redo' */, 'clearFormatting', /*'selectAll'*/, 'html'],
        // toolbarButtons : ["bold", "italic", "underline", "|", "align", "formatOL", "formatUL"],
        // events: {
            // 'froalaEditor.initialized': function () {
                // Use the methods like this.
                // $scope.froalaOptions.froalaEditor('selection.get');
            // }
        // }
      height: 350,

      codeBeautifierOptions: {
  end_with_newline: true,
  indent_inner_html: true,
  extra_liners: "['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'ul', 'ol', 'table', 'dl']",
  brace_style: 'expand',
  indent_char: ' ',
  indent_size: 4,
  wrap_line_length: 0
}
    }

    $scope.subject = {};
    var that = this;
    this.get(this.$stateParams.id).then(function(response) {
      console.log(response);
      $scope.subject = response.data;
    });

    // Etat des onglets du Sujet:
    //    - 0 : Resultat
    //    - 1+: Sujet
    $scope.state = {

      active: 0,

      load(tag) {
        console.log('tag: ' + tag._id);
        that.$http.get('/api/subjects/' + that.$stateParams.id + '/tag/' + tag._id).then(response => {
          tag.chunks = response.data;
          console.log(response.data);
        });
      },
      setResult() {
        this.active = 0;
        // this.load();
        that.$http.get('/api/subjects/' + that.$stateParams.id + '/chunks/result').then(response => {
          // $scope.subject.chunks = response.data;
          $scope.subject.result = response.data;
          console.log('Subject' + response.data);
        });
      },
      setSubject(id, tag) {
        this.active = id;
        this.load(tag);
      },
      isResult() {
        return this.active == 0;
      }
    };



    $scope.gotoBottom = function() {
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash('contribute');

      // call $anchorScroll()
      $anchorScroll();
    };




    $scope.state.setResult();
  }

  createChunk(chunk) {
    if(!chunk.title) {
      console.log('No Tag !');
      return;
    }

    this.smash(chunk);
    console.log(chunk);
    this.$http.post('/api/subjects/' + this.$stateParams.id + '/chunks/' + chunk.title /* (tag) */, chunk).then(
      () => {
        
        // if(!this.$scope.state.isResult())
          // this.$scope.subject.chunks.push(chunk)
      } 
    );
  }

  /*
    Smash a chunk and get Fragment of it
  */
  smash(chunk) {
    chunk.fragments = [];
    let html = jQuery.parseHTML(chunk.content);
    console.log(html);
    for(var i = 0; i < html.length; i++) {
      console.log(html[i]);
      console.log(html[i].innerHTML);
      if(html[i].innerHTML !== "" && html[i].innerHTML !== "<br>")
        chunk.fragments.push({ html: html[i].outerHTML });
    }
    console.log(chunk.fragments);
  }

  voteChunk(chunk, value) {
    // if(value === '+') {
      console.log('VoTe' + "dqsddqsd");
        chunk.score += 1;
      this.$http.post('/api/subjects/' + this.$stateParams.id + '/chunks/' + chunk._id + '/vote').then(() => {
        // this.
      });
    // }
    // else{
    // }
  }

  removeChunk(chunk) {
    this.$http.delete('/api/subjects/' + this.$stateParams.id + '/chunks/' + chunk._id);
  }

  get() {
    return this.$http.get('/api/subjects/' + this.$stateParams.id);
  }
}
