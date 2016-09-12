'use strict';

/**
 * Продление цепочки прототипов
 * @param {object} childComponent
 * @param {object} inheritComponent
 * @return {object}
 */
var inherit = function(childComponent, inheritComponent) {
  var EmptyConstructor = function() {};
  EmptyConstructor.prototype = inheritComponent.prototype;
  childComponent.prototype = new EmptyConstructor();
};

module.exports = inherit;
