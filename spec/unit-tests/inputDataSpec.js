'use strict';

const {generateMap} = require('../../statistics');

const inputPath = '../input-data/'
const outputPath = '../imported-data/'

describe("Input", function() {

  describe("original data", function() {
    it("should return ordered array", function(done) {
      const input = require(inputPath + 'original.json');
      const expected = require(outputPath + 'original.json');
      const actual = generateMap(input);
      expect(actual).toEqual(expected);
      done();
    });
  });

  describe("with duplicates", function() {
    it("should return ordered array", function(done) {
      const input = require(inputPath + 'duplicates.json');
      const expected = require(outputPath + 'duplicates.json');
      const actual = generateMap(input);
      expect(actual).toEqual(expected);
      done();
    });
  });

  describe("empty", function() {
    it("should return empty array", function(done) {
      const input = require(inputPath + 'empty.json');
      const expected = {};
      const actual = generateMap(input);
      expect(actual).toEqual(expected);
      done();
    });
  });

  describe("integers", function() {
    it("should ordered array", function(done) {
      const input = require(inputPath + 'numbers.json');
      const expected = require(outputPath + 'numbers.json');
      const actual = generateMap(input);
      expect(actual).toEqual(expected);
      done();
    });
  });

  describe("with invalid data", function() {
    it("should return error", function(done) {
      const input = require(inputPath + 'invalid.json');
      expect(() => generateMap(input)).toThrowError();
      done();
    });
  });

});
