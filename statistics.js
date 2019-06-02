'use strict';

const {parseData} = require('./parseData');


// Calculates average for given array
module.exports.calculateAverage = (temperatures) => {

  if (temperatures.length == 0){
    throw new Error('Empty array.');
  }

  const total = temperatures.reduce((a, b) => a + b);
  return parseFloat((total/temperatures.length).toFixed(2));
}

// Calculates median for given array
module.exports.calculateMedian = (temperatures) => {
  if (temperatures.length == 0){
    throw new Error('Empty array.');
  }

  // floor as array indices starts in zero
  const halfIndex = Math.floor(temperatures.length/2)

  // Odd array length
  if (temperatures.length % 2) {
      return temperatures[halfIndex];
  } else {
      return parseFloat(((temperatures[halfIndex-1] + temperatures[halfIndex]) / 2).toFixed(2));
  }
}

// Calculates mode for given array
module.exports.calculateMode = (temperatures) => {

  if (temperatures.length == 0){
    throw new Error('Empty array.');
  }

  var occurrencesPerNumber = temperatures.reduce((occurrences, entry) => {
    occurrences[entry] = (occurrences[entry] || 0) + 1;
    return occurrences;
  }, {});

  console.log("=== Occurrences per temperature: ===");
  console.log(occurrencesPerNumber);
  console.log("===\n");


  const tempsPerCount = Object.keys(occurrencesPerNumber).reduce((tempsPerCount,temperature)  => {
    const count = occurrencesPerNumber[temperature];

    tempsPerCount[count] = tempsPerCount[count] || [];
    tempsPerCount[count].push(parseFloat(temperature));

    return tempsPerCount;
  }, {});

  console.log("=== Temperatures per number of occurrences: ===");
  console.log(tempsPerCount);

  // Discovering biggest number of occurrences
  const biggestCount = Object.keys(tempsPerCount).sort((a, b) =>  b - a)[0];

  if (biggestCount <= 1) {
    return [];
  } else {
    return tempsPerCount[biggestCount];
  }
}

module.exports.calculate = (event) => {

  const temperaturesMap = parseData(event);
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

  console.log("Success calculating stats.");
  return stats;
}
