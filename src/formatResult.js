const {SPACE, EMPTY, TAB} = require('./constants');

const formatter = function(result, options, fileName){
  const sortedOptions = sortOptions(options);
  const counts = sortedOptions.map(option => {
    return TAB + result[option];
  });
  
  return counts.join(EMPTY) + SPACE + fileName;
};

const sortOptions = function(options) {
  const sortedOptions = ['lineCount', 'wordCount', 'charCount'];
  return sortedOptions.filter(option => options.includes(option));
};

module.exports = { 
  formatter
};