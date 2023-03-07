"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
    const input = req.query.input;

    if (!input) res.send("invalid input");

    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if (!initNum && !initUnit) return res.send("invalid number and unit");
    if (!initNum) return res.send("invalid number");
    if (!initUnit) return res.send("invalid unit");

    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);

    const string = convertHandler.getString(
      //initNum: should be original input with division
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );

    res.send({
      //initNum: should be original input with division
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string,
    });
  });
};
