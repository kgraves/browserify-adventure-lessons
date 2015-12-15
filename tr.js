var split = require('split');
var sprintf = require('sprintf');
var through = require('through2');
var quote = require('quote-stream');

module.exports = function (file) {
  if (!/\.txt$/.test(file)) {
    return through();
  }

  /**
  var lineNo = 0;
  var numberer = through(function(line, _, next) {
    if (lineNo % 5 === 0) {
      this.push(sprintf('%3d %s', lineNo, line));
    } else {
      this.push(sprintf('    %s', line));
    }

    lineNo += 1;
    next();
  });
  */

  var numberer = through(function(buffer, _, next) {
    var contents = buffer.toString();

    // number + indent lines
    var lines = contents.split('\n').map(function(line, index) {
      if (index % 5 === 0) {
        return sprintf('%3d %s', index, line);
      } else {
        return sprintf('    %s', line);
      }
    }).join('\\n');

    // quote and wrap.
    lines = 'module.exports="' + lines + '"';

    this.push(lines);
  });

  var concater = through(function(buffer, _, next) {
    this._contents += buffer;
    next();
  }, function(done) {
    this.push(this._contents);
    done();
  });

  return concater.pipe(numberer);

  // manually push prefix
  // prefix.push('module.exports =');

  /**
  return split()
      .pipe(numberer)
      .pipe(quote())
      .pipe(through(function(buff, encoding, next) {
        console.error('ASDFASDFASDF');
        console.error(encoding);
      }))
      .pipe(prefix);
  */
};
