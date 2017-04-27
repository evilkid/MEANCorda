(function (angular) {
    "use strict";
    angular.module('BlurAdmin')
        .factory('authInterceptor', authInterceptorFactory);

    /** @ngInject */
    function authInterceptorFactory($q, $cookies) {
        return {
            request: function (config) {
                config.headers = config.headers || {};

                if ($cookies.get("token")) {
                    config.headers['Authorization'] = "JWT " + $cookies.get("token");
                }

                return config;
            },
            responseError: function (response) {
                if (response.status === 401) {
                    window.location = "/login";
                }
                return $q.reject(response);
            }
        };

    }


    angular.module('BlurAdmin').config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });
})(angular);