appControllers.controller('registerController', ['$scope', '$state', 'authService',
	function($scope, $state, authService) {
		$scope.email = '';
		$scope.password = '';
		$scope.firstname = '';
		$scope.lastname = '';
		$scope.country = '';
		$scope.size = 0;
		$scope.phone = '';

		$scope.register = function() {
			authService.register({
				email: $scope.email,
				password: $scope.password,
				firstname: $scope.firstname,
				lastname: $scope.lastname,
				country: $scope.country,
				size: $scope.size,
				phone: $scope.phone
			}, function(err, result) {

				if (err) {
					return console.log(err);
				}

				var token = result.data.token; console.log(token);

				Cookies.set('token', token, { expires: 365 });
				$state.go('home');
			})
		}
	}
]);