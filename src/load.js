'use strict';

/**
 * Функция запроса данных jsonp
 * @param {String} url
 * @param {Object} params
 * @param {Function} callback
 */
module.exports = function(url, params, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function(evt) {
    var loadedData = JSON.parse(evt.target.response);
    callback(loadedData);
  };
  xhr.open('GET', url + '?from=' + (params.from || 0) + '&to=' + (params.to || Infinity) + '&filter=' + (params.filter || 'default'));
  xhr.send();
};
