(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuCategoriesService', MenuCategoriesService)
.directive('foundItems', MenuFoundListDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


function MenuFoundListDirective() {
  var ddo = {
    templateUrl: 'loader/menuList.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: MenuFoundListDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function MenuFoundListDirectiveController() {
  var list = this;
  list.checkSize = function() {
    var len =list.items.length;
    if(list.items != null && list.items > 0) {
      return true;
    } else {
      return false;
    }

  }
}

NarrowItDownController.$inject = ['MenuCategoriesService'];
function NarrowItDownController(MenuCategoriesService) {
  var menu = this;
  menu.checkResult = false;
 menu.removeItem = function (itemIndex) {
   menu.foundList.splice(itemIndex,1);
 }


  menu.search = function () {
    menu.checkResult = false;
    var searchTerm = menu.searchTerm;
    if(searchTerm == null) {
      menu.checkResult = true;
      return;
    }
    var promise = MenuCategoriesService.getMatchedMenuItems(searchTerm);
    promise.then(function (response) {
      if(response.length < 1) {
        menu.checkResult = true;
        return;
      }
      menu.foundList = response;

      console.log(menu);
    })
    .catch(function (error) {
      console.log(error);
    })
  };

}


MenuCategoriesService.$inject = ['$http', 'ApiBasePath']
function MenuCategoriesService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return  $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
    }).then(function (response) {

      //console.log(response.data);
      var list= response.data.menu_items;
       var foundItems = [];
       for(var i=0; i<list.length;i++){
           var item = list[i];
           if(item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
            || item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1){
             foundItems.push(item);
           }
       }
    //   console.log(foundItems);
       return foundItems;

    })
    .catch(function (error) {
      console.log(error);
    })


  };

}

})();
