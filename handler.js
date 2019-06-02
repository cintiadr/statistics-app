'use strict';

const {generateStatistics} = require('./statistics');

module.exports.statistics = (event, context, callback) => {
  generateStatistics(event, callback);
};

module.exports.welcome = (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      "Content-Type" : "text/html"
    },
    body: 'It\'s alive. Please send data via POST.',
  };
  callback(null, response);
};

module.exports.metadata = (event, context, callback) => {
  var pjson = require('./package.json');

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      [pjson.name]: {
        version: pjson.version,
        description: pjson.description,
        lastcommitsha:  process.env.GIT_ENV
      },
    }),
  };
  console.log(event);
  callback(null, response);
};
