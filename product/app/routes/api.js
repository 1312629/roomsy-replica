var express = require('express'),
    apiRouter = express.Router(),
    fs = require('fs'),
    path = require('path');

var apiDirectory = Utils.app_path('routes/api'),
	apiMounts = fs.readdirSync(apiDirectory)
					.filter(f => fs.statSync(path.join(apiDirectory, f)).isDirectory())
					.map(vName => {

						return {
							path: '/' + vName,
							router: require(path.join(apiDirectory, vName, 'apiRouter'))
						}
					});

apiMounts.forEach((mount) => {
	apiRouter.use(mount.path, mount.router);
});

//Routing api/ will be using latest version
var latest = apiMounts[apiMounts.length - 1];
if (latest) apiRouter.use('/', latest.router);

module.exports = apiRouter;