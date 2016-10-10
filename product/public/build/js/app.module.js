var app = angular.module('app', ['ui.router', 'appComponents', 'appControllers', 'appServices']);

app.config(['$stateProvider',
  function($stateProvider) {
    // An array of state definitions
    var states = [
      {
        name: 'home', 
        url: '',
        component: 'home'
      },

      {
        name: 'about',
        url: '/about',
        component: 'about'
      },

      {
        name: 'register',
        url: '/register',
        component: 'register'
      },

      {
        name: 'login',
        url: '/login',
        component: 'login'
      }
    ];

    states.forEach((state) => {
      $stateProvider.state(state);
    });
  }
]);




var appComponents = angular.module('appComponents', ['appControllers']);
var appControllers = angular.module('appControllers', []);

var appServices = angular.module('appServices', []);
appComponents.component('about', {
  template:  '<h3>Hello i am tuan</h3>'
})
appComponents.component('home', {
  templateUrl:  'partials/home.html'
})
appComponents.component('login', {
  templateUrl:  'partials/login.html',
  controller: 'loginController'
})
appComponents.component('register', {
  templateUrl:  'partials/register.html',
  controller: 'registerController'
})
appControllers.controller('authController', ['$scope',
	function($scope) {

	}
]);

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
appControllers.controller('registerController', ['$scope',
	function($scope) {

	}
]);
appServices.factory('authService', ['$http', 
	function($http) {

		var authLogic = {
			login: function(email, password, callback) {

				var promise = new Promise((fullfill, reject) => {
					$.ajax({
						url: 'http://127.0.0.1:1337/auth/login',
						method: 'POST',
						contentType: 'application/json',
						data: JSON.stringify({
							email: email,
							password: password
						}),
						success: fullfill,
						error: reject
					})
				});

				promise.then(
					function(data) { callback(null, data) },
					function(xhr, textStatus, errorThrown) { // xhr - XMLHttpRequest 
						callback(xhr.responseJSON, null) 
					}
				);
			}
		};

		return authLogic;
	}
]);