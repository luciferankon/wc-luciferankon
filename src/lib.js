const getWcDetails = function(content, fileName){
  const lines = content.split('\n');
  const noOfLines = lines.length - 1;
  const words = lines.map( x => x.split(' ')).length - 1;
  const chars = content.split('').length;
  return ['', noOfLines, words, chars].join('\t') + ' ' + fileName;
}



const wc = function(fileName, fs){
  const content = fs.readFileSync(fileName,'utf8');
  return getWcDetails(content,fileName);
}

module.exports = {wc};
