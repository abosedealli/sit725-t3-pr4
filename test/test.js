const expect = require("chai").expect;
const request = require("request");

describe("add two number", () => {
    const url = "http://localhost:8080/addNumber/1/3";

    it("requests return status code 200", (updated) => {
        request(url, (err, response, body) => {
            expect(response.statusCode).to.equal(200);
            updated();
        });
    });

    it("requests returns status code 200", (updated) => {
        request(url, (err, response, body) => {
            body = JSON.parse(body);
            expect(body.statusCode).to.equal(200);
            updated();
        });
    });

    it("requests returns a number as the result", (updated) => {
        request(url, (err, response, body) => {
            body = JSON.parse(body);
            expect(body.result).to.be.a('number');
            updated();
        });
    });

    it("requests returns 5 as the result in the body", (updated) => {
        request(url, (err, response, body) => {
            body = JSON.parse(body);
            expect(body.result).to.equal(4);
            updated();
        });
    });

});

describe("add two string", () => {
    const url = "http://localhost:8080/addNumber/a/b";

    it("for result do not return 200 as status code", (updated) => {
        request(url, (err, response, body) => {
            expect(response.statusCode).to.not.equal(200);
            updated();
        });
    });

    it("for result do return correct error message", (updated) => {
        request(url, (err, response, body) => {
            body = JSON.parse(body);
            expect(body.err).to.equal('the two input should be numeric');
            updated();
        });
    });

});

describe("add one number and one string", () => {
    const url = "http://localhost:8080/addNumber/1/3";

    it("for result do not return 200 as status code", (updated) => {
        request(url, (err, response, body) => {
            expect(response.statusCode).to.not.equal(200);
            updated();
        });
    });

    it("for result do return actual error message", (updated) => {
        request(url, (err, response, body) => {
            body = JSON.parse(body);
            expect(body.err).to.equal('Both input should be a number');
            updated();
        });
    });

});

describe("adding two number ", () => {

    const url = "http://localhost:8080/addNumber/1/3";

    it("requests return status code 200", (updated) => {
        request(url, (err, response, body) => {
            expect(response.statusCode).to.equal(200);
            updated();
        });
    });

    it("for result do return status code 200 body ", (updated) => {
        request(url, (err, response, body) => {
            body = JSON.parse(body);
            expect(body.statusCode).to.equal(200);
            updated();
        });
    });

    it("for result do return a number ", (updated) => {
        request(url, (err, response, body) => {
            body = JSON.parse(body);
            expect(body.result).to.be.a('number');
            updated();
        });
    });

    it("for result return 4", (updated) => {
        request(url, (err, response, body) => {
            body = JSON.parse(body);
            expect(body.result).to.equal(4);
           updated();
        });
    });


});