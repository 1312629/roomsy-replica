var localSetup = require('./authentication/strategies/local-strategy'),
	jwtSetup = require('./authentication/strategies/jwt-strategy');


module.exports = function() {
	localSetup();
	jwtSetup();
}