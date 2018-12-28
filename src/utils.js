const {NEWLINE, EMPTY_STRING} = require('./constants');

const getLines = function(content) {
  return content.split(NEWLINE);
};

const getChars = function(content) {
  return content.split(EMPTY_STRING);
};

const getWords = function(content) {
  const trimmedContent = content.trim();
  return trimmedContent.split(/[ \n]+/);
}

module.exports = {getLines, getChars, getWords};