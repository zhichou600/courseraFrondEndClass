(function () {
'use strict';

angular.module('MenuApp')
.controller('MainCategoryListController', MainCategoryListController);


MainCategoryListController.$inject = ['MenuDataService', 'items'];
function MainCategoryListController(MenuDataService, items) {
  var mainlist = this;
  mainlist.items = items;
}

})();
