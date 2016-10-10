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