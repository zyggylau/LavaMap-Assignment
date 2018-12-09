angular.module('authServices', [])

    .factory('Auth', function ($http, $q, AuthToken) {
        var authFactory = {};

        authFactory.login = function (data) {
            return $http.post('/api/authenticate', data).then(function (response) {
                AuthToken.setToken(response.data.token);
                return response;
            })
        };

        authFactory.logout = function () {
            AuthToken.removeToken();
        };

        authFactory.isLoggedIn = function () {
            return AuthToken.getToken();
        };

        authFactory.getUser = function () {
            if (!AuthToken.getToken()) {
                $q.reject({message: 'Token Empty'});
            }

            return $http.post('/api/userInfo');
        };

        return authFactory;
    })

    .factory('AuthToken', function ($window) {
        var authTokenFactory = {};

        authTokenFactory.setToken = function (token) {
            $window.localStorage.setItem('token', token);
        };

        authTokenFactory.removeToken = function () {
            $window.localStorage.removeItem('token');
        };

        authTokenFactory.getToken = function () {
            return $window.localStorage.getItem('token');
        };

        return authTokenFactory;
    })

    .factory('AuthInterceptors', function (AuthToken) {
        var authInterceptorsFactory = {};

        //append token of x-access-token to headers for each request
        authInterceptorsFactory.request = function (config) {
            var token = AuthToken.getToken();
            if (token) {
                config.headers['x-access-token'] = token;
            }

            return config;
        };

        return authInterceptorsFactory;
    })
;