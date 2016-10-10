var express = require('express'),
    navRouter = express.Router();

navRouter.get('/', function(req, res) {
	res.redirect('/index.html');
});

navRouter.get('/auth-test', function(req, res) {
	console.log(req.session);
	res.redirect('/');
});

module.exports = navRouter;