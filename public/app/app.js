//TODO: angular using RequireJS
angular.module('userApp', ['appRoutes', 'userFeedbackServices', 'authServices', 'mainControllers', 'fileModelDirective'])
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptors');
    })
;