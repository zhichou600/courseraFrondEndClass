(function () {
'use strict';

angular.module('LunchChecker', [])
.controller('LunchCheckerController', LunchCheckerController);

LunchCheckerController.$inject = ['$scope'];
function LunchCheckerController($scope) {
  $scope.inputMenu = "";
  var getMessage = function (inputS) {
     var MenuList = inputS.split(',');
    if(inputS == ""){
      return "Please enter data first" ;
    } else if(MenuList.length >3) { 
      return "Too much!"
      } else {
        return "Enjoy!"
      }
  };

  $scope.checkMenu = function () {
    var inputS = $scope.inputMenu ;
    $scope.message = getMessage(inputS);
  };
}

})();
