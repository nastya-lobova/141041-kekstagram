'use strict';

(function() {
  var Picture = require('./picture');
  var load = require('./load');
  var Gallery = require('./gallery');
  var PictureData = require('./picture-data');
  var utils = require('./utils');

  var pictures = [];
  var filters = document.querySelector('.filters');
  var pictureContainer = document.querySelector('.pictures');
  var footer = document.querySelector('.footer');
  var PICTURE_LOAD_URL = '/api/pictures';
  var DELAY_SCROLL = 100;
  var LEFT_PAGE_BOTTOM = 100;
  var activeFilter = null;
  var pageNumber = 0;
  var pageSize = 12;

  /** Проверяет виден ли футер и запускает загрузку новых данных если нет */
  var getBottomPage = function() {
    if (footer.getBoundingClientRect().bottom - window.innerHeight <= LEFT_PAGE_BOTTOM) {
      loadPictures(activeFilter, pageNumber++);
    }
  };

  var imagesScroll = utils.throttle(getBottomPage, DELAY_SCROLL);

  /**
   * Переключает фильтр
   * @param {Event} evt
   */
  var changeFilter = function(evt) {
    if (evt.target.classList.contains('filters-radio')) {
      pictures = [];
      pictureContainer.innerHTML = '';
      pageNumber = 0;
      loadPictures(evt.target.id, pageNumber++);
    }
  };

  /** Обработка полученных данных
   * @param {Object} data
   */
  function renderPictures(data) {
    filters.classList.add('hidden');

    data.forEach(function(image) {
      var pictureData = new PictureData(image, pictures.length);
      var picture = new Picture(pictureData);
      pictures.push(picture);
      picture.add(pictureContainer);
    });

    Gallery.setPictures(pictures);
    filters.classList.remove('hidden');
    imagesScroll();
    var event = document.createEvent('Event');
    event.initEvent('hashchange', true, true);
    document.dispatchEvent(event);
  }

  /** Отправка данных
   * @param {String} filter
   * @param {Number} currentPageNumber
   */
  function loadPictures(filter, currentPageNumber) {
    load(PICTURE_LOAD_URL, {
      from: currentPageNumber * pageSize,
      to: currentPageNumber * pageSize + pageSize,
      filter: filter
    }, renderPictures);
  }

  window.addEventListener('scroll', imagesScroll);
  filters.addEventListener('change', changeFilter, true);

  loadPictures(activeFilter, pageNumber++);
})();
