const {SPACE, EMPTY, TAB} = require('./constants');

const isOnlyOne = function(option){
  return option.length == 1;
}

const isTwo = function(option){
  return option.length == 2;
}

const formatter = function(result, option){
  const {lineCount, wordCount, charCount} = result;
  let count = [EMPTY, lineCount, wordCount, charCount];
  if(isOnlyOne(option)){
    [option] = option;
    count = [EMPTY, result[option]];
  }
  if(isTwo(option)){
    const firstOption = result[option[0]];
    const secondOption = result[option[1]];
    count = [EMPTY, firstOption, secondOption];
  }
  return count.join(TAB) + SPACE + result.fileName;
}

module.exports = { 
  formatter
};