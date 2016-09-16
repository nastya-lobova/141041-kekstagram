'use strict';

var BaseElement = function(element) {
  this.element = element;
};

BaseElement.prototype.add = function(container) {
  container.appendChild(this.element);
};

BaseElement.prototype.remove = function() {
  this.element.parentNode.removeChild(this.element);
};

module.exports = BaseElement;
