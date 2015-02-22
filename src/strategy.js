const AWS = require("aws-sdk");

class Strategy {
  constructor(set_all = false) {
    this.mapping = Object.create(null);
    if (set_all) {
      this.dynamo()
      this.sqs()
      this.s3()
    }
  }

  dynamo() {
    this.mapping['spurious-dynamo'] = 'dynamodb'
  }

  sqs() {
    this.mapping['spurious-sqs'] = 'sqs'
  }

  s3() {
    this.mapping['spurious-s3'] = 's3'
  }

  apply(config) {
    for (let key in this.mapping) {
      let ports = config[key];
      AWS.config[this.mapping[key]] = {
        endpoint: ports[0]['Host'] + ":" + ports[0]["HostPort"]
      }
    }
  }
}

module.exports = Strategy;