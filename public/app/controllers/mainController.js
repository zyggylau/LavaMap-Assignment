angular.module('mainControllers', ['authServices'])

    .controller('mainController', function ($http, $location, $rootScope, Auth) {

        var self = this;

        this.loggedUser = null;
        this.showContent = false;

        this.isActiveRoute = function (route) {
            return $location.path() === route;
        };

        $rootScope.$on('$routeChangeStart', function () {
            if (!Auth.isLoggedIn()) {
                self.loggedUser = null;
            } else {
                Auth.getUser().then(function (response) {
                    self.loggedUser = {
                        username: response.data.username
                    };
                });
            }

            self.showContent = true;

        });

        this.login = function (data) {
            self.loading = true;

            Auth.login(self.data).then(function (response) {
                self.successMsg = null;
                self.errorMsg = null;
                self.loading = false;
                if (response.data.success) {
                    // self.successMsg = response.data.message;
                    $location.path('/admin');
                    self.data = null;
                    self.successMsg = null;
                } else {
                    self.errorMsg = response.data.message;
                }
            });
        };

        this.logout = function () {
            Auth.logout();
            $location.path('/')
        };
    });