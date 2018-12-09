app.controller('feedbacksController', function ($scope, UserFeedback) {

    $scope.loading = true;
    $scope.feedbacks = null;

    var init = function () {
        UserFeedback.findAll().then(function (response) {
            $scope.loading = false;

            if (response.data.success) {
                $scope.feedbacks = response.data.feedbacks;
            }
        });
    };

    init();
});