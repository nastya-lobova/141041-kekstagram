'use strict';

var BaseElement = function(element) {
  this.element = element;
};

/**
 * Добавляет элемент на страницу
 * @param {Element} container
 */
BaseElement.prototype.add = function(container) {
  container.appendChild(this.element);
};

/** Удаляет элемент со страницы */
BaseElement.prototype.remove = function() {
  this.element.parentNode.removeChild(this.element);
};

module.exports = BaseElement;
