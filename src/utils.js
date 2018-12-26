const {NEWLINE, SPACE, EMPTY} = require('./constants');

const isNotEmpty = function(word){
  return word !== EMPTY;
};

const addNumbers = function(first, second) {
  return first + second;
};

const getLength = function(word) {
  return word.length;
};

const getLines = function(content) {
  return content.split(NEWLINE);
};

const getChars = function(content) {
  return content.split(EMPTY);
};

const getWords = function(line) {
  return line.split(SPACE).filter(isNotEmpty);
};

module.exports = { isNotEmpty, addNumbers, getLength, getLines, getChars, getWords};