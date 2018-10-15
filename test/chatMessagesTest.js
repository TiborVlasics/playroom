"use strict";

const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const app = require("../server");
const request = chai.request(app);

describe("GET /api/messages/", () => {
  it("should return status code 200", done => {
    request.get("/api/messages/").end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });
});

describe("POST /api/user/login", () => {
  it("body should have a token property", done => {
    chai
      .request(app)
      .post("/api/user/login")
      .send({ name: "user", password: "asd" })
      .end(function(err, res) {
        expect(res.body).to.have.property("token");
        done();
      });
  });
});
