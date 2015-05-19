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

// local modules
var logger	= requireLocal('logger').getLogger("[main]".grey);

// creating server
var server = require('./server');

// preparing modules
require('./modules');

// starting server
server._.listen(server._.get('port'));
logger.info("Server listening on port &{0}&", [server._.get('port')]);
