const { parse } = require('./parser');
const { 
  getLines, 
  getChars, 
  getWords,
  isNotEmpty
} =require('./utils');

const { formatter } = require('./formatResult');

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

const getFileDetails = function({fileContent, fileName}) {
  const lineCount = countLines(fileContent);
  const wordCount = countWords(fileContent);
  const charCount = countChars(fileContent);
  return { lineCount, wordCount, charCount, fileName };
};

const readFile = function(reader, encoding, fileName){
  const fileContent = reader(fileName, encoding);
  return {fileContent, fileName};
}

const addKeyValues = function(first, second){
  const lineCount = first.lineCount + second.lineCount;
  const wordCount = first.wordCount + second.wordCount;
  const charCount = first.charCount + second.charCount;
  const fileName = 'total';
  return {lineCount, wordCount, charCount, fileName};
}

const getTotal = function(fileDetails){
  return fileDetails.reduce(addKeyValues);
}

const ifMultipleFile = function(fileDetails){
  if(fileDetails.length > 1){
    const total = getTotal(fileDetails);
    fileDetails.push(total);
  }
  return fileDetails;
}

const getFiles = function(reader, fileNames){
  const utf8Reader = readFile.bind(null, reader, 'utf-8');
  return fileNames.map(utf8Reader);
}

const wc = function(args, fs) {
  const { options, fileNames}  = parse(args);
  const files = getFiles(fs.readFileSync, fileNames);
  let fileDetails = files.map(getFileDetails);
  fileDetails = ifMultipleFile(fileDetails);
  const formatterOfOneFile = formatter.bind(null,options);
  const result = fileDetails.map(formatterOfOneFile);
  return result.join('\n');
};

module.exports = { wc };
