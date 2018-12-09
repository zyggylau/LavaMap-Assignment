angular.module('userFeedbackServices', [])

    .factory('UserFeedback', function ($http) {
        var userFeedbackFactory = {};

        /**
         * Insert feedback to db
         * @param data
         * @returns {HttpPromise}
         */
        userFeedbackFactory.create = function (data) {
            var fd = new FormData();

            angular.forEach(data, function (value, key) {
                if (Array.isArray(value)) {
                    var valKey = key;
                    angular.forEach(value, function (value, key) {
                        fd.append(valKey, value);
                    })
                } else {
                    fd.append(key, value);
                }
            });

            return $http.post('/api/userFeedback', fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            });
        };

        userFeedbackFactory.findAll = function () {
            return $http.get('/api/userFeedback');
        };

        userFeedbackFactory.find = function (id) {
            return $http.get('/api/userFeedback/' + id);
        };

        return userFeedbackFactory;
    });