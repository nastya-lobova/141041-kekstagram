'use strict';

module.exports = function(list, filterID) {
  switch (filterID) {
    case 'filter-popular':
      return list;
      break;
    case 'filter-new':
      var newList = list.filter(function(item) {
        return item.created < 3;
      });

      newList.sort(function (a, b) {
        return b.created - a.created;
      });
      break;
    case 'filter-discussed':
      list.sort(function(a, b) {
        return b.comments - a.comments;
      });
      break;
    case 'default':
      return list;
      break;
  }
};
