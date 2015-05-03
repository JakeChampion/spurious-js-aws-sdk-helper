"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

  _createClass(Strategy, {
    dynamo: {
      value: function dynamo() {
        this.mapping["spurious-dynamo"] = "dynamodb";
      }
    },
    sqs: {
      value: function sqs() {
        this.mapping["spurious-sqs"] = "sqs";
      }
    },
    s3: {
      value: function s3() {
        this.mapping["spurious-s3"] = "s3";
      }
    },
    apply: {
      value: function apply(config) {
        for (var key in this.mapping) {
          var ports = config[key];
          AWS.config[this.mapping[key]] = {
            endpoint: ports[0].Host + ":" + ports[0].HostPort
          };
        }
      }
    }
  });

  return Strategy;
})();

module.exports = Strategy;