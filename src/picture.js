'use strict';

var gallery = require('./gallery');
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

var Picture = function(data, index) {
  this.data = data;
  this.index = index;
  BaseElement.call(this, this.getElement());
  this.onclick = this.onclick.bind(this);
  this.element.addEventListener('click', this.onclick);
};

inherit(Picture, BaseElement);

Picture.prototype.onclick = function(evt) {
  evt.preventDefault();
  gallery.show(this.index);
};

Picture.prototype.getElement = function() {
  this.element = elementToClone.cloneNode(true);
  this.pictureComments = this.element.querySelector('.picture-comments');
  this.pictureLikes = this.element.querySelector('.picture-likes');
  this.pictureComments.textContent = this.data.comments;
  this.pictureLikes.textContent = this.data.likes;
  this.image = this.setImage();
  return this.element;
};

Picture.prototype.setImage = function() {
  var self = this;
  var image = new Image(182, 182);
  image.onload = function(evt) {
    clearTimeout(imageLoadTimeout);
    self.element.href = evt.target.src;
    self.element.replaceChild(image, self.element.querySelector('img'));
  };
  image.onerror = function() {
    this.element.classList.add('picture-load-failure');
  }.bind(this);
  var imageLoadTimeout = setTimeout(function() {
    self.element.querySelector('img').src = '';
    self.element.classList.add('hotel-nophoto');
  }, IMAGE_LOAD_TIMEOUT);

  image.src = self.data.url;
};

Picture.prototype.remove = function() {
  this.element.removeEventListener('click', this.onclick);
  BaseElement.prototype.remove.call(this);
};

module.exports = Picture;
