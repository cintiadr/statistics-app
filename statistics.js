class Statistics {

  generate(event, callback) {
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        something: {
          bla: 1,
        },
      }),
    };

    console.log(event);
    callback(null, response);
  }
}

module.exports = Statistics;
