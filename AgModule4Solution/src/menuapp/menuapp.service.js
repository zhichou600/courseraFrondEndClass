(function () {
'use strict';

angular.module('MenuApp')
.service('MenuDataService', MenuDataService);


MenuDataService.$inject = ['$http', 'ApiBasePath', '$q']
function MenuDataService($http, ApiBasePath,$q) {
  var service = this;

  // Returns a promise, NOT items array directly
  service.getItemsForCategory = function (categoryShortName) {
    var deferred = $q.defer();

   $http({
     method: "GET",
     url: (ApiBasePath + "/menu_items.json?category="+categoryShortName),
   }).then(function (response) {
     deferred.resolve(response.data.menu_items);
   })
   .catch(function (error) {
     console.log(error);
   })

   return deferred.promise;
  };

  // Simulates call to server
  // Returns a promise, NOT items array directly
  service.getAllCategories = function () {
    var deferred = $q.defer();

   $http({
     method: "GET",
     url: (ApiBasePath + "/categories.json"),
   }).then(function (response) {
     deferred.resolve(response.data);
   })
   .catch(function (error) {
     console.log(error);
   })

   return deferred.promise;
  };
}

})();
