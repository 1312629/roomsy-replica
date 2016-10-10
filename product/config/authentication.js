var localSetup = require('./authentication/strategies/local-strategy'),
	jwtSetup = require('./authentication/strategies/jwt-strategy'),
	jwtConfig = require('./authentication/jwt-options');

module.exports = function() {
	localSetup();
	jwtSetup();

	return jwtConfig;
}