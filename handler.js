'use strict';

const {calculate} = require('./statistics');

module.exports.statistics = (event, context, callback) => {
  try {
    console.log("=== Request body: ===");
    console.log(event.body);
    console.log("===\n");

    const stats = calculate(JSON.parse(event.body));

    const response = {
      statusCode: 200,
      body: JSON.stringify(stats),
    };
    console.log("=== Response body: ===");
    console.log(response);
    console.log("===\n");
    callback(null, response);

  } catch (err) {
    console.log(err);
    const response = {
      statusCode: 500,
      body: JSON.stringify({
        message: err.message,
        status: "error"
      })
    };
    callback(null, response);
  }
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
  callback(null, response);
};
