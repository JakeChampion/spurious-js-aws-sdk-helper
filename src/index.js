var exec = require('exec-sync');
var url = require('url');
var Strategy = require('./strategy');

function port_config () {
	let config = 'spurious ports --json';
	return JSON.parse(exec(config)); //err handling?
}

function docker_config() {
	return {
		"spurious-dynamo": [
			{
				Host: process.env["DYNAMODB.SPURIOS.LOCALHOST_NAME"].split("/").pop(),
				HostPort: url.parse(process.env["DYNAMODB.SPURIOUS.LOCALHOST_PORT"]).port
			}
		],
		"spurious-sqs": [
			{
				Host: process.env["SQS.SPURIOS.LOCALHOST_NAME"].split("/").pop(),
				HostPort: url.parse(process.env["SQS.SPURIOUS.LOCALHOST_PORT"]).port
			}
		],
		"spurious-s3": [
			{
				Host: process.env["S3.SPURIOS.LOCALHOST_NAME"].split("/").pop(),
				HostPort: url.parse(process.env["S3.SPURIOUS.LOCALHOST_PORT"]).port
			}
		]
	};
}

function config(type) {
	switch(type) {
		case "cli":
			return port_config();
			break;
		case "docker":
			return docker_config();
			break;
		default:
			// throw err?
	}
}

function configure(type = "cli", strategy) {
	strategy = strategy || new Strategy(true);
	strategy.apply(config(type))
}

// configure();