var app = angular.module('app', ['ui.router', 'appComponents', 'appControllers', 'appServices']);

app.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    // An array of state definitions
    var states = [
      {
        name: 'home', 
        url: '/',
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
  templateUrl:  'partials/home.html',
  controller: 'homeController'
})
appComponents.component('login', {
  templateUrl:  'partials/login.html',
  controller: 'loginController'
})
appComponents.component('register', {
  templateUrl:  'partials/register.html',
  controller: 'registerController'
})
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
appControllers.controller('registerController', ['$scope',
	function($scope) {

	}
]);
appServices.factory('apiService', ['$http', 
	function($http) {

		var apiLogic = {
			
			getSelf: function(callback) {

				var promise = new Promise((fullfill, reject) => {
					$.ajax({
						url: 'http://127.0.0.1:1337/api/self',
						method: 'GET',
						success: fullfill,
						error: reject
					})
				});

				promise.then(
					function(result) { callback(null, result) },
					function(xhr, textStatus, errorThrown) { // xhr - XMLHttpRequest 
						callback(xhr, null);
					}
				);
			}
		};

		return apiLogic;
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
					function(result) { callback(null, result) },
					function(xhr, textStatus, errorThrown) { // xhr - XMLHttpRequest 
						callback(xhr.responseJSON, null) 
					}
				);
			}
		};

		return authLogic;
	}
]);