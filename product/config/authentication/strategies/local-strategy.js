var passport = require('passport'),
    LocalStrategy = require('passport-local');

// =========================================================================
// LOCAL STRATEGY SETUP
// =========================================================================
module.exports = function() {
    
    //Authencation Scheme for registering new User
    passport.use('local-register', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password'
        },
        function(email, password, done) {
            
            User.findOne({ email: email }, function(err, user) {
                
                if (err) return done(err);
                if (user) return done(null, false, 'Email is already taken.');

                var newUser = new User({
                    email: email,
                    password: User.generateHash(password)
                });

                newUser.save(function(err) {

                    if (err) return done(err);
                    return done(null, newUser);
                })
            })
        })
    );

    passport.use('local-login', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password'
        },
        function(email, password, done) {
            User.findOne({ email: email }, function(err, user) {

                if (err) return done(err);
                if (!user) return done(null, false, { message: 'No user found.' });
                if (!user.validPassword(password)) return done(null, false, { message: 'Oops! Wrong password.' });

                return done(null, user);
            })
        })
    );
}