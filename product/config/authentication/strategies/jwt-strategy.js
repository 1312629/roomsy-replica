var passport = require('passport'),
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    jwtConfig = Utils.getConfig('authentication/jwt-options');

module.exports = function() {

    passport.use('jwt', new JwtStrategy({
            secretOrKey: jwtConfig.secret,
            jwtFromRequest: ExtractJwt.fromAuthHeader()
        },
        function(jwt_payload, done) {

            User.findOne({id: jwt_payload.userId}, function(err, user) {
                if (err) return done(err);
                if (!user) return done(null, false, 'Invalid Token');
                return done(null, user);
            })
        })
    );
}