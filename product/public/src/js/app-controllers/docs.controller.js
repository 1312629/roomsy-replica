appControllers.controller('docsController', ['$scope',
    function ($scope) {
        
        $scope.test = "A";
    	$scope.api = "hello";

        $.getJSON('data/api-doc.json', function(data) {
        	$scope.api = data;
        	$scope.$apply();
        });

        $scope.alert = alert.bind(window);
    }]);