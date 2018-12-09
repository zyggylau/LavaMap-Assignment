app.controller('feedbackViewController', function ($scope, $routeParams, UserFeedback) {

    $scope.loading = true;
    $scope.feedback = null;

    var init = function () {
        UserFeedback.find($routeParams.id).then(function (response) {
            $scope.loading = false;
            if (response.data.success) {
                $scope.feedback = response.data.feedback;
            }
        });
    };

    init();
});