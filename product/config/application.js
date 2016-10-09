var path = require('path'),
    http = require('http');

//------------------------------------------------------------------------
var express         = require('express'),
    bodyParser      = require('body-parser'),
    morgan          = require('morgan'),
    passport        = require('passport');

var app = express();

//------------------------------------------------------------------------
global.Utils = require('./utilities');
global.App = {

    app:    app,
    env:    process.env.NODE_ENV || 'development',
    port:   process.env['PORT'] || 1337
}

//------------------------------------------------------------------------
var config = {

        database:           Utils.getConfig('database'),
        authentication:     Utils.getConfig('authentication')(),
        routing:            Utils.getConfig('routing')
    };

//------------------------------------------------------------------------
//Express Middlewares stack
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(Utils.root_path, 'public', 'build')));
app.use(passport.initialize());
app.use(config.routing.appRouter);

//------------------------------------------------------------------------


//------------------------------------------------------------------------
module.exports = {

    start: function() {

        config.database.connect(config.database.connectionString, function(err) {

            if (!err) {

                http.createServer(app).listen(App.port, () => {
                    console.log('Server listening on port ' + App.port);
                });
            }
        })
    }
};



