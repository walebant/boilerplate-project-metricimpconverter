const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  // #1
  test("#1 Convert a valid input such as 10L: GET request to /api/convert", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=10L")
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.deepEqual(res.body, {
          initNum: 10,
          initUnit: "L",
          returnNum: 2.64172,
          returnUnit: "gal",
          string: "10 liters converts to 2.64172 gallons",
        });
        done();
      });
  });
  // #2
  test("#2 Convert an invalid input such as 32g: GET request to /api/convert", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=32g")
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, "text/html");
        assert.equal(res.text, "invalid unit");
        done();
      });
  });
  // #3
  test("#3 Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kg")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "text/html");
        assert.equal(res.text, "invalid number");
        done();
      });
  });
  // #4
  test("#4 Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kilomegagram")
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, "text/html");
        assert.equal(res.text, "invalid number and unit");
        done();
      });
  });
  // #5
  test("#5 Convert with no number such as kg: GET request to /api/convert", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=kg")
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.deepEqual(res.body, {
          initNum: 1,
          initUnit: "kg",
          returnNum: 2.20462,
          returnUnit: "lbs",
          string: "1 kilograms converts to 2.20462 pounds",
        });
        done();
      });
  });
});
