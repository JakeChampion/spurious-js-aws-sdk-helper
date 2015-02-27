A helper module for configuring the js `aws-sdk` to talk to the [spurious](https://github.com/spurious-io/spurious) services.

## Installation

```
$ npm install --save-dev spurious-aws-sdk-helper
```

## Usage

You can configure the `aws-sdk` two different ways:

1. Shelling out to the CLI tool for the current port mappings
2. Getting current port mappings from linked docker containers

## CLI strategy

Generally you have this setup done at the entry point of your application or in a di container:

```js
require('spurious-aws-sdk-helper')()
```

## Docker strategy

If you're running the application in a container on the same host as spurious then you can pass in the following linked containers:

```bash
docker run ... --link spurious-s3:s3.spurious.localhost --link spurious -sqs:sqs.spurious.localhost --link spurious-dynamo:dynamodb.spurious.localhost
```

then inside your application:

```js
require('spurious-aws-sdk-helper')('docker')
```

## Contributing

1. Fork it ( https://github.com/spurious-io/js-aws-sdk-helper/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
