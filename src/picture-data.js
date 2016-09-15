'use strict';

var PictureData = function(data, index) {
  this.data = data;
  this.index = index;
  this.comments = this.data.comments;
  this.likes = this.data.likes;
  this.url = this.data.url;
};

PictureData.prototype.updateLikes = function() {
  return this.likes;
};

PictureData.prototype.updateComments = function() {
  return this.comments;
};

PictureData.prototype.setLikesCount = function() {
  this.likes++;
  var event = new CustomEvent('likes-count', {
    detail: {
      index: this.index
    }
  });

  document.dispatchEvent(event);
};

PictureData.prototype.setComments = function() {
  return this.comments++;
};


module.exports = PictureData;
