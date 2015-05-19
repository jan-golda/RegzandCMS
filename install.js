var fs          = require('fs');
var path        = require('path');
var cp          = require('child_process');

function install(dir){
	dir = path.resolve(__dirname, dir);

	if(!fs.existsSync(path.join(dir, 'package.json'))) return;

	cp.spawn('npm', ['i'], { env: process.env, cwd: dir, stdio: 'inherit' });
}

install("core");
