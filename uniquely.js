var uniq = require('uniq');

module.exports = function(commaSeparated) {
  return uniq(commaSeparated.split(','));
};
