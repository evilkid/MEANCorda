(function () {
    'use strict';

    angular.module('BlurAdmin.pages.rates')
        .controller('AddCtrl', AddCtrl);

    /** @ngInject */
    function AddCtrl($scope, $http, $document) {

        $scope.showSuccess = false;
        $scope.showError = false;

        $scope.form = {
            from: '',
            to: '',
            rate: 10
        };


        var slider = null;
        $document.ready(function () {
            slider = $("#rateSlider").data("ionRangeSlider");
        });

        $scope.addRate = function () {
            console.log($scope);

            return $http.get('/banks/rates/' +
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

                        if (slider) {
                            slider.update({
                                from: 10
                            });
                        }

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

        $scope.rateInputChange = function () {
            console.log(slider);
            if ($scope.form.rate < 0) {
                $scope.form.rate = 0;
            }

            if ($scope.form.rate > 100) {
                $scope.form.rate = 100;
            }

            if (slider) {
                slider.update({
                    from: $scope.form.rate
                });

                //slider.from = $scope.form.rate;
            }
        };

        $scope.rangeChangeCallback = function (sliderObj) {
            $scope.form.rate = sliderObj.from;
            $scope.$digest();
        };
    }
})();