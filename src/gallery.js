'use strict';

var Gallery = function() {
  this.pictures = null;
  this.activePicture = null;
  this.galleryOverlay = document.querySelector('.gallery-overlay');
  this.galleryOverlayClose = document.querySelector('.gallery-overlay-close');
  this.galleryOverlayImage = document.querySelector('.gallery-overlay-image');
  this.galleryOverlayLikes = document.querySelector('.likes-count');
  this.galleryOverlayComments = document.querySelector('.comments-count');
  this.galleryOverlayLikes.addEventListener('click', this.onlikeCount.bind(this));
  window.addEventListener('hashchange', this.onchangeLocation.bind(this));
};

/**Добавляет в галерею массив обьектов фотографий
 * @param {Array} data
 */
Gallery.prototype.setPictures = function(data) {
  this.pictures = data;
};

/**Открывает галерею
 * @param {Number} indicator
 * @param {String} indicator
 */
Gallery.prototype.onShow = function(indicator) {
  if (!isFinite(indicator)) {
    this.pictures.forEach(function(item) {
      if (item.data.url === indicator) {
        this.index = item.data.index;
      }
    }, this);
  } else {
    this.index = indicator;
  }

  this.addEvent();
  this.galleryOverlay.classList.remove('invisible');
  this.setActivePicture(this.index);
};

/**Закрывает галерею*/
Gallery.prototype.hide = function() {
  location.hash = '';
  this.galleryOverlay.classList.add('invisible');
  this.removeEvent();
};

/**Устанавливает активную фотографию*/
Gallery.prototype.setActivePicture = function() {
  this.activePicture = this.pictures[this.index].data;
  this.galleryOverlayImage.src = this.activePicture.url;
  this.galleryOverlayLikes.innerHTML = this.activePicture.likes;
  this.galleryOverlayComments.innerHTML = this.activePicture.comments;
};

/**Добавляет обработчики событий*/
Gallery.prototype.addEvent = function() {
  this.galleryOverlayClose.addEventListener('click', this.closeGallery.bind(this));
  this.galleryOverlayImage.addEventListener('click', this.changePhoto.bind(this));
};

/**Удаляет обработчики событий*/
Gallery.prototype.removeEvent = function() {
  this.galleryOverlayClose.removeEventListener('click', this.closeGallery);
  this.galleryOverlayImage.removeEventListener('click', this.changePhoto);
};

/**
 * Закрывает галерею при нажатии на крестик
 * @param {Event} evt
 */
Gallery.prototype.closeGallery = function(evt) {
  evt.preventDefault();
  this.hide();
};

/**
 * Переключается следующая фотография
 * @param {Event} evt
 */
Gallery.prototype.changePhoto = function(evt) {
  evt.preventDefault();
  var nextNumber = this.activePicture.index;
  if (this.pictures.length > (this.activePicture.index - 1)) {
    nextNumber++;
  } else {
    nextNumber = 0;
  }
  location.hash = 'photo/' + this.pictures[nextNumber].data.url;
};

/**
 * Обработка клика по лайку
 * @param {Event} evt
 */
Gallery.prototype.onlikeCount = function(evt) {
  evt.preventDefault();
  this.activePicture.setLikesCount();
  this.galleryOverlayLikes.innerHTML = this.activePicture.getLikes();
};

/**Следит за изменением hash в адресной строке*/
Gallery.prototype.onchangeLocation = function() {
  var hash = location.hash.match(/#photo\/(\S+)/);
  if (hash) {
    this.onShow(hash[1]);
  } else {
    this.hide();
    return;
  }
};

module.exports = new Gallery();
