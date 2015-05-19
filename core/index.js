var path	= require('path');

// defining global paths
GLOBAL.CMS_ROOT			= path.resolve(__dirname, "../");
GLOBAL.CMS_CORE			= path.join(CMS_ROOT, "core");
GLOBAL.CMS_PRIVATE_MODULES	= path.join(CMS_CORE, "private_modules");
GLOBAL.CMS_MODULES		= path.join(CMS_ROOT, "modules");

// requiring private modules
GLOBAL.requireLocal = function requireLocal(pac){
	return require(path.join(CMS_PRIVATE_MODULES, pac));
};

// creating server
var server = require('./server');

// starting server
server._.listen(server.get('port'));
