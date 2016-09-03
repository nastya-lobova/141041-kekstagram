'use strict';

(function() {
  var Picture = require('./picture');
  var load = require('./load');
  var Gallery = require('./gallery');

  var pictures = [];
  var filters = document.querySelector('.filters');
  var pictureContainer = document.querySelector('.pictures');
  var footer = document.querySelector('.footer');
  var PICTURE_LOAD_URL = '/api/pictures';
  var DELAY_SCROLL = 100;
  var LEFT_PAGE_BOTTOM = 100;
  var lastCall = Date.now();
  var activeFilter = null;
  var pageNumber = 0;
  var pageSize = 12;

  var getEndPage = function() {
    if (Date.now() - lastCall >= DELAY_SCROLL) {
      if (footer.getBoundingClientRect().bottom - window.innerHeight <= LEFT_PAGE_BOTTOM) {
        loadPictures(activeFilter, pageNumber++);
      }
      lastCall = Date.now();
    }
  };

  var changeFilter = function(evt) {
    if (evt.target.classList.contains('filters-radio')) {
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
    pictures = data;

    pictures.forEach(function(image, index) {
      var picture = new Picture(image, index);
      pictureContainer.appendChild(picture.element);
    });
    Gallery.setPictures(pictures);
    filters.classList.remove('hidden');
    getEndPage();
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

  window.addEventListener('scroll', getEndPage);
  filters.addEventListener('change', changeFilter, true);

  loadPictures(activeFilter, pageNumber++);
})();
