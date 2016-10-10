var path = require('path'),
    http = require('http');

//------------------------------------------------------------------------
var express         = require('express'),
    cookieParser    = require('cookie-parser'),
    bodyParser      = require('body-parser'),
    validator       = require('express-validator'),
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
app.use(express.static(path.join(Utils.root_path, 'public', 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(config.authentication.secret));
app.use(validator());
app.use(passport.initialize());
app.use(config.routing.appRouter);
app.use(function(err, req, res, next) {
    res.status(500).json({
        msg: "Unhandled error",
        error: err
    });
})

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



