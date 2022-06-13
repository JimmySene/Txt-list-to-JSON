const readline = require('readline');
const fs = require('fs');

const file = readline.createInterface({
  input: fs.createReadStream('./list.txt'),
  output: process.stdout,
  terminal: false
});

const array = [];

file.on('line', (line) => {
  if (!isNaN(line)) return array.push(Number(line));
  if (line === 'true') return array.push(true);
  if (line === 'false') return array.push(false);
  array.push(line.trim());
});

file.on('close', () => {
  const jsonArray = JSON.stringify(array);
  fs.writeFileSync('./list.json', jsonArray);
});




