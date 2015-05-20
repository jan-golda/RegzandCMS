// public modules
var path	= require('path');
var serveStatic	= require('serve-static');


// local modules
var server	= requireLocal('server');

// exports
var ui = module.exports = {};

// menu
ui.menu = {};

// registering routes
server.staticRouter.use(serveStatic(path.join(__dirname, "bower_components")));
