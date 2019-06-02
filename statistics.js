'use strict';

module.exports.generateMap = (data) => {
  const temperatures = {};

  for (const entry of data) {
    const key = entry['id'];
    const value = entry['temperature'];

    if (isNaN(value)){
      throw new Error(`Entry [${entry['id']}:${entry['timestamp']}] doesn't have a valid number`);
    }

    temperatures[key] = temperatures[key] || [];
    temperatures[key].push(value);
  }

  for (const key in temperatures) {
    temperatures[key].sort();
  }

  return temperatures;
}

module.exports.generateStatistics = (event, callback) => {

  const temperaturesMap = generateMap(event);
  console.log(temperaturesMap);

  const response = {
    statusCode: 200,
    body: temperaturesMap,
  };

  callback(null, response);
}
