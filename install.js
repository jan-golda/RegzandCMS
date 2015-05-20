var fs          = require('fs');
var path        = require('path');
var cp          = require('child_process');

function install(dir){
	dir = path.resolve(__dirname, dir);

	if(fs.existsSync(path.join(dir, 'package.json')))
		cp.spawn('npm', ['i'], { env: process.env, cwd: dir, stdio: 'inherit' });

	if(fs.existsSync(path.join(dir, 'bower.json')))
		cp.spawn('bower', ['install'], { env: process.env, cwd: dir, stdio: 'inherit' });
}

// core
install(path.join(__dirname, "core"));
// modules
fs.readdir(path.join(__dirname, "modules"), function(err, files){
	if(err)
		throw err;

	files.forEach(function(e){
		install(path.join(__dirname, "modules", e));
	});
});
// private_modules
fs.readdir(path.join(__dirname, "core", "private_modules"), function(err, files){
	if(err)
		throw err;

	files.forEach(function(e){
		install(path.join(__dirname, "core", "private_modules", e));
	});
});
