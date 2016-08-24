'use strict';


  var picture = require('./picture');
  var load = require('./load');

  var pictures = [];
  var pictureContainer = document.querySelector('.pictures');
  var hotelLoadUrl = 'http://localhost:1506/api/pictures';

  //  Обработка полученных данных
  function renderPictures(data) {
    var filters = document.querySelector('.filters');
    filters.classList.add('hidden');
    pictures = data;

    pictures.forEach(function(image) {
      picture(image, pictureContainer);
    });

    filters.classList.remove('hidden');
  }

  load(hotelLoadUrl, renderPictures);
