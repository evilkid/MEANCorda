(function () {
    'use strict';

    angular.module('BlurAdmin.pages.rates')
        .controller('ViewCtrl', ViewCtrl);

    /** @ngInject */
    function ViewCtrl($scope, $http) {

        $scope.rates = [];

        $http.get('/banks/rates').then(
            function success(response) {
                $scope.rates = response.data[0];
                console.log(response);
            },
            function error(response) {
                console.log(response);
            }
        );
    }
})();