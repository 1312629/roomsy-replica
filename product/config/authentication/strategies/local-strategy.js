var passport = require('passport'),
    LocalStrategy = require('passport-local'),
    Account = Utils.getDataModel('Account');

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
            
            Account.findOne({ email: email }, function(err, account) {
                
                if (err) return done(err);
                if (account) return done(null, false, 'Email is already taken.');

                var newAccount = new Account({
                    email: email,
                    password: Account.generateHash(password)
                });

                newAccount.save(function(err) {

                    if (err) return done(err);
                    return done(null, newAccount);
                })
            })
        })
    );

    passport.use('local-login', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password'
        },
        function(email, password, done) {
            Account.findOne({ email: email }, function(err, account) {

                if (err) return done(err);
                if (!account) return done(null, false, 'No account was found.');
                if (!account.validPassword(password)) return done(null, false, 'Oops! Wrong password.');

                return done(null, account);
            })
        })
    );
}