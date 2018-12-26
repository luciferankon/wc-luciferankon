const {SPACE, EMPTY, TAB} = require('./constants');

const isOnlyOne = function(option){
  return option.length == 9;
}

const formatter = function(result, option){
  const {lineCount, wordCount, charCount} = result;
  let count = [EMPTY, lineCount, wordCount, charCount];
  if(isOnlyOne(option)){
    count = [EMPTY, result[option]];
  }
  return count.join(TAB) + SPACE + result.fileName;
}

module.exports = { 
  formatter
};