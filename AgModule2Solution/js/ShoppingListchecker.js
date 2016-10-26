(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('ToBuyListController', ToBuyListController)
.controller('BoughtListController', BoughtListController)
.service('ShoppingListService', ShoppingListService);

ToBuyListController.$inject = ['ShoppingListService'];
function ToBuyListController(ShoppingListService) {
  var tobuylist = this;
  tobuylist.items = ShoppingListService.tobuyItems;
 tobuylist.errorMessage = ShoppingListService.tobuyMessage;
  tobuylist.removeItem = function(itemIndex){
    ShoppingListService.removeItem(itemIndex);
  }

}

BoughtListController.$inject = ['ShoppingListService'];
function BoughtListController(ShoppingListService) {
  var boughtlist = this;
  boughtlist.items = ShoppingListService.boughtItems;
 boughtlist.errorMessage = ShoppingListService.boughtMessage;
}

function ShoppingListService() {
  var service = this;
  var toBuyDef = "Everything is bought!"
  var BoughtDef = "Nothing bought yet."
  // List of shopping items
  service.tobuyItems = [{ name: "cookies", quantity: 10 }, { name: "candy", quantity: 10 },
   { name: "beef", quantity: 10 }, { name: "water", quantity: 12 }, { name: "cheese", quantity: 10 },
   { name: "egg", quantity: 10 },{ name: "rice", quantity: 10 }];
  var  items =[];
  service.boughtItems = items;
  service.boughtMessage = BoughtDef;
  service.tobuyMessage = toBuyDef;
  service.removeItem = function (itemIdex) {
    var item = this.tobuyItems[itemIdex];
    service.tobuyItems.splice(itemIdex, 1);
    service.boughtItems.push(item);
  };
}

})();
