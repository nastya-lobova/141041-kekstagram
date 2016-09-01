'use strict';

var gallery = require('./gallery');
var template = document.getElementById('picture-template');
if ('content' in template) {
  elementToClone = template.content.querySelector('.picture');
} else {
  elementToClone = template.querySelector('.picture');
}
/** @constant {number} */
var IMAGE_LOAD_TIMEOUT = 10000;
var elementToClone;

var Picture = function(data, index) {
  this.data = data;
  this.index = index;
  this.element = elementToClone.cloneNode(true);
  this.pictureComments = this.element.querySelector('.picture-comments');
  this.pictureLikes = this.element.querySelector('.picture-likes');
  this.pictureComments.textContent = this.data.comments;
  this.pictureLikes.textContent = this.data.likes;
  this.image = this.setImage();
  this.openGallery = this.openGallery.bind(this);
  this.element.addEventListener('click', this.openGallery);
};

Picture.prototype.openGallery = function(evt) {
  evt.preventDefault();
  gallery.show(this.index);
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
    self.element.classList.add('picture-load-failure');
  };
  var imageLoadTimeout = setTimeout(function() {
    self.element.querySelector('img').src = '';
    self.element.classList.add('hotel-nophoto');
  }, IMAGE_LOAD_TIMEOUT);

  image.src = self.data.url;
};

Picture.prototype.remove = function() {
  this.element.removeEventListener('click', this.openGallery);
};

module.exports = Picture;
