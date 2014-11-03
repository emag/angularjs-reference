var app = angular.module('app');

app.controller('bookListController', function() {
  this.bookItems = [];
  // bookItem を管理対象に追加する
  this.addBookItem = function(bookItem) {
    this.bookItems.push(bookItem);
    var self = this;
    bookItem.$on('$destroy', function() {
      self.removeBookItem(bookItem);
    });
  };
  // bookItem を管理対象から削除する
  this.removeBookItem = function(bookItem) {
    var index = this.bookItems.indexOf(bookItem);
    this.bookItems.splice(index, 1);
  };
  // 管理している bookItem の中に編集中のものがあるかどうかを調べる
  this.anyDirty = function() {
    var isDirty = false;
    for (var i = 0; i < this.bookItems.length; i++) {
      var bookItem = this.bookItems[i];
      if (bookItem.isDirty()) {
        isDirty = true;
      }
    }
    return isDirty;
  };
  // 管理している bookItem の編集モードをすべてキャンセルする
  this.allCancel = function() {
    for (var i = 0; i < this.bookItems.length; i++) {
      var bookItem = this.bookItems[i];
      if (bookItem.isEditMode) {
        bookItem.cancel();
      }
    }
  };
}).directive('bookList', function() {
  return {
    restrict: 'EA',
    controller: 'bookListController',
    scope: {
      items: '='
    }
  }
});