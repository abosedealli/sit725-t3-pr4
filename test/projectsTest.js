const expect = require("chai").expect;
const request = require("request");

const dbo = require("../database/db");


describe("get all projects", () => {
    const url = "http://localhost:8080/api/projects";

    before((updated) => {
        dbo.connectToDatabase(() => {
            const projectsCollection = dbo.getDb().collection("projectsServ");
            projectsCollection.deleteMany({});
            for (let index = 1; index < 11; index++) {
                projectsCollection.insertOne({
                    projectID: 'test' + index,
                    title: 'test ' + index,
                    info: 'test info ' + index,
                    img: 'img ' + index
                })
            }
            setTimeout(() => {
                dbo.disconnect()
               updated();
            }, 1000);
        })
    });

    it("total body return status code 200", (updated) => {
        request(url, (err, response, body) => {
            expect(response.statusCode).to.equal(200);
            updated();
        });
    });

    it("total body returns type is equal to array", (updated) => {
        request(url, (err, response, body) => {
            body = JSON.parse(body);
            expect(body).to.be.a("array");
            updated();
        });
    });

    it("total body returns 8 projects", (updated) => {
        request(url, (err, response, body) => {
            body = JSON.parse(body);
            expect(body.length).to.equal(8);
            updated();
        });
    });


    after(() => {
        dbo.connectToDatabase(() => {
            const projectsCollection = dbo.getDb().collection("projectsServ");
            projectsCollection.deleteMany({});
            dbo.disconnect();
        })
    });


});