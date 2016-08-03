function getMessage(a, b) {
  console.log(a);
  console.log(b);
  console.log(typeof a);
  if (typeof a === 'boolean') {
    if ( a == true) {
      return 'Переданное GIF-изображение анимировано и содержит ' + b + ' кадров';
    } else {
      return 'Переданное GIF-изображение не анимировано';
    }
  }

  if (typeof a === "number") {
    return 'Переданное SVG-изображение содержит ' + a + ' объектов и ' + b * 4 + ' атрибутов';
  }

  if (typeof a === 'object') {
    var amountOfRedPoints = 0;

    for (var i = 0;  i < a.length; ++i) {
      amountOfRedPoints += a[i];
    }

    return 'Количество красных точек во всех строчках изображения: ' + amountOfRedPoints;
  }

  if (typeof a === 'object' && typeof b === 'object') {
    var artifactsSquare = 0;
    for (var i = 0; i < a.length; ++i) {
      artifactsSquare += a[i] * b[i];
    }
    return 'Общая площадь артефактов сжатия: ' + artifactsSquare + ' пикселей';
  }
}
