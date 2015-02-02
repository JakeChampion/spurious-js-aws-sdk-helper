"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var AWS = require("aws-sdk");

var Strategy = (function () {
  function Strategy() {
    var set_all = arguments[0] === undefined ? false : arguments[0];
    this.mapping = {};
    if (set_all) {
      this.dynamo();
      this.sqs();
      this.s3();
    }
  }

  _prototypeProperties(Strategy, null, {
    dynamo: {
      value: function dynamo() {
        var port = arguments[0] === undefined ? true : arguments[0];
        var ip = arguments[1] === undefined ? true : arguments[1];
        this.mapping["spurious-dynamo"] = {
          port: port,
          ip: ip,
          identifier: "dynamo_db"
        };
      },
      writable: true,
      configurable: true
    },
    sqs: {
      value: function sqs() {
        var port = arguments[0] === undefined ? true : arguments[0];
        var ip = arguments[1] === undefined ? true : arguments[1];
        this.mapping["spurious-sqs"] = {
          port: port,
          ip: ip,
          identifier: "sqs"
        };
      },
      writable: true,
      configurable: true
    },
    s3: {
      value: function s3() {
        var port = arguments[0] === undefined ? true : arguments[0];
        var ip = arguments[1] === undefined ? true : arguments[1];
        this.mapping["spurious-s3"] = {
          port: port,
          ip: ip,
          identifier: "s3"
        };
      },
      writable: true,
      configurable: true
    },
    apply: {
      value: function apply(config) {
        var _this = this;
        // console.log(JSON.parse(config))
        // config = JSON.parse(config)
        Object.keys(this.mapping).forEach(function (key, idx, arr) {
          // console.log(key)
          var ports = config[key];
          // console.log(ports);
          // console.log(this.mapping)
          if (_this.mapping[key].port != null) {
            var a = {};
            a["" + _this.mapping[key].identifier + "_port"] = ports[0].HostPort;
            // console.log(a)
            new AWS.Config(a);
          }
          if (_this.mapping[key].ip != null) {
            var a = {};
            a["" + _this.mapping[key].identifier + "_endpoint"] = ports[0].Host;
            // console.log(a)
            new AWS.Config(a);
          }
        });
        // console.log(AWS.config)
      },
      writable: true,
      configurable: true
    }
  });

  return Strategy;
})();

module.exports = Strategy;
// AWS.config({`${mappings.identifier}_endpoint`: ports[0]['Host']})