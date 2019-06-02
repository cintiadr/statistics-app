'use strict';

const {calculateMedian} = require('../../statistics');

const originalNumbers = [3.53,3.53,3.63,3.66,3.67,4.63];
const negativeNumbers = [-5,-3,0,3,5];
const oddNumbersLength = [1,2,3,4,5];
const evenNumbersLength = [1,2,3,4];


describe("Calculate median", function() {
  describe("original data", function() {
    it("should return correct number", function(done) {
      const input = originalNumbers;
      const expected = 3.65;
      const actual = calculateMedian(input);
      expect(actual).toBe(expected);
      done();
    });
  });

  describe("with negative numbers", function() {
    it("should return correct number", function(done) {
      const input = negativeNumbers;
      const expected = 0.00;
      const actual = calculateMedian(input);
      expect(actual).toBe(expected);
      done();
    });
  });

  describe("with empty list", function() {
    it("should throw error", function(done) {
      const input = [];
      expect(() => calculateMedian(input)).toThrowError();
      done();
    });
  });

  describe("with one item", function() {
    it("should return the item", function(done) {
      const input = [2];
      const expected = 2;
      const actual = calculateMedian(input);
      expect(actual).toBe(expected);
      done();
    });

  });
  describe("with odd number of items", function() {
    it("should return middle item", function(done) {
      const input = oddNumbersLength;
      const expected = 3;
      const actual = calculateMedian(input);
      expect(actual).toBe(expected);
      done();
    });
  });

  describe("with even number of items", function() {
    it("should return between middle items", function(done) {
      const input = evenNumbersLength;
      const expected = 2.5;
      const actual = calculateMedian(input);
      expect(actual).toBe(expected);
      done();
    });
  });
});
