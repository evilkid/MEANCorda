/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .controller('MsgCenterCtrl', MsgCenterCtrl);

    /** @ngInject */
    function MsgCenterCtrl($scope, $sce, $http) {

        $http.get('/banks/notifications').then(
            function success(response) {
                console.log(response);
                $scope.notifications = response.data;
                console.log(response);
            },
            function error(response) {
                console.log(response);
            }
        );

        $scope.notifications = [];


        $scope.getMessage = function (notification) {
            var text = "<strong>" + notification.sender + "</strong> has ";

            switch (notification.type) {
                case "pay":
                    text += "paid you ";
                    break;
                case "issue":
                    text += "issued to you ";
                    break;
                case "exchange":
                    text += "exchanged to you ";
                    break;
            }

            text += notification.amount + " " + notification.product;

            return $sce.trustAsHtml(text);
        };

        $scope.markAsRead = function () {
            $http.put('/banks/notifications').then(
                function success(response) {
                    $scope.notifications = [];
                    console.log(response);
                },
                function error(response) {
                    console.log(response);
                }
            );
        }
    }
})();