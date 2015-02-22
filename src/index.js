const exec = require('exec-sync')
const url = require('url')
const Strategy = require('./strategy')

function port_config () {
  let config = 'spurious ports --json'
  return JSON.parse(exec(config)) //err handling?
}

function docker_config() {
  return {
    "spurious-dynamo": [
      {
        Host: process.env["DYNAMODB.SPURIOUS.LOCALHOST_NAME"].split("/").pop(),
        HostPort: url.parse(process.env["DYNAMODB.SPURIOUS.LOCALHOST_PORT"]).port
      }
    ],
    "spurious-sqs": [
      {
        Host: process.env["SQS.SPURIOUS.LOCALHOST_NAME"].split("/").pop(),
        HostPort: url.parse(process.env["SQS.SPURIOUS.LOCALHOST_PORT"]).port
      }
    ],
    "spurious-s3": [
      {
        Host: process.env["S3.SPURIOUS.LOCALHOST_NAME"].split("/").pop(),
        HostPort: url.parse(process.env["S3.SPURIOUS.LOCALHOST_PORT"]).port
      }
    ]
  };
}

function config(type) {
  switch(type) {
    case "docker":
      return docker_config()
    default:
      return port_config()
  }
}

function configure(type, strategy) {
  strategy = strategy || new Strategy(true)
  strategy.apply(config(type))
}

module.exports = configure