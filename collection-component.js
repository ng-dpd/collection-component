angular.module('dpdCollection', []).
  controller('CollectionComponentCtrl', ['$scope', function ($scope) {
  }]).
  directive('dpdCollection', ['$parse', function ($parse) {

    return {
      restrict: 'E',
      template: '<table class="table table-hover"><thead><th ng-repeat="prop in properties">{{prop.readable}}</th></thead><tbody><tr ng-<tr ng-repeat="obj in collection"><td ng-repeat="prop in properties">{{obj[prop.key]}}</td></tr></tbody></table>',
      link: function (scope, element, attrs) {
        scope.properties = $parse(attrs.collectionProperties)(scope);
      }
    }
  }]);