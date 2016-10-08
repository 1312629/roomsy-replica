var passport = require('passport'),
    express = require('express'),
    authRouter = express.Router();

authRouter.post('/register',
  passport.authenticate('local-register', { successRedirect: '/', failureRedirect: '/register.html' })
  );

authRouter.post('/login',
  passport.authenticate('local-login', { failureRedirect : '/failed.html' }),
  function(req, res) {
    console.log(req);
    res.end('hi');
  });


module.exports = authRouter;