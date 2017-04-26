(function () {
    'use strict';

    angular.module('BlurAdmin.pages.rates')
        .controller('AddCtrl', AddCtrl);

    /** @ngInject */
    function AddCtrl($scope, $http) {

        $scope.showSuccess = false;
        $scope.showError = false;

        $scope.form = {
            from: '',
            to: '',
            rate: 10
        };

        $scope.addRate = function () {
            console.log($scope);

            return $http.get('http://localhost:3000/banks/rates/' +
                $scope.form.from + '/' +
                $scope.form.to + '/' +
                $scope.form.rate
            ).then(
                function success(response) {
                    if (response.data === "added") {
                        $scope.showSuccess = true;
                        $scope.showError = false;

                        $scope.form = {
                            from: '',
                            to: '',
                            rate: 10
                        };
                    } else {
                        $scope.showSuccess = false;
                        $scope.showError = true;
                    }
                    console.log(response);
                },
                function error(response) {
                    console.log(response);
                }
            );

        };

        $scope.rangeChangeCallback = function (sliderObj) {
            $scope.form.rate = sliderObj.from;
        };
    }
})();