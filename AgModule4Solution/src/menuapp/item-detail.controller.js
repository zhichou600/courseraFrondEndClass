(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemDetailController', ItemDetailController);


ItemDetailController.$inject = ['$stateParams', 'MenuDataService', 'items'];
function ItemDetailController($stateParams,MenuDataService,items) {
  var itemDetail = this;
  var item = items[$stateParams.itemId];
  var promise = MenuDataService.getItemsForCategory(item.short_name);
  promise.then( function(response) {
    itemDetail.subItems = response;
  }
    
  );

//  itemDetail.name = itemTT.name;
//  itemDetail.quantity = itemTT.id;
//  itemDetail.description = itemTT.description;
}

})();
