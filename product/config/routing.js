var express = require('express');

//------------------------------------------------------------------------
var apiRouter = Utils.getRouter('api'),
    navRouter = Utils.getRouter('nav'),
    authRouter = Utils.getRouter('auth');

//------------------------------------------------------------------------
var appRouter = express.Router();
appRouter.use('/', navRouter);
appRouter.use('/api', apiRouter);
appRouter.use('/auth', authRouter);

//------------------------------------------------------------------------
var configObject = {
	
	appRouter: appRouter
}

//------------------------------------------------------------------------
module.exports =  configObject;