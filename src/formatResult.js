const {SPACE, EMPTY, TAB} = require('./constants');

const defaultFormatter = function({lineCount, wordCount, charCount, fileName}) {
  const counts = [EMPTY, lineCount, wordCount, charCount];
  return counts.join(TAB) + SPACE + fileName;
};

const lineFormatter = function({lineCount, fileName}){
  const count = [EMPTY, lineCount];
  return count.join(TAB) + SPACE + fileName;
}

const charFormatter = function({charCount, fileName}){
  const count = [EMPTY, charCount];
  return count.join(TAB) + SPACE + fileName;
}

const wordFormatter = function({wordCount, fileName}){
  const count = [EMPTY, wordCount];
  return count.join(TAB) + SPACE + fileName;
}

module.exports = { 
  defaultFormatter, 
  lineFormatter, 
  charFormatter, 
  wordFormatter
};