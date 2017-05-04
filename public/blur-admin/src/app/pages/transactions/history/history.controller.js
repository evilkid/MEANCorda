(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions')
        .controller('HistoryCtrl', HistoryCtrl);

    /** @ngInject */
    function HistoryCtrl($scope, $http) {

        $scope.transactions = [];

        $scope.smartTablePageSize = 10;

        $http.get('/banks/transactions').then(
            //$http.get('/banks/rates').then(
            function success(response) {
                $scope.transactions = response.data;
                console.log(response);
            },
            function error(response) {
                console.log(response);
            }
        );

    }
})();