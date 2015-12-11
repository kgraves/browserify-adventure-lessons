var domify = require('domify');

var Widget = function() {
  if (!(this instanceof Widget)) return new Widget();
  this._el = domify('<div>Hello <span class="name"></span>!</div>');
};

Widget.prototype.setName = function(str) {
  this._el.querySelector('.name').textContent = str;
};

Widget.prototype.appendTo = function(target) {
  target.appendChild(this._el);
};

module.exports = Widget;
