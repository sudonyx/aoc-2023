const fs = require("fs");
const readline = require("readline");

const filePath = 'data.txt';

const fileStream = fs.createReadStream(filePath)

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

const partOneSolution = (seeds, dataArray) => {
  let locs = []
  seeds.forEach(seed => {
    let numToEval = parseInt(seed)

    dataArray.forEach(map => {
      for (const i in map) {
        const rangeValue = parseInt(map[i][2])
        const sourceRangeStart = parseInt(map[i][1])
        const sourceRangeEnd = sourceRangeStart + (rangeValue - 1)
        const destRangeStart = parseInt(map[i][0])

        if (numToEval >= sourceRangeStart && numToEval <= sourceRangeEnd) {
          numToEval += (destRangeStart - sourceRangeStart)
          break
        }
      }
    })
    locs.push(numToEval)
  })

  return Math.min(...locs);
}

const partTwoSolution = (seeds, dataArray) => {
  console.log(seeds);
  console.log(dataArray);

  let seedPairs = []
  for (let i = 0; i < seeds.length; i += 2) {
    seedPairs.push(seeds.slice(i, i + 2))
  }

  seedPairs.forEach(seedPair => {
    let rangesToEval = [[parseInt(seedPair[0]), (parseInt(seedPair[0]) + parseInt(seedPair[1] - 1))]]

    dataArray.forEach(map => {
      let sourceMapLine = []
      let destMapLine = []
      for (const n in map) {
        const rangeValue = parseInt(map[n][2])
        const sourceRangeStart = parseInt(map[n][1])
        const sourceRangeEnd = sourceRangeStart + (rangeValue - 1)
        const destRangeStart = parseInt(map[n][0])
        const destRangeEnd = destRangeStart + (rangeValue - 1)

        sourceMapLine.push([sourceRangeStart, sourceRangeEnd])
        destMapLine.push([destRangeStart, destRangeEnd])

        // for (const i in rangesToEval) {
        //   console.log(i);
        //   if ((rangesToEval[i] >= sourceRangeStart && rangesToEval[i] <= sourceRangeEnd) &&
        //       (rangesToEval[i + 1] >= sourceRangeStart && rangesToEval[i + 1] <= sourceRangeEnd)) {
        //     console.log('all source range in dest range');
        //     rangesToEval[i] += (destRangeStart - sourceRangeStart)
        //     rangesToEval[i + 1] += (destRangeStart - sourceRangeStart)
        //   } else if (rangesToEval[i] >= sourceRangeStart && rangesToEval[i] <= sourceRangeEnd) {
        //     console.log('only source range start in dest range');
        //     rangesToEval.push(sourceRangeEnd + 1, rangesToEval[i + 1])
        //     rangesToEval[i] += (destRangeStart - sourceRangeStart)
        //     rangesToEval[i + 1] = destRangeEnd
        //   } else if (rangesToEval[i + 1] >= sourceRangeStart && rangesToEval[i + 1] <= sourceRangeEnd) {
        //     console.log('only source range end in dest range');
        //     rangesToEval.push(rangesToEval[i], sourceRangeStart - 1)
        //     rangesToEval[i] = destRangeStart
        //     rangesToEval[i + 1] += (destRangeStart - sourceRangeStart)
        //   } else if (rangesToEval[i] <= sourceRangeStart && rangesToEval[i + 1] >= sourceRangeEnd) {
        //     console.log('source range contains dest range');
        //     rangesToEval.push(rangesToEval[i], sourceRangeStart - 1)
        //     rangesToEval.push(sourceRangeEnd + 1, rangesToEval[i + 1])
        //     rangesToEval[i] = sourceRangeStart + (destRangeStart - sourceRangeStart)
        //     rangesToEval[i + 1] = sourceRangeEnd + (destRangeStart - sourceRangeStart)
        //   } else {
        //     console.log('source range not in dest range');
        //   }
        // }

        // if ((minToEval >= sourceRangeStart && minToEval <= sourceRangeEnd) &&
        //     (maxToEval >= sourceRangeStart && maxToEval <= sourceRangeEnd)) {
        //   console.log('all source range in dest range');
        //   minToEval += (destRangeStart - sourceRangeStart)
        //   maxToEval += (destRangeStart - sourceRangeStart)
        //   break
        // } else if (minToEval >= sourceRangeStart && minToEval <= sourceRangeEnd) {
        //   console.log('only source range start in dest range');
        // } else if (maxToEval >= sourceRangeStart && maxToEval <= sourceRangeEnd) {
        //   console.log('only source range end in dest range');
        // } else {
        //   console.log('source range not in dest range');
        // }
      }
      console.log('seed range:', rangesToEval);
      console.log('source map:', sourceMapLine);
      console.log('dest map:', destMapLine);

      let n = 0;

      for (let n = 0; n < rangesToEval.length; n++) {
        for (let i = 0; i < sourceMapLine.length; i++) {
          if (rangesToEval[n][0] >= sourceMapLine[i][0] && rangesToEval[n][1] <= sourceMapLine[i][1]) {
            console.log('seed range inside source range, source map chunk:', `${i + 1}`);
            tempRange = [rangesToEval[n][0] + (destMapLine[i][0] - sourceMapLine[i][0]),
                        rangesToEval[n][1] + (destMapLine[i][0] - sourceMapLine[i][0])]


            console.log('temp seed range', tempRange);

          } else if (rangesToEval[n][0] >= sourceMapLine[i][0] && rangesToEval[n][0] <= sourceMapLine[i][1]) {
            console.log('seed range start in source range, source map chunk:', `${i + 1}`);
            highExtraRange = [(sourceMapLine[i][1] + 1), rangesToEval[n][1]]
            tempRange = [rangesToEval[n][0] + (destMapLine[i][0] - sourceMapLine[i][0]),
                        rangesToEval[n][1] + (destMapLine[i][0] - sourceMapLine[i][0])]

            console.log('temp seed range:', tempRange);
            console.log('high extra range', highExtraRange);

          } else if (rangesToEval[n][1] >= sourceMapLine[i][0] && rangesToEval[n][1] <= sourceMapLine[i][1]) {
            console.log('seed range end in source range, source map chunk:', `${i + 1}`);
            lowExtraRange = [rangesToEval[n][0], (sourceMapLine[i][0] - 1)]
            tempRange = [rangesToEval[n][0] + (destMapLine[i][0] - sourceMapLine[i][0]),
                        rangesToEval[n][1] + (destMapLine[i][0] - sourceMapLine[i][0])]

            console.log('temp seed range', tempRange);
            console.log('low extra range:', lowExtraRange);

          } else if (rangesToEval[n][0] < sourceMapLine[i][0] && rangesToEval[n][1] > sourceMapLine[i][1]) {
            console.log('seed range includes source range, source map chunk:', `${i + 1}`);
            lowExtraRange = [rangesToEval[n][0], (sourceMapLine[i][0] - 1)]
            highExtraRange = [(sourceMapLine[i][1] + 1), rangesToEval[n][1]]
            tempRange = [rangesToEval[n][0] + (destMapLine[i][0] - sourceMapLine[i][0]),
                        rangesToEval[n][1] + (destMapLine[i][0] - sourceMapLine[i][0])]

            console.log('temp seed range:', tempRange);
            console.log('low extra range', lowExtraRange);
            console.log('high extra range', highExtraRange);

          } else {
            console.log('seed range not inside source range, source map chunk:', `${i + 1}`);
          }
        }
        rangesToEval = [tempRange]
        console.log('\n');
      }
    })
  })

  // let minLoc = 999999999999
  // seedPairs.forEach(seedPair => {
  //   for (let x = 0; x < parseInt(seedPair[1]); x += 1) {
  //     let numToEval = (parseInt(seedPair[0]) + x)

  //     dataArray.forEach(map => {
  //       for (const i in map) {
  //         if (numToEval >= parseInt(map[i][1]) && numToEval <= (parseInt(map[i][1]) + parseInt(map[i][2]))) {
  //           numToEval = numToEval + (map[i][0] - map[i][1])
  //           break
  //         }
  //       }
  //     })
  //     if (numToEval < minLoc) { minLoc = numToEval }
  //   }
  // })

  // return(minLoc);
}

const re = /(\d+)/g;
let tempArr = [];
let dataArray = [];

rl.on('line', (line) => {
  const matchData = line.match(re);

  if (matchData === null) {
    if (tempArr.length > 0) { dataArray.push(tempArr) }
    tempArr = []
  } else {
    tempArr.push(matchData);
  }
});

rl.on('close', () => {
  // catch the last lines of the file and add to array
  dataArray.push(tempArr)

  const seeds = dataArray[0][0]
  dataArray = dataArray.slice(1)

  console.log('Part One: ', partOneSolution(seeds, dataArray));
  console.log('Part Two: ', partTwoSolution(seeds, dataArray));
});
