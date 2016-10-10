appControllers.controller('loginController', ['$scope', '$state', 'authService',
	function($scope, $state, authService) {
		$scope.email = '';
		$scope.password = '';

		$scope.login = function() {

			authService
				.login($scope.email, $scope.password, function(err, data) {
					if (err) {
						console.log(err);
						return;
					}

					console.log('Success');
					console.log(data);
				})
		}
	}
]);