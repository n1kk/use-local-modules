const fs = require('fs')
const path = require('path')
const pkg = require('./package.json')
const { exec } = require('child_process');

const cli_name = 'usemodules'
const info = [
	{ext: '.cmd', map: '.cmd'},
	{ext: '.ps1', map: '.ps1'},
	{ext: '.sh', map: ''},
]
const mode = process.argv[2]
const log = (...args) => console.log.apply(console, ['\t'].concat(args))
const error = (...args) => console.error.apply(console, ['\t'].concat(args))

function install(bin, info) {
	let from = path.resolve(__dirname, cli_name + info.ext)
	let to = path.resolve(bin, cli_name + info.map)
	let operation = '->'
	try {
		try {
			fs.linkSync(from, to)
		} catch (e) {

		} finally {
			operation = ">>"
			fs.copyFileSync(from, to)
		}

		log(`${from} ${operation} ${to}`)
	} catch (e) {
		error(`ERROR while installing ${from} -> ${to}`)
		error(e)
	}
}

function remove(bin, info) {
	let scriptPath = path.resolve(bin, cli_name + info.map)
	if (fs.existsSync(scriptPath)) {
		try {
			fs.unlinkSync(scriptPath)
			log(`Removed ${scriptPath}`)
		} catch (e) {
			error(`ERROR while removing ${scriptPath}`)
			error(e)
		}
	}
}

// --------------------------------------------------------------------------------------------------

console.log(pkg.name, ':')

if (mode === 'install' || mode === 'remove') {
	exec('npm bin -g', (err, stdout, stderr) => {
		if (err) {
			error(err);
			return;
		}
		let globalBin = stdout.trim()
		if (fs.existsSync(globalBin)) {
			let action = mode === 'install' ? install : remove;
			info.forEach(i => action(globalBin, i))
		} else {
			error(`Error: Could not find existing path for global npm executables. Result of "npm bin -g": "${globalBin}"`)
		}
	})
} else {
	error(`Mode '${mode}' is not supported. Please use install or remove.`);
}

