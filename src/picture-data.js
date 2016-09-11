'use strict';

var PictureData = function(data, index) {
  this.data = data;
  this.index = index;
  this.comments = this.data.comments;
  this.likes = this.data.likes;
  this.url = this.data.url;
};

PictureData.prototype.addLikes = function() {
  return this.data.likes++;
};

PictureData.prototype.subtractLikes = function() {
  return this.data.likes--;
};

PictureData.prototype.addComments = function() {
  return this.data.comments++;
};

PictureData.prototype.subtractComments = function() {
  return this.data.comments--;
};

module.exports = PictureData;
