var app = angular.module('appRoutes', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/views/pages/home.html'
        })
        .when('/add', {
            templateUrl: 'app/views/front/add.html',
            controller: 'frontController',
            controllerAs: 'vm',
        })

        .when('/login', {
            templateUrl: 'app/views/front/login.html'
        })

        .when('/admin', {
            templateUrl: 'app/views/admin/feedback/index.html',
            controller: 'feedbacksController',
            controllerAs: 'vm',
            adminOnly: true
        })

        .when('/admin/:id', {
            templateUrl: 'app/views/admin/feedback/view.html',
            controller: 'feedbackViewController',
            controllerAs: 'vm',
            adminOnly: true
        })

        .otherwise({
            templateUrl: 'app/views/pages/errors/404.html'
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});

app.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {

        //redirect non logged in visitors
        if (next.$$route.adminOnly && !Auth.isLoggedIn()) {
            event.preventDefault();
            $location.path('/');
        }
    })
}]);

