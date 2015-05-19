var fs		= require('fs');
var path	= require('path');
var async	= require('async');

var server	= require('server');

// exports
var modules = module.exports = {};

// getting all modules
fs.readdir(CMS_MODULES, function(err, files){
	if(err)
		throw err;

	async.each(files, function(item, callback){
		fs.exists(path.join(CMS_MODULES, item, 'index.js'), function(exists){
			if(exists)
				modules[item] = require(path.join(CMS_MODULES, item, 'index.js'));
			callback(null);
		});
	});
});
