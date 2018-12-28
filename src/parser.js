const { EMPTY_STRING, HYPHEN } = require('./constants');


const getLongOptions = function(shortOption){
  const options = {'l': 'lineCount', 'w': 'wordCount', 'c': 'charCount'};
  return options[shortOption];
}

const mapOptions = function(options){
  return options.map(getLongOptions);
}

const createParameterObject = function (options, fileNames) {
  return { options, fileNames};
};

const hasOption = function (option) {
  return option.startsWith(HYPHEN);
};

const replaceHyphen = function(option){
  return option.replace(HYPHEN, EMPTY_STRING);
}

const parse = function (userArgs) {
  let options = userArgs.filter(hasOption);
  let fileNames = userArgs.slice(options.length);
  options = options.map(replaceHyphen);
  options = options.join(EMPTY_STRING).split(EMPTY_STRING);
  
  if (options.length == 0) {
    options = ['l', 'w', 'c'];
  }
  return createParameterObject(mapOptions(options), fileNames);
};

module.exports = { parse };