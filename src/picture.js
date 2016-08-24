//Рендер шаблона
module.exports = function (data, container) {
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
   * @param {HTMLElement} container
   * @return {HTMLElement}
   */
  function getPictureTemplate(data) {
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
    return picture;
  }

  container.appendChild(getPictureTemplate(data));
}
