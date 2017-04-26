/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.rates', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('rates', {
                url: '/rates',
                template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
                abstract: true,
                title: 'Rates',
                sidebarMeta: {
                    icon: 'ion-stats-bars',
                    order: 200
                }
            })
            .state('rates.view', {
                url: '/view',
                templateUrl: 'app/pages/rates/view/view.html',
                controller: 'ViewCtrl',
                title: 'View',
                sidebarMeta: {
                    order: 100
                }
            })
            .state('rates.add', {
                url: '/add',
                templateUrl: 'app/pages/rates/add/add.html',
                controller: 'AddCtrl',
                title: 'Add',
                sidebarMeta: {
                    order: 200
                }
            })
        ;
    }

})();
