const { parser } = require('./parser');
const { 
  getLines, 
  getChars, 
  getWords
} =require('./utils');

const { formatter } = require('./formatResult');

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

const wc = function(args, fs) {
  const { options, fileNames}  = parser(args);
  const contents = fileNames.map(fileName => fs.readFileSync(fileName, "utf8"));
  const [counts] = contents.map(getCounts);
  const formatterOfOneFile = formatter.bind(null,counts,options);
  const result = fileNames.map(formatterOfOneFile);
  return result.join('\n');
};

module.exports = { wc };
