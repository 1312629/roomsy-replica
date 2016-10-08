var passport = require('passport'),
	jwt = require('jsonwebtoken'),
	jwtConfig = Utils.getConfig('authentication/jwt-options');

module.exports = function (req, res, next) {

	passport.authenticate('local-register', function(err, user, infoMessage) {

    	if (err) return next(err);
    	if (!user) return res.status(400).json({status: 'error', code: 'bad request', msg: infoMessage});

    	res.status(200).json({
    		token: jwt.sign({userId: user._id}, jwtConfig.secret) 
    	});

  	})(req, res, next);
}