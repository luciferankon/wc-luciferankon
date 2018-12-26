const { EMPTY } = require('./constants');

const createObject = function(option, fileName){
  return {option, fileName};
}

const mapOption = function(option){
  let mappedOption = option.replace('-l', 'lineCount');
  mappedOption = mappedOption.replace('-w', 'wordCount');
  mappedOption = mappedOption.replace('-c', 'charCount');
  return mappedOption;
}

const isOnlyOne = function(option){
  return option.length >= 9;
}

const parser = function(args){
  const maybeOption = mapOption(args[0]);
  const fileName = args[1];
  if(isOnlyOne(maybeOption)){
    return createObject(maybeOption,fileName);
  }
  return createObject(EMPTY,maybeOption);
}

module.exports = { parser };