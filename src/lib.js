const { parse } = require("./parser");
const { getLines, getChars, getWords, isNotEmpty } = require("./utils");

const { formatter } = require("./formatResult");

const countWords = function(content) {
  const words = getWords(content).filter(isNotEmpty);
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

const getFileDetails = function({ fileContent, fileName }) {
  const lineCount = countLines(fileContent);
  const wordCount = countWords(fileContent);
  const charCount = countChars(fileContent);
  return { lineCount, wordCount, charCount, fileName };
};

const addKeyValues = function(first, second) {
  const lineCount = first.lineCount + second.lineCount;
  const wordCount = first.wordCount + second.wordCount;
  const charCount = first.charCount + second.charCount;
  const fileName = "total";
  return { lineCount, wordCount, charCount, fileName };
};

const getTotal = function(fileDetails) {
  return fileDetails.reduce(addKeyValues);
};

const ifMultipleFile = function(fileDetails) {
  if (fileDetails.length > 1) {
    const total = getTotal(fileDetails);
    fileDetails.push(total);
  }
  return fileDetails;
};

const printWordCount = function(args, outStream, fs) {
  const { fileNames, options } = parse(args);
  let files = [];
  let fileIndex = 0;
  const readFileFromList = function(err, content) {
    files.push({ fileContent: content, fileName: fileNames[fileIndex - 1] });
    if (files.length == fileNames.length + 1) {
      files.splice(0, 1);
      return outStream(wc(files, options));
    }
    return fs.readFile(fileNames[fileIndex++], "utf-8", readFileFromList);
  };
  return readFileFromList("", "");
};

const wc = function(files, options) {
  let fileDetails = files.map(getFileDetails);
  fileDetails = ifMultipleFile(fileDetails);
  const formatterOfOneFile = formatter.bind(null, options);
  const result = fileDetails.map(formatterOfOneFile);
  return result.join("\n");
};

module.exports = { printWordCount };
