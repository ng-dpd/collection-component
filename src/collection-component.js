angular.module('dpdCollection', []).
  controller('CollectionComponentCtrl',
      ['$scope', '$http', function ($scope, $http) {
        this.onGetCollection = function (coll) {
        };

        this.onGetCollectionError = function (coll, err) {
        };

        this.query = function () {
          if ($scope.collectionPath) {
            $http.get($scope.collectionPath).
            success(this.onGetCollection).
            error(this.onGetCollectionError);
          }
        };
  }]).
  directive('dpdCollection', ['$parse', function ($parse) {
    return {
      restrict: 'E',
      templateUrl: 'collection-component.html',
      controller: 'CollectionComponentCtrl',
      controllerAs: 'collectionCtrl',
      link: function (scope, element, attrs, ctrl) {
        scope.properties = $parse(attrs.collectionProperties)(scope);
        scope.collectionPath = $parse(attrs.collectionPath)(scope);

        ctrl.query();
      }
    };
  }]);
