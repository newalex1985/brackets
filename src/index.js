module.exports = function check(str, bracketsConfig) {

  var closingBrackets = [];
  var foundBracket;
  var result = true;

  for (var i = 0; i < str.length; i++) {

    foundBracket = find(str[i], bracketsConfig);

    if (foundBracket.length != 0) {

      if (foundBracket[0] == 1) {
        closingBrackets.push(foundBracket[1]);
      } else if (foundBracket[0] == 3) {

        if (closingBrackets.length == 0) {
          result = false;
          return result;
        }

        if (str[i] != closingBrackets[closingBrackets.length - 1]) {
          result = false;
          return result;
        } else {
          closingBrackets.pop();
        }

      } else {

        if (closingBrackets.indexOf(str[i]) != -1) {
          if (str[i] != closingBrackets[closingBrackets.length - 1]) {
            closingBrackets.push(foundBracket[1]);
          } else {
            closingBrackets.pop();
          }
        } else {
          closingBrackets.push(foundBracket[1]);
        }
      }
    } else {
      result = false;
      return result;
    }
  }

  if (closingBrackets.length != 0) {
    result = false;
    return result;
  }

  return result;
}

function find(currentBracket, bracketsConfig) {

  var indexBracket;
  var foundBracket = [];

  for (var j = 0; j < bracketsConfig.length; j++) {
    indexBracket = bracketsConfig[j].indexOf(currentBracket);
    if (indexBracket != -1) {
      if ((indexBracket % 2) == 0) {
        if (currentBracket != bracketsConfig[j][indexBracket + 1]) {
          foundBracket[0] = 1;
          foundBracket[1] = bracketsConfig[j][indexBracket + 1];
        } else {
          foundBracket[0] = 2;
          foundBracket[1] = bracketsConfig[j][indexBracket + 1];
        }
      } else {
        foundBracket[0] = 3;
        foundBracket[1] = bracketsConfig[j][indexBracket - 1];
      }
      return foundBracket;
    }
  }
  return foundBracket;
}