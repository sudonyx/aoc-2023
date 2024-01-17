const fs = require('fs');
const readline = require('readline');
const filePath = 'data.txt';
const fileStream = fs.createReadStream(filePath)

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

let arr = []
rl.on('line', (line) => {
  arr.push(line);
});

rl.on('close', () => {
  const re = /(\d+)/g;
  const times = arr[0].match(re);
  const records = arr[1].match(re);

  console.log('part one:', partOne(times, records));
  console.log('part two:', partTwo(times, records));
});

function partOne(times, records) {
  return sumWins(times, records)
}


function partTwo(times, records) {
  time = parseInt(times.join(''))
  record = parseInt(records.join(''))

  return countWins(time, record)
}

function sumWins(times, records) {
  let wins = [];
  for (const t in times) {
    wins.push(countWins(times[t], records[t]));
  }
  let total = 1;
  wins.forEach(win => {
    total *= win;
  })
  return total;
}

function countWins(time, record) {
  let winCount = 0

  for (let i = 0; i <= parseInt(time); i++) {
    const distance = i * (time - i);

    if (distance > parseInt(record)) {
      winCount += 1;
    }
  }
  return winCount;
}
