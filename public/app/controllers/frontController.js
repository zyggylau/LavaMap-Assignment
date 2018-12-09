app.controller('frontController', function ($scope, $timeout, UserFeedback) {

    $scope.formData = null;
    $scope.loading = false;

    $scope.formSubmit = function () {
        if (!$scope.form.$valid) {
            return;
        }

        $scope.loading = true;

        UserFeedback.create($scope.formData).then(function (response) {
            $scope.successMsg = null;
            $scope.errorMsg = null;
            $scope.loading = false;

            if (response.data.success) {
                $scope.successMsg = response.data.message;
                $scope.formReset();
            } else {
                $scope.errorMsg = response.data.message;
            }
        });
    };

    $scope.formReset = function () {
        $scope.form.$setPristine();
        $scope.form.$setUntouched();
        $scope.formData = null;
        angular.forEach(
            angular.element("input[type='file']"), function (inputElem) {
                angular.element(inputElem).val(null);
            }
        );

        $scope.errorMsg = null;
        $timeout(function () {
            $scope.successMsg = null;
        }, 2500);
    };
});