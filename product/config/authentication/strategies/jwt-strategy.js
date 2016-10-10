var passport = require('passport'),
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    jwtConfig = Utils.getConfig('authentication/jwt-options'),
    Account = Utils.getDataModel('Account');

module.exports = function() {

    passport.use('jwt', new JwtStrategy({
            secretOrKey: jwtConfig.secret,
            jwtFromRequest: function(req) { console.log(req.cookies); return req.cookies['token'] },
            algorithms: [jwtConfig.algorithm]
        },
        function(jwt_payload, done) {

            Account.findById(jwt_payload.userId, function(err, account) {
                if (err) return done(err);
                if (!account) return done(null, false, 'Invalid Token');
                return done(null, account);
            })
        })
    );
}