'use strict';

import angular from 'angular';
import ShowSubjectController from './show.controller';

export default angular.module('konsensus.subjects.show', [])
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