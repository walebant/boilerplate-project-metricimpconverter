function ConvertHandler() {
  this.getNum = function (input) {
    // if input has no digit defualt to 1
    if (!/\d/.test(input)) return 1;

    const num = input.match(/[0-9./]+/g)[0];
    // has multiple division
    const numOfDivision = num.match(/\//g)?.length;
    return numOfDivision >= 2 ? false : num;
  };

  this.getUnit = function (input) {
    const validUnits = ["gal", "l", "lbs", "kg", "mi", "km"];
    // if input has no word
    if (!/[a-zA-Z]/.test(input)) return false;
    // select unit (all aplhabet character)
    const unit = input.match(/[a-zA-Z]+/g)[0].toLowerCase();
    if (!validUnits.includes(unit)) return false;
    return unit === "l" ? unit.toUpperCase() : unit;
  };

  this.getReturnUnit = function (initUnit) {
    if (initUnit === "gal") return "L";
    if (initUnit === "L") return "gal";
    if (initUnit === "lbs") return "kg";
    if (initUnit === "kg") return "lbs";
    if (initUnit === "mi") return "km";
    if (initUnit === "km") return "mi";
  };

  this.spellOutUnit = function (unit) {
    if (unit === "mi") return "miles";
    if (unit === "km") return "kilometers";
    if (unit === "gal") return "galon";
    if (unit === "L") return "liters";
    if (unit === "lbs") return "pounds";
    if (unit === "kg") return "kilograms";
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let inputNum = initNum;
    if (typeof initNum === "number") {
      inputNum = initNum;
    } else if (initNum.includes("/")) {
      const sep = inputNum.split("/");
      inputNum = Number(sep[0]) / Number(sep[1]);
    } else {
      inputNum = Number(inputNum);
    }

    const returnUnit = this.getReturnUnit(initUnit);

    const returnNum = () => {
      if (initUnit === "mi") return parseFloat(inputNum * miToKm);
      if (initUnit === "km") return parseFloat(inputNum / miToKm);
      if (initUnit === "gal") return parseFloat(inputNum * galToL);
      if (initUnit === "L") return parseFloat(inputNum / galToL);
      if (initUnit === "lbs") return parseFloat(inputNum * lbsToKg);
      if (initUnit === "kg") return parseFloat(inputNum / lbsToKg);
    };

    let result = {
      initNum: inputNum,
      initUnit,
      returnNum: Number(returnNum().toFixed(5)),
      returnUnit,
      string: this.getString(initNum, initUnit, returnNum, returnUnit),
    };

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${Number(
      returnNum().toFixed(5)
    )} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
