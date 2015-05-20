var fs		= require('fs');
var path	= require('path');
var async	= require('async');

// local modules
var server	= requireLocal('server');
var logger	= requireLocal('logger').getLogger("[modules]".grey);

// exports
var modules = module.exports = {};

// getting all modules
fs.readdir(CMS_MODULES, function(err, files){
	if(err)
		throw err;

	async.each(files, function(item, callback){
		fs.exists(path.join(CMS_MODULES, item, 'index.js'), function(exists){
			if(exists) {
				var m = modules[item] = require(path.join(CMS_MODULES, item, 'index.js'));

				if(m.registerApi) m.registerApi(server.apiRouter);

				logger.dev("Module &{0}& loaded", [item]);
			}
			callback(null);
		});
	});
});
