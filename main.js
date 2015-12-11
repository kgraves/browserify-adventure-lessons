var fs = require('fs');
var src = fs.readFileSync('/home/kg/.nvm/versions/node/v5.0.0/lib/node_modules/browserify-adventure/problems/using_transforms/wake.txt', 'utf8');
var sprintf = require('sprintf');

var lines = src.split('\n').forEach(function(line, index) {
  if (index % 5 === 0) {
    console.log(sprintf('%3d %s', index, line));
  } else {
    console.log(sprintf('    %s', line));
  }
});
