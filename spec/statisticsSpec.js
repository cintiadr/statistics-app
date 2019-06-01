var request = require("request");

var pjson = require('../conf.json');


var base_url = "https://" + process.env.ENVIRONMENT + "." + pjson.zoneName

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
        expect(body).toBe("The actual hello world, as expected.");
        done();
      });
    });
  });
});
