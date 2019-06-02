var request = require("request");

var pjson = require('../../conf.json');


var base_url = "https://" + pjson.appName + "." + pjson.zoneName

describe("Retrieve app metadata", function() {
  describe("GET /metadata", function() {
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("returns app metadata", function(done) {
      request.get(base_url + "/metadata", function(error, response, body) {
        expect(body).toContain("statistics-lambda-app");
        done();
      });
    });
  });

});
