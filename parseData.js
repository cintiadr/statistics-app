'use strict';

// Imports raw data into an map indexed by ID
module.exports.parseData = (data) => {
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
