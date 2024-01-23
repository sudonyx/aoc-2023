function determineHand(obj) {
  if (Object.values(obj).includes(5)) {
    return 'fiveOfKind';
  } else if (Object.values(obj).includes(4)) {
    return 'fourOfKind';
  } else if (Object.values(obj).includes(3) && Object.values(obj).includes(2)) {
    return 'fullHouse';
  } else if (Object.values(obj).includes(3)) {
    return 'threeOfKind';
  } else if (Object.values(obj).includes(2) && Object.keys(obj).length == 3) {
    return 'twoPair';
  } else if (Object.values(obj).includes(2)) {
    return 'onePair';
  } else {
    return 'highCard';
  }
}

function determineHandJoker(obj) {
  if (obj.hasOwnProperty('J')) {
    if (Object.keys(obj).length <= 2) {
      return 'fiveOfKind';
    } else if ((obj['J'] == 1 && Object.values(obj).includes(3)) || (obj['J'] > 1 && Object.keys(obj).length == 3)) {
      return 'fourOfKind';
    } else if (Object.keys(obj).length == 3) {
      return 'fullHouse';
    } else if (Object.keys(obj).length == 4) {
      return 'threeOfKind';
    } else {
      return 'onePair';
    }
  } else {
    return determineHand(obj)
  }
}

module.exports = { determineHand, determineHandJoker };
