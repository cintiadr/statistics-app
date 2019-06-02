'use strict';

const {generateStatistics,generateMap} = require('../../statistics');

const inputPath = '../example-data/'
const outputPath = '../example-result/'

describe("Input data", function() {

  describe("Sending original data", function() {
    it("should return ordered array", function(done) {
      const input = require(inputPath + 'original.json');
      const expected = require(outputPath + 'original.json');
      const actual = generateMap(input);
      expect(actual).toEqual(expected);
      done();
    });
  });

  describe("Sending data with duplicates", function() {
    it("should return ordered array", function(done) {
      const input = require(inputPath + 'duplicates.json');
      const expected = require(outputPath + 'duplicates.json');
      const actual = generateMap(input);
      expect(actual).toEqual(expected);
      done();
    });
  });

  describe("Sending data with invalid json", function() {
    it("should return error", function(done) {
      const input = require(inputPath + 'invalid.json');
      expect(() => generateMap(input)).toThrowError();
      done();
    });
  });

});
