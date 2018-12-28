const {SPACE, EMPTY_STRING, TAB} = require('./constants');

const formatter = function(options, fileDetails){
  const sortedOptions = sortOptions(options);
  const counts = sortedOptions.map(option => {
    return TAB + fileDetails[option];
  });
  
  return counts.join(EMPTY_STRING) + SPACE + fileDetails.fileName;
};

const sortOptions = function(options) {
  const sortedOptions = ['lineCount', 'wordCount', 'charCount'];
  return sortedOptions.filter(option => options.includes(option));
};

module.exports = { 
  formatter
};