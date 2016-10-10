appControllers.controller('homeController', ['$scope', '$state', 'authService', 'apiService',
	function($scope, $state, authService, apiService) {

		$scope.authenticated = false;
		$scope.message = 'You\'re not logged in';
		$scope.logout = function() {
			Cookies.remove('token');
			$state.reload();
		}

		apiService.getSelf(function(err, result) {

			if (err)
				return console.log('error loading user info:\n', err);

			console.log(result);
			$scope.authenticated = true;
			$scope.message = 'Welcom ' + result.data.firstname + ' ' + result.data.lastname;
			$scope.$apply();
		})
	}
]);