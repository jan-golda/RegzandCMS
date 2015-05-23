// public modules
var path	= require('path');
var serveStatic	= require('serve-static');


// local modules
var server	= requireLocal('server');

// exports
var ui = module.exports = {};

// menu
ui.menu = {};

// static files
server.publicRouter.use(serveStatic(path.join(__dirname, "public")));
server.publicRouter.use(serveStatic(path.join(__dirname, "bower_components")));
