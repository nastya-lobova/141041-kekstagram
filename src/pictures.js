'use strict';

(function() {
  var Picture = require('./picture');
  var load = require('./load');
  var Gallery = require('./gallery');

  var pictures = [];
  var pictureContainer = document.querySelector('.pictures');
  var hotelLoadUrl = 'http://localhost:1506/api/pictures';

  //  Обработка полученных данных
  function renderPictures(data) {
    var filters = document.querySelector('.filters');
    filters.classList.add('hidden');
    pictures = data;

    pictures.forEach(function(image, index) {
      var picture = new Picture(image, index);
      pictureContainer.appendChild(picture.element);
    });
    Gallery.setPictures(pictures);
    filters.classList.remove('hidden');
  }

  load(hotelLoadUrl, renderPictures);
})();
