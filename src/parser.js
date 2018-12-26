const { EMPTY } = require('./constants');
const HYPHEN = '-';

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

const parser = function (userArgs) {
  let options = userArgs.filter((userArg) => hasOption(userArg));
  let fileNames = userArgs.slice(options.length);
  options = options.map((option) => option.replace(HYPHEN, EMPTY));
  options = options.join(EMPTY).split(EMPTY);
  
  if (options.length == 0) {
    options = ['l', 'w', 'c'];
  }
  return createParameterObject(mapOptions(options), fileNames);
};

module.exports = { parser };