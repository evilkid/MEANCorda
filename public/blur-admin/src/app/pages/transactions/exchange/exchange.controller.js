(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions')
        .controller('ExchangeCtrl', ExchangeCtrl);

    /** @ngInject */
    function ExchangeCtrl($scope, $http, $document) {

        $scope.showSuccess = false;
        $scope.showError = false;
        $scope.currencies = [];
        $scope.peers = [];

        $scope.form = {
            to: null,
            amount: 0,
            currency: null
        };

        var slider = null;
        $document.ready(function () {
            slider = $("#amountSlider").data("ionRangeSlider");
        });

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

        $http.get('http://localhost:3000/banks/peers').then(
            function success(response) {
                $scope.peers = response.data;
                console.log(response.data);
            },
            function error(response) {
                console.log(response);
            }
        );


        $scope.sendPay = function () {
            return $http.get('http://localhost:3000/banks/exchange/' +
                $scope.form.to.name + '/' +
                $scope.form.amount + '/' +
                $scope.form.currency.currency
            ).then(
                function success(response) {
                    if (response.data === "added") {
                        $scope.showSuccess = true;
                        $scope.showError = false;

                        $scope.form.currency.amount = $scope.form.currency.amount - $scope.form.amount;

                        if (slider) {
                            slider.update({
                                max: $scope.form.currency.amount - $scope.form.amount,
                                from: 0
                            });
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

        $scope.amountInputChange = function () {
            console.log(slider);
            if ($scope.form.amount < 0) {
                $scope.form.amount = 0;
            }

            if ($scope.form.amount > $scope.form.currency.amount) {
                $scope.form.amount = $scope.form.currency.amount;
            }

            if (slider) {
                slider.update({
                    from: $scope.form.amount
                });

            }
        };

        $scope.rangeChangeCallback = function (sliderObj) {
            $scope.form.amount = sliderObj.from;
            $scope.$digest();
        };
    }
})();