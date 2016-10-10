var express = require('express'),
    authRouter = express.Router();

var v1Router = require('./auth/v1/authRouter');

//versioning authencation
authRouter.use('/v1', v1Router);

//latest authencation
var latest = v1Router;
authRouter.use('/', v1Router);


module.exports = authRouter;