var express		= require('express');
var bodyParser		= require('body-parser');
var cookieParser	= require('cookie-parser');

// local modules
var logger		= requireLocal('logger').getExpress("[http]".grey);

// creating server
var server = express();

// logger
server.use(logger);

// protocols
server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

// routers
var apiRouter = express.Router();
server.use("/api", apiRouter);
var mainRouter = express.Router();
server.use(mainRouter);

// exports
module.exports = {
	express: server,
	apiRouter: apiRouter,
	mainRouter: mainRouter
};
