//!!!!!!!!!!!!!!!!!!!!!
//This is where i put experimental code that may become usable in the future (DO NOT RUN THIS FILE)


var LocalStrategy = require('passport-local');


// =========================================================================
// Session setup
// =========================================================================
passport.serializeUser(function(user, done) {
        console.log('serializing user:', user);
        done(null, user.id); //Save user.id in session table
    });

passport.deserializeUser(function(serializedKey, done) {
    //SerializedKey is user.id
    console.log('deserializing user with id:', serializedKey);
    User.findById(serializedKey, function(err, user) {
        if (err) return cb(err);
        done(err, user);
    });
});

// =========================================================================
// LOCAL STRATEGY SETUP
// =========================================================================
var localSetup = function() {

    passport.use('local-register', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password'
        },
        function(email, password, done) {
            console.log('here');
            User.findOne({ local: { email: email } }, function(err, user) {

                console.log('here');
                if (err) return done(err);
                if (user) return done(null, false, { message: 'Email is already taken.' });

                var newUser = new User({
                    local: {
                        email: email,
                        password: User.generateHash(password)
                    }
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
            User.findOne({ local: { email: email } }, function(err, user) {

                if (err) return done(err);
                if (!user) return done(null, false, { message: 'No user found.' });
                if (!user.validPassword(password)) return done(null, false, { message: 'Oops! Wrong password.' });

                return done(null, user);
            })
        })
    );
}