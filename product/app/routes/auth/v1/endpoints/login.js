var passport = require('passport'),
	jwt = require('jsonwebtoken'),
	jwtConfig = Utils.getConfig('authentication/jwt-options');


module.exports = function (req, res, next) {

	passport.authenticate('local-login', function(err, user, infoMessage) {

    	if (err) return next(err);
    	if (!user) return res.status(401).json({status: 'error', code: 'unauthorized', msg: infoMessage});

    	res.status(200).json({
    		token: jwt.sign({userId: user._id}, jwtConfig.secret) 
    	});

  	})(req, res, next);	
}