const { EMPTY } = require('./constants');

const { 
  getLines, 
  getChars, 
  getWords
} =require('./utils');

const { defaultFormatter, lineFormatter } = require('./formatResult');

const countWords = function(content) {
  const words = getWords(content);
  return words.length;
};

const countChars = function(content) {
  const chars = getChars(content);
  return chars.length;
};

const countLines = function(content) {
  const lines = getLines(content);
  return lines.length - 1;
  
};

const getCounts = function(content) {
  const lineCount = countLines(content);
  const wordCount = countWords(content);
  const charCount = countChars(content);
  return { lineCount, wordCount, charCount };
};

const createObject = function(option,fileName, formatter){
  return {option, fileName, formatter};
}

const parser = function(args){
  const maybeOption = args[0];
  const fileName = args[1];
  if(!maybeOption.startsWith('-')){
    return createObject(EMPTY,maybeOption, defaultFormatter);
  }
  return createObject(maybeOption,fileName, lineFormatter);
}


const wc = function(args, fs) {
  const { option, fileName, formatter }  = parser(args);
  const content = fs.readFileSync(fileName, "utf8");
  const {lineCount, wordCount, charCount} = getCounts(content, args);
  const result = formatter({lineCount, wordCount, charCount, fileName});
  return result;
};

module.exports = { wc };
