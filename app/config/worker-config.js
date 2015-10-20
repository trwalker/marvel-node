var http = require('http');
var express = require('express');
var application = express();
var bodyParser = require('body-parser');
var routeConfig = require('./route-config');
var settingsConfig = require('./settings/settings-config');

function configureWorker(application) {
    configureApplication(application);
    configureRoutes(application);
    configureErrorHandler(application);

    startServer(application);
}

function configureApplication(application) {
    application.use(bodyParser.json());

    application.use(function (req, res, next) {
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.set('Pragma', 'no-cache');
        res.set('Expires', '0');
        res.type('application/json');
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
}

function configureRoutes(application) {
    routeConfig.registerRoutes(application);
}

function configureErrorHandler(application) {
    application.use(function (err, req, res, next) {
        if (err) {
            switch (err.name) {
                case 'NotFoundError':
                    res.status(404).json({message: err.message, statusCode: err.statusCode});
                    res.end();
                    break;
                default:
                    // TODO: Log error here
                    res.status(500).json({message: err.message, statusCode: err.statusCode});
                    res.end();
                    break;
            }
        }

        next();
    });
}

function startServer(application) {
    var server = http.createServer(application);

    server.listen(settingsConfig.settings.workerPort, settingsConfig.settings.hostName, settingsConfig.settings.queueLength, function () {
        console.log('listening at http://%s:%s', settingsConfig.settings.hostName, settingsConfig.settings.workerPort);
    });
}

configureWorker(application);
