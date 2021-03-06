# Statistics application

[![Build Status](https://travis-ci.org/cintiadr/statistics-app.svg?branch=master)](https://travis-ci.org/cintiadr/statistics-app)

## Design Considerations

This code is heavily based on [Serverless Hello world example](https://github.com/cintiadr/sample-lambda-app) I've created a while ago and recently upgraded.

I don't believe in code that is not deployed to production. As I don't identify as a developer anymore,
code is not what I know the most.

I want to show things that are _not application code_ required to have a proper system running in production.

AWS lambda is a cost-effective and quick way for me to have a secure, robust, scalable and reliable
small application deployed. As we can afford the cold starts penalties and natural variances in performance,
it's a great use case.

Logs and basic metrics are automatically deployed to cloudwatch by default,
solving a few of the infrastructure problems. While cloudwatch is far from perfect, it's a decent start for me.
Creating dashboards and a few alarms in cloudwatch would be necessary before making this available for multiple customers.

Biggest risk for me is denial-by-credit-card, but so far the alarms for billing
on my account haven't yield anything weird. I could be a lot more aggressive protecting myself,
but my threat model doesn't justify it.

I used the Serverless framework, because it has so many more features than SAM. Also better support and stronger community.
I'm following the [Serverless Testing guide](https://serverless.com/framework/docs/providers/aws/guide/testing/). Unit tests and smoke tests (post deployment) are done using Jasmine framework.

I chose node because (1) I already had an example in node; (2) the lambda cold starts times are not bad;
(3) the language is pretty inclusive and doesn't scare anyone who already uses other imperative languages;
(4) support with serverless is great. That said I'm far from a node expert. As it's a pretty basic application, I used just npm and jasmine for the development lifecycle.


Unfortunately the floating number rounding in node is slightly different than usual, where a '3.775' will be rounded to '3.77' instead of '3.78'. I thought it was probably good enough.

There's no [de-duplication mechanism](https://blog.sungardas.com/CTOLabs/2017/06/run-lambda-run/) for lambda
because they are not changing state, as I don't care how if we receive duplicate invocations.

This lambda doesn't have access to secrets or privileged data, I decided to not put it inside a VPC.

This application prints the data extensively in logs; my understanding is that it's not private data,
so there was no harm done. Also, I decided to not do any validation in timestamp (even if it's duplicated) and I fail the whole process if there's at least one temperature which is not a number.
I didn't want to add any verification about valid numbers as the requirements didn't specify the unit used (and I'm not sure what's valid or not).

There's no configuration for authentication. Assuming that's required, it could be done reasonably well from API gateway.

API Gateway + Lambda have an upper limit of around 6MB for request data, which seems pretty good to me. I assume that's more then enough, and it uses less than 100MB to process that.


## Using the production environment

  - <https://statistics.cintia.me>
  - <https://statistics.cintia.me/metadata>


All you have to do is sending the file via post.

`curl -v -X POST https://statistics.cintia.me --data @spec/input-data/original.json | jq`


## Development and deployment

#### Requirements and setup

  - Node 10.x (can be via `nvm use`)
  - Run `./scripts/install.sh` to install all dependencies


If you are deploying to your own AWS account, also:

  - Setup your AWS account the following requirements:
    - ACM Certificate for the desired domain
    - Route53 DNS zone
  - Edit _conf.json_ to reflect them
  - ensure you have AWS cli installed and credentials to deploy

#### Running 'lambda' locally

Running locally sending a file (as sort of an integration tests from API Gateway):
`npm run local-run -- --path spec/input-lambda-data/example.json`

#### Deploying changes to AWS

For simplicity of this example, I just have a single environment (production).
But that can be easily changed.

```
# Deploying to AWS
$ npm run deploy
```

#### Running tests remotely

To call all smoke tests:
`npm run smoke-tests`

Or call lambda remotely individually:
`npm run run -- --path spec/input-lambda-data/example.json`
