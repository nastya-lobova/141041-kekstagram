'use strict';

var Gallery = function(data) {
  this.pictures = null;
  this.activePicture = null;
  var self = this;
  this.galleryOverlay = document.querySelector('.gallery-overlay');
  this.galleryOverlayClose = document.querySelector('.gallery-overlay-close');
  this.galleryOverlayImage = document.querySelector('.gallery-overlay-image');
};

Gallery.prototype.setPictures = function(data) {
  this.pictures = data;
}

Gallery.prototype.show = function(number) {
  this.addEvent();
  this.galleryOverlay.classList.remove('invisible');
  this.setActivePicture(number);
}

Gallery.prototype.hide = function() {
  this.galleryOverlay.classList.add('invisible');
  this.removeEvent();
}

Gallery.prototype.setActivePicture = function(number) {
  this.activePicture = number;
  //this.src = this.pictures[number].src;
  //недописано

}

Gallery.prototype.addEvent = function() {
  this.galleryOverlayClose.addEventListener('click', this.closeGallery);
  this.galleryOverlayImage.addEventListener('click', this.changePhoto);
}

Gallery.prototype.removeEvent = function() {
  this.galleryOverlayClose.removeEventListener('click', this.closeGallery);
  this.galleryOverlayImage.removeEventListener('click', this.changePhoto);
}

Gallery.prototype.closeGallery = function(e) {
  e.preventDefault;
  self.hide();
}

Gallery.prototype.changePhoto = function(e) {
  e.preventDefault;
  if (self.pictures.length > (number - 1)) {
    number++;
    self.setActivePicture(number);
  } else {
    number = 0;
    self.setActivePicture(number);
  }
}

module.exports = new Gallery();
