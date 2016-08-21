'use strict';

(function() {
  var pictures = null;

  // Функция запроса данных jsonp
  function getJsonp(url, callback) {
    window.jsonpCallback = callback;
    var elementScript = document.createElement('script');
    elementScript.src = url + '?callback=jsonpCallback';
    document.body.appendChild(elementScript);
  }

  //  Обработка полученных данных
  function getPictures(data) {
    pictures = data;
  }

  getJsonp('http://localhost:1506/api/pictures', getPictures);
})();
