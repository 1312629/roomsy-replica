var passport = require('passport'),
	User = Utils.getDataModel('User');

exports.getSelf = function(req, res, next) {
	
	passport.authenticate('jwt', function(err, account, infoMessage) {
		
		if (err) return next(err);
		if (!account)
			return res.status(401).json({
                code: "Failed Authentication",
                msg: infoMessage
            });


		res.status(200).end("Hi you are in");

	})(req, res, next);
}