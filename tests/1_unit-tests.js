const chai = require("chai");
let assert = chai.assert;
const { units, conversionRate, unitMapping } = require("../utils/constants");

const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("Input Number", function () {
    const inputNum = (arg) => convertHandler.getNum(arg);
    // #1
    test("#1 read a whole number input", function () {
      assert.strictEqual(inputNum("4mi"), 4);
    });
    // #2
    test("#2 read a decimal number input", function () {
      assert.strictEqual(inputNum("2.1km"), 2.1);
    });
    // #3
    test("#3 read a fractional input", function () {
      assert.strictEqual(inputNum("2/5L"), 0.4);
    });
    // #4
    test("#4 read a fractional input with decimal", function () {
      assert.strictEqual(inputNum("5.5/5km"), 1.1);
    });
    // #5
    test("#5 return an error on a double-fraction", function () {
      assert.isNotOk(inputNum("2.5/3/5"));
    });
    // #6
    test("#6 default to a numerical input of 1 when no numerical input is provided", function () {
      assert.strictEqual(inputNum(), 1);
    });
  });

  suite("Input Unit", function () {
    // #7
    test("#7 read each valid input unit", function () {
      Object.keys(units).forEach((unit) => {
        assert.isOk(convertHandler.getUnit(unit));
      });
    });
    // #8
    test("#8 error on invalid input unit", function () {
      assert.isNotOk(convertHandler.getUnit("gm"));
    });
    // #9
    test("#9 return correct unit for each valid input unit", function () {
      Object.entries(units).forEach((unit) => {
        assert.strictEqual(convertHandler.getReturnUnit(unit[0]), unit[1]);
      });
    });
    // #10
    test("#10 return the spelled-out string unit for each valid input unit", function () {
      Object.entries(unitMapping).forEach((entry) => {
        assert.strictEqual(convertHandler.spellOutUnit(entry[0]), entry[1]);
      });
    });
    // #11
    test("#11 correctly convert gal to L", function () {
      assert.strictEqual(convertHandler.convert(1, "gal"), 3.78541);
    });
    // #12
    test("#12 correctly convert L to gal", function () {
      assert.strictEqual(convertHandler.convert(1, "L"), 0.26417);
    });
    // #13
    test("#13 correctly convert mi to km", function () {
      assert.strictEqual(convertHandler.convert(1, "mi"), 1.60934);
    });
    // #14
    test("#14 correctly convert km to mi", function () {
      assert.strictEqual(convertHandler.convert(1, "km"), 0.62137);
    });
    // #15
    test("#15 correctly convert lbs to kg", function () {
      assert.strictEqual(convertHandler.convert(1, "lbs"), 0.45359);
    });
    // #16
    test("#16 correctly convert kg to lbs", function () {
      assert.strictEqual(convertHandler.convert(1, "kg"), 2.20462);
    });
  });
});
