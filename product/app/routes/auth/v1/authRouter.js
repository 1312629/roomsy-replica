var express = require('express'),
	authRouter = express.Router();

authRouter.post('/register', require('./endpoints/register'));
authRouter.post('/login', require('./endpoints/login'));

module.exports = authRouter;