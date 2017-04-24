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
                title: 'Rates',
                sidebarMeta: {
                    icon: 'ion-stats-bars',
                    order: 200
                }
            })
            .state('rates.view', {
                url: '/view',
                title: 'View',
                sidebarMeta: {
                    order: 100
                }
            })
            .state('rates.add', {
                url: '/add',
                title: 'Add',
                sidebarMeta: {
                    order: 200
                }
            })
        ;
    }

})();
