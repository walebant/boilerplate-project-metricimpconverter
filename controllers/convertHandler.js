function ConvertHandler() {
  const validUnits = ["gal", "l", "lbs", "kg", "mi", "km"];
  this.getNum = function (input) {
    // if input has no digit defualt to 1
    if (!/\d/.test(input)) return 1;
    // has multiple division
    const num = input.match(/[0-9./]+/g)[0];
    if (num.includes("/", 2)) {
      console.log({ num });
      return false;
    }

    if (num.includes("/", 1)) {
      const sep = num.split("/");
      const result = Number(sep[0]) / Number(sep[1]);
      return result;
    }
    return Number(num);
  };

  this.getUnit = function (input) {
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

    console.log({ initNum, initUnit });

    const returnUnit = this.getReturnUnit(initUnit);

    const returnNum = () => {
      if (initUnit === "mi") return parseFloat(initNum * miToKm);
      if (initUnit === "km") return parseFloat(initNum / miToKm);
      if (initUnit === "gal") return parseFloat(initNum * galToL);
      if (initUnit === "L") return parseFloat(initNum / galToL);
      if (initUnit === "lbs") return parseFloat(initNum * lbsToKg);
      if (initUnit === "kg") return parseFloat(initNum / lbsToKg);
    };

    let result = {
      initNum,
      initUnit,
      returnNum: returnNum().toFixed(5),
      returnUnit,
      string: this.getString(initNum, initUnit, returnNum, returnUnit),
    };

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum().toFixed(5)} ${returnUnit}`;
  };
}

module.exports = ConvertHandler;
