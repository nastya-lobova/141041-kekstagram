'use strict';

var PictureData = function(data, index) {
  this.data = data;
  this.index = index;
  this.comments = this.data.comments;
  this.likes = this.data.likes;
  this.url = this.data.url;
  this.liked = false;
};

/**Возвращает количество лайков*/
PictureData.prototype.getLikes = function() {
  return this.likes;
};

/**Возвращает количество комментариев*/
PictureData.prototype.getComments = function() {
  return this.comments;
};

/**При изменение лайков изменяет состояние и создает событие для оповещения*/
PictureData.prototype.setLikesCount = function() {
  if (!this.liked) {
    this.addLike();
    this.liked = true;
  } else {
    this.removeLike();
    this.liked = false;
  }
  var event = document.createEvent('Event');
  event.initEvent('likes-count', true, true);
  event.detail = {
    index: this.index
  };
  document.dispatchEvent(event);
};

/**Прибавляет лайк*/
PictureData.prototype.addLike = function() {
  this.likes++;
};

/**Удаляет лайк*/
PictureData.prototype.removeLike = function() {
  this.likes--;
};

/**Прибавляет комментарий*/
PictureData.prototype.addComment = function() {
  this.comments++;
};

/**Прибавляет комментарий*/
PictureData.prototype.removeComment = function() {
  this.comments--;
};

module.exports = PictureData;
