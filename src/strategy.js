let AWS = require("aws-sdk");

class Strategy {
  constructor(set_all = false) {
    this.mapping = Object.create(null);
    if (set_all) {
      this.dynamo()
      this.sqs()
      this.s3()
    }
  }

  dynamo(port = true, ip = true) {
    this.mapping['spurious-dynamo'] = {
      port: port,
      ip: ip,
      identifier: 'dynamo_db'
    }
  }

  sqs(port = true, ip = true) {
    this.mapping['spurious-sqs'] = {
      port: port,
      ip: ip,
      identifier: 'sqs'
    }
  }

  s3(port = true, ip = true) {
    this.mapping['spurious-s3'] = {
      port: port,
      ip: ip,
      identifier: 's3'
    }
  }

  apply(config) {
    // console.log(JSON.parse(config))
    // config = JSON.parse(config)
    Object.keys(this.mapping).forEach((key, idx, arr) => {
      // console.log(key)
      let ports = config[key];
      // console.log(ports);
      // console.log(this.mapping)
      if (this.mapping[key]['port'] != null) {
        let a = {};
        a[`${this.mapping[key].identifier}_port`] = ports[0]['HostPort'];
        // console.log(a)
        new AWS.Config(a)
      }
      if (this.mapping[key]['ip'] != null) {
        let a = {};
        a[`${this.mapping[key].identifier}_endpoint`] = ports[0]['Host'];
        // console.log(a)
        new AWS.Config(a)
        // AWS.config({`${mappings.identifier}_endpoint`: ports[0]['Host']})
      }
    });
    // console.log(AWS.config)
  }
}

module.exports = Strategy;