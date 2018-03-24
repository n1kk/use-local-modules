const fs = require('fs')
const path = require('path')
const pkg = require('./package.json')
const exec = require('child_process').exec;

const cli_name = 'usemodules'
const info = [
	{ext: '.cmd', map: '.cmd'},
	{ext: '.ps1', map: '.ps1'},
	{ext: '.sh', map: ''}
]
const mode = process.argv[2]
const log = function () { console.log.apply(console, ['\t'].concat([].slice.call(arguments))) }
const error = function () { console.error.apply(console, ['\t'].concat([].slice.call(arguments))) }

function install(bin, info) {
	var from = path.resolve(__dirname, cli_name + info.ext)
	var to = path.resolve(bin, cli_name + info.map)
	var operation = '->'
	var linkErr
	try {
		try {
			fs.linkSync(from, to)
		} catch (e) {
			linkErr = e
			operation = ">>"
			if (fs.copyFileSync) {
				fs.copyFileSync(from, to)
			} else {
				fs.writeFileSync(to, fs.readFileSync(from, 'utf8'), 'utf8')
			}
		}

		log(from, operation, to)
	} catch (e) {
		error('ERROR while installing', from, operation, to)
		linkErr && error(linkErr)
		error(e)
	}
}

function remove(bin, info) {
	var scriptPath = path.resolve(bin, cli_name + info.map)
	if (fs.existsSync(scriptPath)) {
		try {
			fs.unlinkSync(scriptPath)
			log('Removed', scriptPath)
		} catch (e) {
			error('ERROR while removing', scriptPath)
			error(e)
		}
	}
}

// --------------------------------------------------------------------------------------------------

console.log(pkg.name, ':')

if (mode === 'install' || mode === 'remove') {
	exec('npm bin -g', function (err, stdout, stderr) {
		if (err) {
			error(err);
			return;
		}
		var globalBin = stdout.trim()
		if (fs.existsSync(globalBin)) {
			var action = mode === 'install' ? install : remove;
			info.forEach(function(i) { action(globalBin, i) })
		} else {
			error('Error: Could not find existing path for global npm executables. Result of "npm bin -g":', globalBin)
		}
	})
} else {
	error('Mode', mode, 'is not supported. Please use install or remove.');
}

