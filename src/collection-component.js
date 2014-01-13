angular.module('dpdCollection', []).
  controller('CollectionComponentCtrl', ['$scope', function ($scope) {
  }]).
  directive('dpdCollection', ['$parse', function ($parse) {

    return {
      restrict: 'E',
      templateUrl: 'collection-component.html',
      link: function (scope, element, attrs) {
        scope.properties = $parse(attrs.collectionProperties)(scope);
      }
    }
  }]);
