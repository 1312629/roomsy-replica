appControllers.controller('homeController', ['$scope', '$state', 'authService', 'apiService',
	function($scope, $state, authService, apiService) {

		$scope.authenticated = false;
		$scope.userInfo = '';

		apiService.getSelf(function(err, result) {

			if (err)
				return console.log('error loading user info:\n', err);

			
			alert('hehehe');
			console.log(result);
			$scope.authenticated = true;
			$scope.userInfo = result;
			$scope.$apply();
		})
	}
]);