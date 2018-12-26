const NEWLINE = "\n";
const SPACE = " ";
const EMPTY = "";
const TAB = "\t";

const getLines = function(content) {
  return content.split(NEWLINE);
};

const getChars = function(content) {
  return content.split(EMPTY);
};

const isNotEmpty = function(word){
  return word !== EMPTY;
}
const getWords = function(line) {
  return line.split(SPACE).filter(isNotEmpty);
};

const getLength = function(word) {
  return word.length;
};

const addNumbers = function(first, second) {
  return first + second;
};

const countWords = function(lines) {
  const words = lines.map(getWords);
  return words.map(getLength).reduce(addNumbers, 0);
};

const countLinesAndWords = function(content) {
  const lines = getLines(content);
  const lineCount = lines.length - 1;
  const wordCount = countWords(lines);
  return { lineCount, wordCount };
};

const countChars = function(content) {
  const chars = getChars(content);
  return chars.length;
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
