const assert = require("assert");
const { parser } = require("../src/parser");

describe("parser", () => {
  describe("should return option and fileName in an object if", () => {
    it("one option and fileName is specified", () => {
      const expectedOutput = { options: ["lineCount"], fileNames: ["file"] };
      const actualOutput = parser(["-l", "file"]);
      assert.deepEqual(expectedOutput, actualOutput);
    });

    it("two option and fileName is specified", () => {
      const expectedOutput = {
        options: ["lineCount", "charCount"],
        fileNames: ["file"]
      };
      const actualOutput = parser(["-l", "-c", "file"]);
      assert.deepEqual(expectedOutput, actualOutput);
    });

    it("three option and fileName is specified", () => {
      const expectedOutput = {
        options: ["lineCount", "wordCount", "charCount"],
        fileNames: ["file"]
      };
      const actualOutput = parser(["-l", "-w", "-c", "file"]);
      assert.deepEqual(expectedOutput, actualOutput);
    });

    it("two options given together and fileName is specified", () => {
      const expectedOutput = {
        options: ["lineCount", "wordCount"],
        fileNames: ["file"]
      };
      const actualOutput = parser(["-l", "-w", "file"]);
      assert.deepEqual(expectedOutput, actualOutput);
    });

    it('three options given together and fileName is specified', () =>{
      const expectedOutput = {
        options: ["lineCount", "wordCount", "charCount"],
        fileNames: ["file"]
      };
      const actualOutput = parser(['-l','-w','-c','file']);
      assert.deepEqual(expectedOutput,actualOutput);
    });
  });
});
