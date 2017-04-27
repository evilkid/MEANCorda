/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions', ['ui.select'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, authProvider) {


        $stateProvider
            .state('transactions', {
                url: '/transactions',
                template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
                abstract: true,
                title: 'Transactions',
                sidebarMeta: {
                    icon: 'ion-cash',
                    order: 100
                }
            })

            .state('transactions.pay', {
                url: '/pay',
                templateUrl: 'app/pages/transactions/pay/pay.html',
                controller: 'PayCtrl',
                title: 'Pay',
                sidebarMeta: {
                    order: 200
                }
            })
            .state('transactions.exchange', {
                url: '/exchange',
                templateUrl: 'app/pages/transactions/exchange/exchange.html',
                controller: 'ExchangeCtrl',
                title: 'Exchange',
                sidebarMeta: {
                    order: 300
                }
            })
            .state('transactions.history', {
                url: '/history',
                templateUrl: 'app/pages/transactions/history/history.html',
                controller: 'HistoryCtrl',
                title: 'History',
                sidebarMeta: {
                    order: 500
                }
            });

        if (isIssuer(authProvider.$get().currentUser)) {
            $stateProvider
                .state('transactions.exit', {
                    url: '/exit',
                    templateUrl: 'app/pages/transactions/exit/exit.html',
                    controller: 'ExitCtrl',
                    title: 'Exit',
                    sidebarMeta: {
                        order: 400
                    }
                })
                .state('transactions.issue', {
                    url: '/issue',
                    templateUrl: 'app/pages/transactions/issue/issue.html',
                    controller: 'IssueCtrl',
                    title: 'Issue',
                    sidebarMeta: {
                        order: 100
                    }
                });
        }

    }

    function isIssuer(identity) {
        if (identity && identity.advertisedServices) {
            return identity.advertisedServices.some(function (service) {
                return service.identity.indexOf("corda.issuer") !== -1;
            });
        }

        return false;
    }

})();
