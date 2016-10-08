appControllers.controller('postController', ['$scope', '$rootScope',
    function ($scope, $rootScope) {
        $scope.hoten = "tuanmap";
        $scope.mssv = "1312663";
        
        $scope.clientPost = function() {
            $.ajax(window.location.origin + '/api/students', {
                type: 'POST',
                data: {
                    hoten: $scope.hoten,
                    mssv: $scope.mssv
                },
                success: function(result) {
                    $rootScope.$broadcast('response', result);
                }
            })
        }
    }]);