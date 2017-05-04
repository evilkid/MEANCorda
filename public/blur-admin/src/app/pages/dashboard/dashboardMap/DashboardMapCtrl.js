/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .controller('DashboardMapCtrl', DashboardMapCtrl);

    /** @ngInject */
    function DashboardMapCtrl($scope, $timeout, $http, auth) {

        var map = null;
        $scope.peers = [];
        $scope.identity = null;


        $timeout(function () {
            initialize();
        }, 100);


        //getting peers
        $http.get("/banks/peers").then(
            function (response) {
                $scope.peers = response.data;

                $scope.peers.forEach(function (peer) {

                    peer.marker = new google.maps.Marker({
                        position: {lat: peer.location.coordinate.latitude, lng: peer.location.coordinate.longitude},
                        map: map,
                        title: peer.name
                    });

                    var infowindow = new google.maps.InfoWindow({
                        content: "<h3>" + peer.name + "</h3><br/><h4>" + peer.location.description + "</h4>"
                    });

                    peer.marker.addListener('click', function () {
                        infowindow.open(map, peer.marker);
                    });
                });
            }
        );

        //$http.get("/banks/identity").then(
        //function (response) {

        //}
        //);

        function initialize() {
            var mapCanvas = document.getElementById('google-maps');
            var mapOptions = {
                center: new google.maps.LatLng(37.5812492, 9.7676536),
                zoom: 3,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            map = new google.maps.Map(mapCanvas, mapOptions);

            $scope.identity = auth.currentUser;

            $scope.identity.marker = new google.maps.Marker({
                position: {
                    lat: $scope.identity.PhysicalLocation.coordinate.latitude,
                    lng: $scope.identity.PhysicalLocation.coordinate.longitude
                },
                map: map,
                title: $scope.identity.name
            });

            var infowindow = new google.maps.InfoWindow({
                content: "<h3>" + $scope.identity.name + "</h3><br/><h4>" + $scope.identity.PhysicalLocation.description + "</h4>"
            });

            $scope.identity.marker.addListener('click', function () {
                infowindow.open(map, $scope.identity.marker);
            });
        }

        /*
         $timeout(function () {
         initialize();
         }, 100); */
    }
})();