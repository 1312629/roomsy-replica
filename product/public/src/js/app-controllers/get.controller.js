appControllers.controller('getController', ['$scope', '$rootScope',
    function ($scope, $rootScope) {
        
        $scope.id = "";
        
        $scope.clientGetAll = function() {
            $.ajax(window.location.origin + '/api/students', {
                type: 'GET',
                success: function(result) {
                    result = "There are total " + Object.keys(result).length + ' students' + "\n" + JSON.stringify(result, undefined, 4);
                    $rootScope.$broadcast('response', result);
                }
            })
        }
        
        $scope.clientGet = function() {
            if (!$scope.id) return;
            
            $.ajax(window.location.origin + '/api/students/' + $scope.id, {
                type: 'GET',
                success: function(result) {
                    $rootScope.$broadcast('response', result);
                }
            })
        }
    }]);