const {SPACE, EMPTY, TAB} = require('./constants');

const { 
  addNumbers, 
  getLength, 
  getLines, 
  getChars, 
  getWords
} =require('./utils');

const countWords = function(lines) {
  const words = lines.map(getWords);
  return words.map(getLength).reduce(addNumbers, 0);
};

const countChars = function(content) {
  const chars = getChars(content);
  return chars.length;
};

const countLinesAndWords = function(content) {
  const lines = getLines(content);
  const lineCount = lines.length - 1;
  const wordCount = countWords(lines);
  return { lineCount, wordCount };
};

const getCounts = function(content) {
  const lineCount = countLinesAndWords(content).lineCount;
  const wordCount = countLinesAndWords(content).wordCount;
  const charCount = countChars(content);
  return { lineCount, wordCount, charCount };
};

const formatResult = function(content, fileName) {
  const { lineCount, wordCount, charCount } = getCounts(content);
  const counts = [EMPTY, lineCount, wordCount, charCount];
  return counts.join(TAB) + SPACE + fileName;
};

const wc = function(fileName, fs) {
  const content = fs.readFileSync(fileName, "utf8");
  return formatResult(content, fileName);
};

module.exports = { wc };
