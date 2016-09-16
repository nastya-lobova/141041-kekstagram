'use strict';

var PictureData = function(data, index) {
  this.data = data;
  this.index = index;
  this.comments = this.data.comments;
  this.likes = this.data.likes;
  this.url = this.data.url;
};

PictureData.prototype.getLikes = function() {
  return this.likes;
};

PictureData.prototype.getComments = function() {
  return this.comments;
};

PictureData.prototype.setLikesCount = function() {
  var event = document.createEvent('Event');
  event.initEvent('likes-count', true, true);
  event.detail = {
    index: this.index
  };
  document.dispatchEvent(event);
};

PictureData.prototype.addLikes = function() {
  this.likes++;
  this.setLikesCount();
};

PictureData.prototype.subtractLikes = function() {
  this.likes--;
  this.setLikesCount();
};

PictureData.prototype.addComments = function() {
  this.comments++;
};

PictureData.prototype.subtractComments = function() {
  this.comments--;
};


module.exports = PictureData;
