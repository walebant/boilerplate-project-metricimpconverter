const { units, conversionRate, unitMapping } = require("../utils/constants");

function ConvertHandler() {
  this.getNum = function (input) {
    // if input has no digit defualt to 1
    if (!/\d/.test(input)) return 1;

    // extract numerical characters with "." or "/"
    const numString = input.match(/[0-9./]+/g)[0];
    // has multiple division
    const numOfDivision = numString.match(/\//g)?.length;
    // no "/": it's either Int or float
    if (!numOfDivision) return parseFloat(numString);
    // double "/": invalid number
    if (numOfDivision >= 2) return false;
    // single "/"
    const [numerator, denominator] = numString.split("/");
    return parseFloat(+numerator / +denominator);
  };

  this.getUnit = function (input) {
    // if input has no word
    if (!/[a-zA-Z]/.test(input)) return false;
    // select unit (all aplhabet character)
    const inputUnit = input.match(/[a-zA-Z]+/g)[0].toLowerCase();
    if (inputUnit === "l") return inputUnit.toUpperCase();
    if (!Object.keys(units).includes(inputUnit)) return false;
    return inputUnit;
  };

  this.getReturnUnit = function (initUnit) {
    return units[initUnit];
  };

  this.spellOutUnit = function (unit) {
    return unitMapping[unit];
  };

  this.convert = function (initNum, initUnit) {
    return parseFloat((conversionRate[initUnit] * initNum).toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
