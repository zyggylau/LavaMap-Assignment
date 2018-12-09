angular.module('fileModelDirective', [])

    .directive('fileModel', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var isMultiple = attrs.multiple;
                var modelSetter = model.assign;
                var maxFiles = 3;
                element.bind('change', function () {
                    var values = [];
                    var i = 0;
                    angular.forEach(element[0].files, function (item) {
                        if (i >= maxFiles) {
                            return;
                        }
                        item.viewUrl = URL.createObjectURL(item);
                        values.push(item);
                        i++;
                    });
                    scope.$apply(function () {
                        if (isMultiple) {
                            modelSetter(scope, values);
                        } else {
                            modelSetter(scope, values[0]);
                        }
                    });
                });
            }
        };
    });