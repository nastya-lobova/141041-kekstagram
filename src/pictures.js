'use strict';

(function() {
  var pictures = [];
  var template = document.getElementById('picture-template');
  var pictureContainer = document.querySelector('.pictures');
  /** @constant {number} */
  var IMAGE_LOAD_TIMEOUT = 10000;
  var elementToClone;

  // Функция запроса данных jsonp
  function getJsonp(url, callback) {
    window.jsonpCallback = callback;
    var elementScript = document.createElement('script');
    elementScript.src = url + '?callback=jsonpCallback';
    document.body.appendChild(elementScript);
  }

  if ('content' in template) {
    elementToClone = template.content.querySelector('.picture');
  } else {
    elementToClone = template.querySelector('.picture');

  /**
   * @param {Object} data
   * @param {HTMLElement} container
   * @return {HTMLElement}
   */
  // Отрисовка данных по шаблону
  function getPicturesTemplate(data, container) {
    var picture = elementToClone.cloneNode(true);
    var image = new Image(182, 182);
    var imageLoadTimeout;

    picture.querySelector('.picture-comments').textContent = data.comments;
    picture.querySelector('.picture-likes').textContent = data.likes;

    image.onload = function(evt) {
      clearTimeout(imageLoadTimeout);
      picture.href = evt.target.src;
      picture.querySelector('img').src = evt.target.src;
    };

    image.onerror = function() {
      picture.classList.add('picture-load-failure');
    };

    imageLoadTimeout = setTimeout(function() {
      picture.querySelector('img').src = '';
      picture.classList.add('hotel-nophoto');
    }, IMAGE_LOAD_TIMEOUT);

    image.src = data.url;
    container.appendChild(picture);
    return picture;
  }

  // Получение фотографий
  function getPictures() {
    var filters = document.querySelector('.filters');
    filters.classList.add('hidden');

    //  Обработка полученных данных
    function renderPictures(data) {
      pictures = data;

      pictures.forEach(function(image) {
        getPicturesTemplate(image, pictureContainer);
      });

      filters.classList.remove('hidden');
    }

    getJsonp('http://localhost:1506/api/pictures', renderPictures);
  }

  getPictures();
})();
