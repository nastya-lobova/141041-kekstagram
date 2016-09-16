'use strict';

var BaseElement = require('./base-element');
var inherit = require('./inherit');

var template = document.getElementById('picture-template');
/** @constant {number} */
var IMAGE_LOAD_TIMEOUT = 10000;
var elementToClone;

if ('content' in template) {
  elementToClone = template.content.querySelector('.picture');
} else {
  elementToClone = template.querySelector('.picture');
}

var Picture = function(data) {
  this.data = data;
  this.index = this.data.index;
  BaseElement.call(this, this.getElement());
  this.element.addEventListener('click', this.onclick.bind(this));
  document.addEventListener('likes-count', this.onchangeLikes.bind(this));
};

inherit(Picture, BaseElement);

/**
 * Записывает в hash путь к фотографии
 * @param {Event} evt
 */
Picture.prototype.onclick = function(evt) {
  evt.preventDefault();
  location.hash = '#photo/' + this.data.url;
};

/**
 * Копирует шаблон и заполняет его данными
 * @return {Element}
 */
Picture.prototype.getElement = function() {
  this.element = elementToClone.cloneNode(true);
  this.pictureComments = this.element.querySelector('.picture-comments');
  this.pictureLikes = this.element.querySelector('.picture-likes');
  this.pictureComments.textContent = this.data.comments;
  this.pictureLikes.textContent = this.data.likes;
  this.image = this.createImage();
  return this.element;
};

/**
 * Создает из конструктора изображение и загружает его
 */
Picture.prototype.createImage = function() {
  var image = new Image(182, 182);

  image.onload = function(evt) {
    clearTimeout(imageLoadTimeout);
    this.element.href = evt.target.src;
    this.element.replaceChild(image, this.element.querySelector('img'));
  }.bind(this);

  image.onerror = function() {
    this.element.classList.add('picture-load-failure');
  }.bind(this);

  var imageLoadTimeout = setTimeout(function() {
    this.element.querySelector('img').src = '';
    this.element.classList.add('hotel-nophoto');
  }.bind(this), IMAGE_LOAD_TIMEOUT);

  image.src = this.data.url;
};

/**
 * Удаляет элемент и обработчики событий со страницы
 */
Picture.prototype.remove = function() {
  this.element.removeEventListener('click', this.onclick);
  BaseElement.prototype.remove.call(this);
};

/**
 * Следит за изменениями количества лайков на фотографии
 * @param {Event} evt
 */
Picture.prototype.onchangeLikes = function(evt) {
  if (this.index !== evt.detail.index) {
    return;
  }
  this.getLikes();
};

/**
 * Записывает количество лайков из обьекта данных
 */
Picture.prototype.getLikes = function() {
  this.pictureLikes.textContent = this.data.getLikes();
};

module.exports = Picture;
