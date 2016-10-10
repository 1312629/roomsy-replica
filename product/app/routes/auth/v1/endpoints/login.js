var passport = require('passport'),
	jwt = require('jsonwebtoken'),
	jwtConfig = Utils.getConfig('authentication/jwt-options');


module.exports = function (req, res, next) {

	passport.authenticate('local-login', function(err, account, infoMessage) {

    	if (err) return next(err);
    	if (!account) 
            return res.status(401).json({
                code: "Failed Authentication",
                msg: infoMessage
            });
    		

    	res.status(200).json({
            code: "Successful Authentication",
    		data: { token: jwt.sign({userId: account._id}, jwtConfig.secret) }
    	});

  	})(req, res, next);	
}