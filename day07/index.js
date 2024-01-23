const fs = require('fs');
const readline = require('readline');
const { determineHand, determineHandJoker } = require('./determine-hand.js')

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

let handTypesOne = {
  fiveOfKind: [],
  fourOfKind: [],
  fullHouse: [],
  threeOfKind: [],
  twoPair: [],
  onePair: [],
  highCard: []
};

let handTypesTwo = {
  fiveOfKind: [],
  fourOfKind: [],
  fullHouse: [],
  threeOfKind: [],
  twoPair: [],
  onePair: [],
  highCard: []
};

rl.on('close', () => {
  arr = arr.map(elem => elem.split(' '));

  arr.forEach(elem => {
    let obj = {};
    elem[0].split('').forEach(card => {
      obj.hasOwnProperty(card) ? obj[card] += 1 : obj[card] = 1
    });

    handTypesOne[determineHand(obj)].push(elem)
    handTypesTwo[determineHandJoker(obj)].push(elem)
  });

  const cardOrderOne = '23456789TJQKA'.split('');
  console.log('part one:', solve(handTypesOne, cardOrderOne));

  const cardOrderTwo = 'J23456789TQKA'.split('');
  console.log('part two:', solve(handTypesTwo, cardOrderTwo));
});

function solve(handTypes, cardOrder) {
  sortHands(handTypes, cardOrder)

  const merged = mergeTypes(handTypes)

  let total = 0
  merged.forEach((type, index) => {
    total += ((index + 1) * parseInt(type[1]))
  });

  return total;
}

function mergeTypes(handTypes) {
  return [
    ...handTypes['highCard'],
    ...handTypes['onePair'],
    ...handTypes['twoPair'],
    ...handTypes['threeOfKind'],
    ...handTypes['fullHouse'],
    ...handTypes['fourOfKind'],
    ...handTypes['fiveOfKind']
  ];
}

function sortHands(handTypes, cardOrder) {
  Object.keys(handTypes).forEach(type => {
    handTypes[type].sort(compareHands);
  });

  function compareHands(handA, handB) {
    handA = handA[0].split('');
    handB = handB[0].split('');

    for (card in handA) {
      if (cardOrder.indexOf(handA[card]) < cardOrder.indexOf(handB[card])) {
        return - 1;
      } else if (cardOrder.indexOf(handA[card]) > cardOrder.indexOf(handB[card])) {
        return 1;
      }
    }
    return 0;
  }
}
