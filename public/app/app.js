//TODO: angular using RequireJS
//TODO: feedbacks page pagination
angular.module('userApp', ['appRoutes', 'userFeedbackServices', 'authServices', 'mainControllers', 'fileModelDirective'])
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptors');
    })
;