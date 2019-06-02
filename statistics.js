'use strict';

// Imports raw data into an map indexed by ID
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
    // ensure negative numbers are validated
    temperatures[key].sort((a, b) => a - b);
  }

  return temperatures;
}


// Calculates average for given array
module.exports.calculateAverage = (temperatures) => {
  const total = temperatures.reduce((a, b) => a + b);
  return (total/temperatures.length).toFixed(2);
}

// Calculates median for given array
module.exports.calculateMedian = (temperatures) => {
  // floor as array indices starts in zero
  const halfIndex = Math.floor(temperatures.length/2)

  // Odd array length
  if (temperatures.length % 2) {
      return temperatures[halfIndex].toFixed(2);
  } else {
      return ((temperatures[halfIndex-1] + temperatures[halfIndex]) / 2).toFixed(2);
  }
}

// Calculates mode for given array
module.exports.calculateMode = (temperatures) => {

  var occurrencesPerNumber = temperatures.reduce((occurrences, entry) => {
    occurrences[entry] = (occurrences[entry] || 0) + 1;
    return occurrences;
  }, {});

  console.log("=== Number of occurrences: ===");
  console.log(occurrencesPerNumber);
  console.log("===\n");


  const tempsPerCount = {}
  for (const temperature in occurrencesPerNumber){
    const key = occurrencesPerNumber[temperature];
    const value = temperature;

    tempsPerCount[key] = tempsPerCount[key] || [];
    tempsPerCount[key].push(value);
  }

  console.log("=== Temperatures per count: ===");
  console.log(tempsPerCount);

  // Discovering biggest number of occurrences
  const biggestCount = Object.keys(tempsPerCount).sort((a, b) =>  b - a)[0];

  if (biggestCount <= 1) {
    return [];
  } else {
    return tempsPerCount[biggestCount];
  }
}

module.exports.generateStatistics = (event, callback) => {

  const temperaturesMap = this.generateMap(event);
  console.log("=== Imported temperatures: ===");
  console.log(temperaturesMap);
  console.log("===\n");

  const stats = [];
  for (const key in temperaturesMap) {
    const entryStats = {};
    entryStats['id'] = key;
    entryStats['average'] = this.calculateAverage(temperaturesMap[key]);
    entryStats['median'] = this.calculateMedian(temperaturesMap[key]);
    entryStats['mode'] = this.calculateMode(temperaturesMap[key]);

    stats.push(entryStats);
  }

  console.log("=== Calculated stats: ===");
  console.log(stats);
  console.log("===\n");

  const response = {
    statusCode: 200,
    body: stats,
  };

  callback(null, response);
}
