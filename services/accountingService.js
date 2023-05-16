/*
  parses .csv file into JS_Array and exports it
  NOT USED IN DEMO
*/

const fs = require("fs");

const initialCSV = "./files/KST.csv";
const convertedCSV = "./files/convertedKST.csv";

const { csvToObj } = require("csv-to-js-parser");

try {
  const data = fs.readFileSync(initialCSV, "binary");
  fs.writeFileSync(convertedCSV, data);
} catch (err) {
  console.log(err);
}

const data = fs.readFileSync(convertedCSV).toString();

let newArr = csvToObj(data, ";");

exports.getAccountingData = newArr;
