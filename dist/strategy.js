"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var AWS = require("aws-sdk");

var Strategy = (function () {
  function Strategy() {
    var set_all = arguments[0] === undefined ? false : arguments[0];

    _classCallCheck(this, Strategy);

    this.mapping = Object.create(null);
    if (set_all) {
      this.dynamo();
      this.sqs();
      this.s3();
    }
  }

  _prototypeProperties(Strategy, null, {
    dynamo: {
      value: function dynamo() {
        this.mapping["spurious-dynamo"] = "dynamodb";
      },
      writable: true,
      configurable: true
    },
    sqs: {
      value: function sqs() {
        this.mapping["spurious-sqs"] = "sqs";
      },
      writable: true,
      configurable: true
    },
    s3: {
      value: function s3() {
        this.mapping["spurious-s3"] = "s3";
      },
      writable: true,
      configurable: true
    },
    apply: {
      value: function apply(config) {
        for (var key in this.mapping) {
          var ports = config[key];
          AWS.config[this.mapping[key]] = {
            endpoint: ports[0].Host + ":" + ports[0].HostPort
          };
        }
      },
      writable: true,
      configurable: true
    }
  });

  return Strategy;
})();

module.exports = Strategy;