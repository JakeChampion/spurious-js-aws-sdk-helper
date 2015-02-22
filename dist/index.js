"use strict";

var exec = require("exec-sync");
var url = require("url");
var Strategy = require("./strategy");

function port_config() {
  var ports = exec("spurious ports --json");
  if (ports == "[error] Spurious services haven't been started, please run 'spurious start'") {
    throw new Error(ports);
  }
  return JSON.parse(ports);
}

function docker_config() {
  return {
    "spurious-dynamo": [{
      Host: process.env["DYNAMODB.SPURIOUS.LOCALHOST_NAME"].split("/").pop(),
      HostPort: url.parse(process.env["DYNAMODB.SPURIOUS.LOCALHOST_PORT"]).port
    }],
    "spurious-sqs": [{
      Host: process.env["SQS.SPURIOUS.LOCALHOST_NAME"].split("/").pop(),
      HostPort: url.parse(process.env["SQS.SPURIOUS.LOCALHOST_PORT"]).port
    }],
    "spurious-s3": [{
      Host: process.env["S3.SPURIOUS.LOCALHOST_NAME"].split("/").pop(),
      HostPort: url.parse(process.env["S3.SPURIOUS.LOCALHOST_PORT"]).port
    }]
  };
}

function config(type) {
  switch (type) {
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

function configure(_x, strategy) {
  var type = arguments[0] === undefined ? "cli" : arguments[0];
  strategy = strategy || new Strategy(true);
  strategy.apply(config(type));
}

module.exports = configure;