var express		= require('express');
var bodyParser		= require('body-parser');
var cookieParser	= require('cookie-parser');

// local modules
var logger		= requireLocal('logger').getExpress("[http]".grey);

// creating server
var server = express();

// static router
var staticRouter = express.Router();
server.use(staticRouter);

// logger
server.use(logger);

// protocols
server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

// api router
var apiRouter = express.Router();
server.use("/api", apiRouter);

// main router
var mainRouter = express.Router();
server.use(mainRouter);

// exports
module.exports = {
	express: server,
	staticRouter: staticRouter,
	apiRouter: apiRouter,
	mainRouter: mainRouter
};
