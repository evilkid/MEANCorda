(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions')
        .controller('IssueCtrl', IssueCtrl);

    /** @ngInject */
    function IssueCtrl($scope, $http) {

        $scope.showSuccess = false;
        $scope.showError = false;
        $scope.currencies = [];
        $scope.peers = [];

        $scope.form = {
            to: null,
            amount: 0,
            currency: null
        };

        //amount slider
        var slider = null;

        $http.get('http://localhost:3000/banks/identity').then(
            function success(response) {
                if (!( response.data.name in $scope.peers )) {
                    console.log(response.data);
                    $scope.peers.push(response.data);
                    console.log($scope.peers);
                }

                response.data.advertisedServices.forEach(function (services) {
                    console.log(services.info.type.id);
                    if (services.info.type.id.indexOf("corda.issuer.") > -1) {

                        console.log(services.info.type.id.substr("corda.issuer.".length));
                        $scope.currencies.push(services.info.type.id.substr("corda.issuer.".length));
                    }

                });
            },
            function error(response) {
                console.log(response);
            }
        );

        $http.get('http://localhost:3000/banks/peers').then(
            function success(response) {
                console.log("first", $scope.peers);
                $scope.peers = $scope.peers.concat(response.data);
                console.log("then", $scope.peers);
                console.log(response.data);
            },
            function error(response) {
                console.log(response);
            }
        );


        $scope.sendIssue = function () {
            return $http.get('http://localhost:3000/banks/issue/' +
                $scope.form.to.name + '/' +
                $scope.form.amount + '/' +
                $scope.form.currency
            ).then(
                function success(response) {
                    if (response.data === "added") {
                        $scope.showSuccess = true;
                        $scope.showError = false;

                        $scope.form = {
                            to: null,
                            amount: 0,
                            currency: null
                        };

                        if (slider) {
                            slider.from = 0;
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

        $scope.rangeChangeCallback = function (sliderObj) {
            slider = sliderObj;
            $scope.form.amount = sliderObj.from;
        };
    }
})();