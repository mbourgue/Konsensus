'use strict';

import jquery from 'jquery';
import angular from 'angular';
import ShowSubjectController from './show.controller';

require('froala-editor/js/froala_editor.min.js');

require('froala-editor/js/plugins/quote.min.js');
// require('froala-editor/js/plugins/paragraph_style.min.js');
// require('froala-editor/js/plugins/paragraph_style.min.js');
require('froala-editor/js/plugins/colors.min.js');
require('froala-editor/css/plugins/colors.min.css');

require('froala-editor/js/plugins/link.min.js')

require('froala-editor/js/plugins/font_family.min.js');

require('froala-editor/js/plugins/video.min.js');
require('froala-editor/css/plugins/video.min.css');

require('froala-editor/js/plugins/url.min.js');

require('froala-editor/js/plugins/table.min.js');

require('froala-editor/js/plugins/code_view.min.js');
require('froala-editor/css/plugins/code_view.min.css');

require('froala-editor/js/plugins/code_beautifier.min.js');

require('angular-froala');


export default angular.module('konsensus.subjects.show', ['froala'])
    
    .value('froalaConfig', {
        toolbarInline: false,
        placeholderText: 'Enter Text Here'
    })
    .controller('ShowSubjectController', ShowSubjectController)
    .factory('SubjectFactory', function() {
        
    })
    .directive('vote', function() {
        

        return {
            
            scope: {
            points: '=points'
            },
            template: function(elem,attr) {
                // console.log(SubjectsFactory.list);
                console.log(attr.points);
                var color = "";
                // if(attr.points === 0) {
                    color = "#999999";
                // }else{
                    // color = "#EA4500";
                // }

                return '<span class="circle fa fa-circle" style="color: '+color+'")></span>'
            },
            link: function(scope, element, attrs) {

                console.log("ooo " + scope.subject);
                // scope.subject

            }
        };
    } )
    .name;