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

		User.findOne({email: account.email}, function(err, user) {
			if (err) return next(err);
			if (!user)
				return res.status(500).json({
					code: "Failed Database Query",
					msg: "cant find user"
				});

			res.status(200).json({
				code: "Successful get user",
				data: user
			});
		})

		

	})(req, res, next);
}