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
						callback({
							
							status: { xhr.status : xhr. statusText },
							response: xhr.responseJSON,
						} , null) 
					}
				);
			}
		};

		return authLogic;
	}
]);