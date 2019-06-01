# Sample application

[![Build Status](https://travis-ci.org/cintiadr/sample-lambda-app.svg?branch=master)](https://travis-ci.org/cintiadr/sample-lambda-app)

This code is heavily based on [Serverless Hello world example](https://github.com/cintiadr/sample-lambda-app) I've created a while ago and recently upgraded.


## Building and running locally

### Requirements

  - Node 10.x (can be via `nvm use`)

### Setup

  - `./scripts/install.sh` to install all dependencies

### Running tests

## My production environment

  - <https://statistics.cintia.me>
  - <https://statistics.cintia.me/metadata>



## Deploying to your AWS account

### Requirements

Setup your AWS account the following requirements:
  - ACM Certificate for the desired domain
  - Route53 DNS zone

Edit _conf.json_ to reflect them

Also ensure you have AWS cli installed and credentials to deploy.



### Deploying changes
```
# Build cloudformation
$ npm run package

# Deploying to AWS
$ npm run deploy

# Running smoke tests against environment
$ npm run smoke-tests
```

### Design Considerations
  - This code is in node due to the better integration with serverless framework,
  but I'm not a node expert. Take my code with a pinch of salt;
  - Lambda is running outside VPC; security considerations apply if your lambda
  handles sensitive data;
  - Memory size and timeout are not being configured;
  - Environment variables are not encrypted, same security considerations;
  - There's no dashboards nor alarms for failures. Also, no dead letter queue
  configured for failures, nor AWS Xray.
  - There's no de-duplication mechanism for lambda because they are not changing state.
  Check [this blogpost](https://blog.sungardas.com/CTOLabs/2017/06/run-lambda-run/)
  for details;
  - Logs and basic metrics are automatically deployed to cloudwatch by default;
  - There are no unit nor integration tests because the hello world is very basic,
  but you should check [Serverless Testing guide](https://serverless.com/framework/docs/providers/aws/guide/testing/)
  if your lambda is more complex than that.
  Serverless offers a lot of help for local tests and debugging;
  - Smoke tests after deployment are done using Jasmine framework;
