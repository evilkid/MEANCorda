/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('transactions', {
                url: '/transactions',
                template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
                abstract: true,
                title: 'Transactions',
                sidebarMeta: {
                    icon: 'ion-cash',
                    order: 100
                }
            })
            .state('transactions.issue', {
                url: '/issue',
                title: 'Issue',
                sidebarMeta: {
                    order: 100
                }
            })
            .state('transactions.pay', {
                url: '/pay',
                title: 'Pay',
                sidebarMeta: {
                    order: 200
                }
            })
            .state('transactions.exchange', {
                url: '/exchange',
                title: 'Exchange',
                sidebarMeta: {
                    order: 300
                }
            })
            .state('transactions.exit', {
                url: '/exit',
                title: 'Exit',
                sidebarMeta: {
                    order: 400
                }
            })
            .state('transactions.history', {
                url: '/history',
                templateUrl: 'app/pages/transactions/history/history.html',
                title: 'History',
                sidebarMeta: {
                    order: 500
                }
            })
        ;
    }

})();
