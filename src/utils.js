'use strict';

var utils = {
  /**
   * Функция обертка throttle
   * @param {function} performFunction
   * @param {Number} delay
   */
  throttle: function(performFunction, delay) {
    var isThrottled = false;
    var saveArguments = null;
    var saveThis = null;

    function wrapper() {
      if (isThrottled) {
        saveArguments = arguments;
        saveThis = this;
        return;
      }

      performFunction.apply(this, arguments);

      isThrottled = true;

      setTimeout(function() {
        isThrottled = false;
        if (saveArguments) {
          wrapper.apply(saveThis, saveArguments);
          saveArguments = null;
          saveThis = null;
        }

      }, delay);
    }
    return wrapper;
  }
};

module.exports = utils;
