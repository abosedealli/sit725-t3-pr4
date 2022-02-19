const expect = require("chai").expect;
const request = require("request");

describe('first', () => {
  it('should return all projects', (done) => {
    const url = '/api/projects';
    request(url, (err, response, body) => {
      //if the response.statusCode == 200
      expect(response.statusCode).to.equal(200);
      done();
    });
  })
})