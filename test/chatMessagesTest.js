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
  it("Request body should have a token property, on a successful login", done => {
    chai
      .request(app)
      .post("/api/user/login")
      .send({ name: "user", password: "asd" })
      .end(function(err, res) {
        expect(res.body).to.have.property("token");
        done();
      });
  });

  it("Request body should have an id property, on a successful login", done => {
    chai
      .request(app)
      .post("/api/user/login")
      .send({ name: "user", password: "asd" })
      .end(function(err, res) {
        expect(res.body).to.have.property("id");
        done();
      });
  });

  it("Request returns status code 400 on unsuccessful login", done => {
    chai
      .request(app)
      .post("/api/user/login")
      .send({ name: "user", password: "wrongPassword" })
      .end(function(err, res) {
        expect(res).to.have.status(400);
        done();
      });
  });

  it("Request body should not have a token property, on unsuccessful login", done => {
    chai
      .request(app)
      .post("/api/user/login")
      .send({ name: "user", password: "wrongPassword" })
      .end(function(err, res) {
        expect(res.body).to.not.have.property("token");
        done();
      });
  });

  it("Request body's name property equals to Name or password is incorrect n unsuccessful login", done => {
    chai
      .request(app)
      .post("/api/user/login")
      .send({ name: "user", password: "wrongPassword" })
      .end(function(err, res) {
        expect(res.body.name).to.equal("Name or password is incorrect");
        done();
      });
  });
});
