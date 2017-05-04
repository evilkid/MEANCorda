(function (angular) {
    "use strict";
    angular.module('BlurAdmin.authService', ["ngCookies"])
        .service('auth', AuthService);

    /** @ngInject */
    function AuthService($cookies) {
        var self = this;

        self._currentUser = null;
        self.currentUser = getCurrentUser();
        ///////

        function getCurrentUser() {
            if (self._currentUser === null) {

                if ($cookies.get("token")) {
                    $.ajax({
                        url: "/banks/identity",
                        async: false,
                        headers: {
                            Authorization: "JWT " + $cookies.get("token")
                        }
                    })
                        .done(function (data) {
                            self._currentUser = data;
                        })
                        .fail(function (data) {
                            console.log(data);
                        });
                }
            }

            return self._currentUser;
        }


    }

})(angular);