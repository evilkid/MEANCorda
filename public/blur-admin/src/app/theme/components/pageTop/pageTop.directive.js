/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .directive('pageTop', pageTop);

    /** @ngInject */
    function pageTop($cookies) {
        return {
            restrict: 'E',
            link: function (scope, elem, attrs) {
                scope.signout = function () {
                    $cookies.remove("token");
                    window.location = "/login";
                }
            },
            templateUrl: 'app/theme/components/pageTop/pageTop.html'
        };
    }

})();