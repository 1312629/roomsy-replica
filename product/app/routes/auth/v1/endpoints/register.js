var passport = require('passport'),
	jwt = require('jsonwebtoken'),
	jwtConfig = Utils.getConfig('authentication/jwt-options')
    User = Utils.getDataModel('User');

module.exports = function (req, res, next) {

    req.checkBody({
        'email': {notEmpty: true, isEmail: true},
        'password': {notEmpty: true},
        'firstname': {notEmpty: true},
        'lastname': {notEmpty: true},
        'country': {notEmpty: true},
        'size': {notEmpty: true},
        'phone': {notEmpty: true}
    });

    var errors = req.validationErrors();
    if (errors)
        return res.status(400).json({
            code: 'Failed Registration',
            msg: 'Validation errors.'
        });

	passport.authenticate('local-register', function(err, account, infoMessage) {

    	if (err) return next(err);
    	if (!user)
    		return res.status(400).json({
    			code: 'Failed Registration',
    			msg: infoMessage
    		});

        

    	res.status(200).json({
    		code: "Successful Authentication",
    		data: { token: jwt.sign({userId: user._id}, jwtConfig.secret, { algorithm: jwtConfig.algorithm }) } 
    	});

  	})(req, res, next);
}