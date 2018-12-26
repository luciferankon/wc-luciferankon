const {SPACE, EMPTY, TAB} = require('./constants');

const defaultFormatter = function({lineCount, wordCount, charCount, fileName}) {
  const counts = [EMPTY, lineCount, wordCount, charCount];
  return counts.join(TAB) + SPACE + fileName;
};

const lineFormatter = function({lineCount, fileName}){
  const counts = [EMPTY, lineCount];
  return counts.join(TAB) + SPACE + fileName;
}

const charFormatter = function({charCount, fileName}){
  const counts = [EMPTY, charCount];
  return counts.join(TAB) + SPACE + fileName;
}

module.exports = { defaultFormatter, lineFormatter, charFormatter };