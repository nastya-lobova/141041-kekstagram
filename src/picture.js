'use strict';

var Gallery = require('./gallery');

/** Отрисовка картинки
 * @param {Array} data
 * @param {HTMLElement} container
 */
module.exports = function(data, container, number) {
  var template = document.getElementById('picture-template');

  /** @constant {number} */
  var IMAGE_LOAD_TIMEOUT = 10000;
  var elementToClone;

  if ('content' in template) {
    elementToClone = template.content.querySelector('.picture');
  } else {
    elementToClone = template.querySelector('.picture');
  }

  /**
   * @param {Object} data
   * @return {HTMLElement}
   */
  function getPictureTemplate() {
    var picture = elementToClone.cloneNode(true);
    var image = new Image(182, 182);
    var imageLoadTimeout;

    picture.querySelector('.picture-comments').textContent = data.comments;
    picture.querySelector('.picture-likes').textContent = data.likes;

    image.onload = function(evt) {
      clearTimeout(imageLoadTimeout);
      picture.href = evt.target.src;
      picture.replaceChild(image, picture.querySelector('img'));
    };

    image.onerror = function() {
      picture.classList.add('picture-load-failure');
    };

    imageLoadTimeout = setTimeout(function() {
      picture.querySelector('img').src = '';
      picture.classList.add('hotel-nophoto');
    }, IMAGE_LOAD_TIMEOUT);

    image.src = data.url;
    console.log(picture);
    picture.onclick = function(evt) {

      console.log('повесил');
      Gallery.show();
      Gallery.setActivePicture(number);
      evt.preventDefault;
    }
    return picture;
  }

  container.appendChild(getPictureTemplate(data));

  Gallery.setPictures(data);
};
