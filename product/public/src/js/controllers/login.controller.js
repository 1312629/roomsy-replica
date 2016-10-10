appControllers.controller('loginController', ['$scope', '$state', 'authService',
	function($scope, $state, authService) {
		$scope.email = '';
		$scope.password = '';


		$scope.login = function() {

			authService
				.login($scope.email, $scope.password, function(err, result) {

					if (err) return window.alert(err.msg);


					var token = result.data.token; console.log(token);

					Cookies.set('token', token, { expires: 365 });
					$state.go('home');
				})
		}
	}
]);