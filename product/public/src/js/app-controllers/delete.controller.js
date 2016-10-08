appControllers.controller('deleteController', ['$scope', '$rootScope',
    function ($scope, $rootScope) {
        
        $scope.id = "";
        
        $scope.clientDeleteAll = function() {
            
            $.ajax(window.location.origin + '/api/students', {
                type: 'DELETE',
                success: function(result) {
                    $rootScope.$broadcast('response', result);
                }
            })
        }
        
        $scope.clientDelete = function() {
            if (!$scope.id) return;
            
            $.ajax(window.location.origin + '/api/students/' + $scope.id, {
                type: 'DELETE',
                success: function(result) {
                    $rootScope.$broadcast('response', result);
                }
            })
        }
    
    }]);