'use strict';

/** Функция запроса данных jsonp
 * @param {String} url
 * @param {Function} callback
 */
module.exports = function(url, callback) {
  window.jsonpCallback = callback;
  var elementScript = document.createElement('script');
  elementScript.src = url + '?callback=jsonpCallback';
  document.body.appendChild(elementScript);
};
