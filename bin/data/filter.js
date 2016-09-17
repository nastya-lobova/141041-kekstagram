'use strict';

module.exports = function(list, filterID) {
  switch (filterID) {
    case 'filter-popular':
      return list;
      break;
    case 'filter-new':
      var newList = list.filter(function(item) {
        var TIME_AGO = Date.now() - (3 * 24 * 60 * 60 * 1000);
        return item.created > TIME_AGO;
      }).sort(function (a, b) {
        return b.created - a.created;
      });
      return newList;
      break;
    case 'filter-discussed':
      var discussedList = list.sort(function(a, b) {
        return b.comments - a.comments;
      });
        return discussedList;
      break;
    case 'default':
      return list;
      break;
  }
};
