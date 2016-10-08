appControllers.controller('putController', ['$scope', '$rootScope',
    function ($scope, $rootScope) {
        $scope.id = "";
        $scope.hoten = "";
        $scope.mssv = "";
           
        $scope.clientPut = function() {
            
            if (!$scope.id) return;
            
            $.ajax(window.location.origin + '/api/students/' + $scope.id, {
                type: 'PUT',
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