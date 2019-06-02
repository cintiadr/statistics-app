'use strict';

const {calculateMode} = require('../../statistics');

const originalNumbers = [3.53,3.53,3.63,3.66,3.67,4.63];
const noRepetition = [-5,-3,0,3,5];


describe("Calculate mode", function() {
  describe("original data", function() {
    it("should return correct number", function(done) {
      const input = originalNumbers;
      const expected = [3.53];
      const actual = calculateMode(input);
      expect(actual).toEqual(expected);
      done();
    });
  });

  describe("with no repetition", function() {
    it("should return empty list", function(done) {
      const input = noRepetition;
      const expected = [];
      const actual = calculateMode(input);
      expect(actual).toEqual(expected);
      done();
    });
  });

  describe("with empty list", function() {
    it("should throw error", function(done) {
      const input = [];
      expect(() => calculateMode(input)).toThrowError();
      done();
    });
  });

  describe("with one item", function() {
    it("should return the item", function(done) {
      const input = [2];
      const expected = [];
      const actual = calculateMode(input);
      expect(actual).toEqual(expected);
      done();
    });
  });
});
