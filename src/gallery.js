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
};

Gallery.prototype.setPictures = function(data) {
  this.pictures = data;
};

Gallery.prototype.show = function(number) {
  this.index = number;
  this.addEvent();
  this.galleryOverlay.classList.remove('invisible');
  this.setActivePicture(number);
};

Gallery.prototype.hide = function() {
  this.galleryOverlay.classList.add('invisible');
  this.removeEvent();
};

Gallery.prototype.setActivePicture = function() {
  this.activePicture = this.index;
  this.galleryOverlayImage.src = this.pictures[this.index].data.url;
  this.galleryOverlayLikes.innerHTML = this.pictures[this.index].data.likes;
  this.galleryOverlayComments.innerHTML = this.pictures[this.index].data.comments;
};

Gallery.prototype.addEvent = function() {
  this.closeGallery = this.closeGallery.bind(this);
  this.changePhoto = this.changePhoto.bind(this);
  this.galleryOverlayClose.addEventListener('click', this.closeGallery);
  this.galleryOverlayImage.addEventListener('click', this.changePhoto);
};

Gallery.prototype.removeEvent = function() {
  this.galleryOverlayClose.removeEventListener('click', this.closeGallery);
  this.galleryOverlayImage.removeEventListener('click', this.changePhoto);
};

Gallery.prototype.closeGallery = function(evt) {
  evt.preventDefault();
  this.hide();
};

Gallery.prototype.changePhoto = function(evt) {
  evt.preventDefault();
  var nextNumber = this.activePicture;
  if (this.pictures.length > (this.activePicture - 1)) {
    nextNumber++;
    this.setActivePicture(nextNumber);
  } else {
    nextNumber = 0;
    this.setActivePicture(nextNumber);
  }
};

Gallery.prototype.onlikeCount = function() {
  this.pictures[this.index].data.setLikesCount();
  this.galleryOverlayLikes.innerHTML = this.pictures[this.index].data.updateLikes();
};

module.exports = new Gallery();
