var express = require('express'),
    navRouter = express.Router();

navRouter.get('/', function(req, res) {
	res.redirect('/index.html');
});

navRouter.get('/auth-test', function(req, res) {
	console.log(req.session);
	res.redirect('/');
});

navRouter.get('/cookie-test', function(req, res) {

	// res.cookie('name', 'tobi');
	// res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });

	
	res.writeHead(200, {
		'Set-Cookie': ['name=tobi; Path=/', 'rememberme=1; Path=/; Expires=Sat, 08 Oct 2016 02:54:32 GMT; HttpOnly']
	})
	console.log(res.get('Set-Cookie'));
	res.end("Cookie Test");
})

module.exports = navRouter;