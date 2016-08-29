'use strict';

var Gallery = function() {
  var self = this;
  this.pictures = null;
  this.activePicture = null;
  this.galleryOverlay = document.querySelector('.gallery-overlay');
  this.galleryOverlayClose = document.querySelector('.gallery-overlay-close');
  this.galleryOverlayImage = document.querySelector('.gallery-overlay-image');
  this.galleryOverlayLikes = document.querySelector('.likes-count');
  this.galleryOverlayComments = document.querySelector('.comments-count');
  this.closeGallery = function(evt) {
    evt.preventDefault();
    self.hide();
  };
  this.changePhoto = function(evt) {
    evt.preventDefault();
    var nextNumber = self.activePicture;
    if (self.pictures.length > (self.activePicture - 1)) {
      nextNumber++;
      self.setActivePicture(nextNumber);
    } else {
      nextNumber = 0;
      self.setActivePicture(nextNumber);
    }
  };
};

Gallery.prototype.setPictures = function(data) {
  this.pictures = data;
};

Gallery.prototype.show = function(number) {
  this.addEvent();
  this.galleryOverlay.classList.remove('invisible');
  this.setActivePicture(number);
};

Gallery.prototype.hide = function() {
  this.galleryOverlay.classList.add('invisible');
  this.removeEvent();
};

Gallery.prototype.setActivePicture = function(number) {
  this.activePicture = number;
  this.galleryOverlayImage.src = this.pictures[number].url;
  this.galleryOverlayLikes.innerHTML = this.pictures[number].likes;
  this.galleryOverlayComments.innerHTML = this.pictures[number].comments;
};

Gallery.prototype.addEvent = function() {
  this.galleryOverlayClose.addEventListener('click', this.closeGallery);
  this.galleryOverlayImage.addEventListener('click', this.changePhoto);
};

Gallery.prototype.removeEvent = function() {
  this.galleryOverlayClose.removeEventListener('click', this.closeGallery);
  this.galleryOverlayImage.removeEventListener('click', this.changePhoto);
};

module.exports = new Gallery();
