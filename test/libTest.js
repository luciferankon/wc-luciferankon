const assert = require ('assert');
const { wc } = require('../src/lib.js');

const mockReader = function(fileName){
  return function(actualPath){
    return fileName[actualPath];
  }
}
const defaultFormatter = function(){
}

const lineFormatter = function(){
}

describe('wc',() => {
  beforeEach(()=>{
    let filePath = {};
    filePath['file'] = 'ankon\n';
    fs = {
      readFileSync : mockReader(filePath)
    };
  });

  it('should return the number of line, words and characters with file name',() => {
    const expectedOutput = '\t1\t1\t6 file';
    const actualOutput = wc(['file'],fs);
    assert.deepEqual(expectedOutput,actualOutput);
  });

  it('should return number of line with file name when \'-l\' option is specified', () => {
    const expectedOutput = '\t1 file';
    const actualOutput = wc(['-l','file'],fs);
    assert.deepEqual(expectedOutput,actualOutput);
  });

  it('should return number of character with file name when \'-c\' option is specified', () =>{
    const expectedOutput = '\t6 file';
    const actualOutput = wc(['-c','file'],fs);
    assert.deepEqual(expectedOutput,actualOutput);
  });

  it('should return number of words with file name when \'-w\' option is specified', () => {
    const expectedOutput = '\t1 file';
    const actualOutput = wc(['-w','file'],fs);
    assert.deepEqual(expectedOutput,actualOutput);
  });

  it('should return number of line, words and characters with file name if option is combination of all options', () =>{
    const expectedOutput = '\t1\t1\t6 file';
    const actualOutput = wc(['-lcw','file'],fs);
    assert.deepEqual(expectedOutput,actualOutput);
  });

  it('should return number of line, words with file name if -l, -w is specified',() =>{
    const expectedOutput = '\t1\t1 file';
    const actualOutput = wc(['-lw','file'], fs);
    assert.deepEqual(expectedOutput,actualOutput);
  });
  describe('for multiple files',() => {
    beforeEach(()=>{
      let filePath = {};
      filePath['file'] = 'ankon\n';
      filePath['file1'] = 'js\n';
      fs = {
        readFileSync : mockReader(filePath)
      };
    });

    it('should return the number of line, words and characters with file names',() => {
      const expectedOutput = '\t1\t1\t6 file\n\t1\t1\t3 file1\n\t2\t2\t9 total';
      const actualOutput = wc(['file','file1'],fs);
      assert.deepEqual(expectedOutput,actualOutput);
    });
  });
});