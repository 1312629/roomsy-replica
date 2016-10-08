appControllers.controller('responseController', ['$scope',
    function ($scope) {
        $scope.response = '';
        $scope.$on('response', function(events, value) {
            $scope.response = value;
            $scope.$apply();
        })
    
    }]);