"use strict";

const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const app = require("../server");
const User = require("../models/User");


describe("POST /api/user/register", () => {

  after(() => {
    User.deleteOne({ name: "testUser" }).then(res => { })
  })

  it("Register new user should return with status 200", done => {
    chai
      .request(app)
      .post("/api/user/register")
      .send({ name: "testUser", password: "asd", password2: "asd", avatar: "https://api.adorable.io/avatars/141/testUser.png" })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  })

  it("Register with existing username should return with status 400", done => {
    chai
      .request(app)
      .post("/api/user/register")
      .send({ name: "user", password: "asd", password2: "asd", avatar: "https://api.adorable.io/avatars/141/user.png" })
      .end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
  })

  it("Register with existing username should return name property with message", done => {
    chai
      .request(app)
      .post("/api/user/register")
      .send({ name: "user", password: "asd", password2: "asd", avatar: "https://api.adorable.io/avatars/141/user.png" })
      .end(function (err, res) {
        expect(res.body.name).to.equal("Username already exists.");
        done();
      });
  })

  it("Register with not matching passwords should return password2 property with message", done => {
    chai
      .request(app)
      .post("/api/user/register")
      .send({ name: "user", password: "asd", password2: "asd1", avatar: "https://api.adorable.io/avatars/141/user.png" })
      .end(function (err, res) {
        expect(res.body.password2).to.equal("Passwords must match");
        done();
      });
  })

  it("Register with empty confirm password should return password2 property with message", done => {
    chai
      .request(app)
      .post("/api/user/register")
      .send({ name: "user", password: "asd", password2: "", avatar: "https://api.adorable.io/avatars/141/user.png" })
      .end(function (err, res) {
        expect(res.body.password2).to.equal("Confirm password field is required");
        done();
      });
  })

});


describe("POST /api/user/login", () => {
  it("Request body should have a token property, on a successful login", done => {
    chai
      .request(app)
      .post("/api/user/login")
      .send({ name: "user", password: "asd" })
      .end(function (err, res) {
        expect(res.body).to.have.property("token");
        done();
      });
  });

  it("Request body should have an id property, on a successful login", done => {
    chai
      .request(app)
      .post("/api/user/login")
      .send({ name: "user", password: "asd" })
      .end(function (err, res) {
        expect(res.body).to.have.property("id");
        done();
      });
  });

  it("Request returns status code 400 on unsuccessful login", done => {
    chai
      .request(app)
      .post("/api/user/login")
      .send({ name: "user", password: "wrongPassword" })
      .end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
  });

  it("Request body should not have a token property, on unsuccessful login", done => {
    chai
      .request(app)
      .post("/api/user/login")
      .send({ name: "user", password: "wrongPassword" })
      .end(function (err, res) {
        expect(res.body).to.not.have.property("token");
        done();
      });
  });

  it("Request body's name property equals to 'Name or password is incorrect' on unsuccessful login", done => {
    chai
      .request(app)
      .post("/api/user/login")
      .send({ name: "user", password: "wrongPassword" })
      .end(function (err, res) {
        expect(res.body.name).to.equal("Name or password is incorrect");
        done();
      });
  });
});
