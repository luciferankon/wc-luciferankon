const assert = require ('assert');
const { printWordCount } = require('../src/lib.js');

const createFileSystem = function (files) {
  return {
    readFile: function (fileName,buffer,func) {
      let err = !(Object.keys(files).includes(fileName))?true:null;
      return func(err , files[fileName])
    }
  };
};

const identity = (x) => x;

describe('printWordCount',() => {
  beforeEach(()=>{
    let filePath = {};
    filePath['file'] = 'ankon\n';
    fs = createFileSystem(filePath);
  });

  it('should return the number of line, words and characters with file name',() => {
    const expectedOutput = '\t1\t1\t6 file';
    const actualOutput = printWordCount(['file'],identity,fs);
    assert.deepEqual(expectedOutput,actualOutput);
  });

  it('should return number of line with file name when \'-l\' option is specified', () => {
    const expectedOutput = '\t1 file';
    const actualOutput = printWordCount(['-l','file'],identity,fs);
    assert.deepEqual(expectedOutput,actualOutput);
  });

  it('should return number of character with file name when \'-c\' option is specified', () =>{
    const expectedOutput = '\t6 file';
    const actualOutput = printWordCount(['-c','file'],identity,fs);
    assert.deepEqual(expectedOutput,actualOutput);
  });

  it('should return number of words with file name when \'-w\' option is specified', () => {
    const expectedOutput = '\t1 file';
    const actualOutput = printWordCount(['-w','file'],identity,fs);
    assert.deepEqual(expectedOutput,actualOutput);
  });

  it('should return number of line, words and characters with file name if option is combination of all options', () =>{
    const expectedOutput = '\t1\t1\t6 file';
    const actualOutput = printWordCount(['-lcw','file'],identity,fs);
    assert.deepEqual(expectedOutput,actualOutput);
  });

  it('should return number of line, words with file name if -l, -w is specified',() =>{
    const expectedOutput = '\t1\t1 file';
    const actualOutput = printWordCount(['-lw','file'], identity,fs);
    assert.deepEqual(expectedOutput,actualOutput);
  });
  describe('for multiple files',() => {
    beforeEach(()=>{
      let filePath = {};
      filePath['file'] = 'ankon\n';
      filePath['file1'] = 'js\n';
      fs = createFileSystem(filePath);
    });

    it('should return the number of line, words and characters with file names',() => {
      const expectedOutput = '\t1\t1\t6 file\n\t1\t1\t3 file1\n\t2\t2\t9 total';
      const actualOutput = printWordCount(['file','file1'],identity,fs);
      assert.deepEqual(expectedOutput,actualOutput);
    });
  });
});