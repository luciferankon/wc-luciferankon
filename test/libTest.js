const assert = require ('assert');
const {wc} = require('../src/lib.js');

const mockReader = function(fileName){
  return function(actualPath){
    return fileName[actualPath];
  }
}

describe('wc',() => {
  it('should return the number of line, words and characters with file name',() => {
    let filePath = {};
    filePath['file'] = 'ankon\n';
    const fs = {
      readFileSync : mockReader(filePath)
    };
    const expectedOutput = "\t1\t1\t6 file";
    const actualOutput = wc('file',fs);
    assert.deepEqual(expectedOutput,actualOutput);
  });
});