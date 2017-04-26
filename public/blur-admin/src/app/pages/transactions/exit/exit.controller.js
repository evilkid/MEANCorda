(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions')
        .controller('ExitCtrl', ExitCtrl);

    /** @ngInject */
    function ExitCtrl($scope, $http) {

        $scope.showSuccess = false;
        $scope.showError = false;
        $scope.currencies = [];

        $scope.form = {
            amount: 0,
            currency: null
        };

        //amount slider
        var slider = null;

        $http.get('http://localhost:3000/banks/balance').then(
            function success(response) {
                for (var key in response.data) {
                    console.log(key, response.data[key]);
                    $scope.currencies.push({currency: key, amount: response.data[key].quantity});
                }
            },
            function error(response) {
                console.log(response);
            }
        );


        $scope.sendPay = function () {
            return $http.get('http://localhost:3000/banks/exit/' +
                $scope.form.amount + '/' +
                $scope.form.currency.currency
            ).then(
                function success(response) {
                    if (response.data === "added") {
                        $scope.showSuccess = true;
                        $scope.showError = false;

                        $scope.form.currency.amount = $scope.form.currency.amount - $scope.form.amount;

                        if (slider) {
                            slider.max = $scope.form.currency.amount - $scope.form.amount;
                            slider.from = 0;
                        }

                        $scope.form = {
                            to: null,
                            amount: 0,
                            currency: null
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
            slider = sliderObj;
            $scope.form.amount = sliderObj.from;
        };
    }
})();