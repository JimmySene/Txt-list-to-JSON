#!/usr/bin/env node

const readline = require("readline");
const fs = require("fs");

const ErrorMessages = {
  NO_ARGS: "no_args",
  BAD_FORMAT: "bad_format",
}

const showErrorMessage = (error) => {
  switch (error) {
    case ErrorMessages.NO_ARGS:
      console.error("Error : You need to give a text file !");
      break;
    case ErrorMessages.BAD_FORMAT:
      console.error("Error : You didn't give a text file !");
      break;
  }
}

const givenFile = process.argv[2];

if(givenFile == null) return showErrorMessage(ErrorMessages.NO_ARGS);
if(givenFile.endsWith(".txt") === false) return showErrorMessage(ErrorMessages.BAD_FORMAT);

const file = readline.createInterface({
  input: fs.createReadStream(givenFile),
  output: process.stdout,
  terminal: false
});

const array = [];

file.on("line", (line) => {
  if (!isNaN(line)) return array.push(Number(line));
  if (line === "true") return array.push(true);
  if (line === "false") return array.push(false);
  array.push(line.trim());
});

file.on("close", () => {
  const jsonArray = JSON.stringify(array);
  fs.writeFileSync("./list.json", jsonArray);
  console.log(`Success : list.json file created.`);
});




