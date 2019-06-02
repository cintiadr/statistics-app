'use strict';

function generateMap(data) {
  const temperatures = {};

  for (var i = 0; i < data.length; i++) {
    const key = data[i]['id'];
    const value = data[i]['temperature'];

    temperatures[key] = temperatures[key] || [];
    temperatures[key].push(value);
  }

  for (const key in temperatures) {
    temperatures[key].sort();
  }

  return temperatures;
}

function generate(event, callback) {

  const temperaturesMap = generateMap(event);
  console.log(temperaturesMap);

  const response = {
    statusCode: 200,
    body: temperaturesMap,
  };

  callback(null, response);
}

module.exports = generate;
