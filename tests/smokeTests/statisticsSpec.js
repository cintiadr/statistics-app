var request = require("request");

var pjson = require('../../conf.json');


var base_url = "https://" + pjson.appName + "." + pjson.zoneName

describe("Hello World Server", function() {
  describe("GET /", function() {
    it("returns status code 200", function(done) {
      request.get(base_url + "/", function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("returns Hello World", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(body).toBe("It's alive. Please send data via POST.");
        done();
      });
    });
  });
});
