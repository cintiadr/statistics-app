var request = require("request");

var pjson = require('../../conf.json');
const inputPath = '../input-data/'
const outputPath = '../output-data/'


var base_url = "https://" + pjson.appName + "." + pjson.zoneName

describe("Default Entrypoint", function() {
  describe("GET /", function() {
    it("returns status code 200", function(done) {
      request.get(base_url + "/", function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("returns default message", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(body).toBe("It's alive. Please send data via POST.");
        done();
      });
    });
  });
});


describe("Default Entrypoint", function() {
  describe("POST /", function() {
    it("returns status code 200", function(done) {
      const input = require(inputPath + 'original.json');
      const expected = require(outputPath + 'original.json');

      request.post(base_url + "/", { json: input }, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        expect(body).toEqual(expected);
        done();
      });
    });
  });
});
