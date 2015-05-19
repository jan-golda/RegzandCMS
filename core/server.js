var express		= require('express');
var bodyParser		= require('body-parser');
var cookieParser	= require('cookie-parser');

// local modules
var config		= requireLocal('config').config;

// creating server
var server = express();

// logger
server.use(requireLocal('logger').getExpress("[http]".grey));

// protocols
server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

// routers
var apiRouter = express.Router();
server.use(apiRouter);

// port
server.set("port", config.port);

// exports
module.exports = {
	_: server,
	apiRouter: apiRouter
};
