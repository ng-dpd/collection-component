angular.module('dpdCollection', []).
  controller('CollectionComponentCtrl',
      ['$scope', '$http', function ($scope, $http) {
        this.onGetCollection = function (coll) {
          $scope.collection = coll;
        };

        this.onGetCollectionError = function (coll, err) {
          $scope.fetchError = 'Could not fetch collection';
        };

        this.query = function () {
          if ($scope.collectionPath) {
            $http({
              method: 'GET',
              url: $scope.collectionPath,
              params: $scope.collectionQuery
            }).
            success(this.onGetCollection).
            error(this.onGetCollectionError);
          }
        };
  }]).
  filter('readable', ['$filter', function ($filter) {
    return function (arr, exp) {
      switch (exp) {
        case 'datetime':
          return $filter('date')(arr, 'yyyy-MM-dd h:mm a');
          break;
        case undefined:
          if (angular.isObject(arr)) {
            return '...';
          }
          else {
            return arr;
          }
          break;
        default:
          return arr;
      }
    };
  }]).
  directive('dpdCollection', ['$parse', function ($parse) {
    return {
      restrict: 'E',
      template: '<table class="table table-hover"><thead><th ng-repeat="prop in properties">{{prop.readable}}</th></thead><tbody><tr ng-repeat="obj in collection"><td ng-repeat="prop in properties">{{obj[prop.key] | readable:prop.type}}</td></tr></tbody></table>',
      controller: 'CollectionComponentCtrl',
      controllerAs: 'collectionCtrl',
      link: function (scope, element, attrs, ctrl) {
        scope.properties = $parse(attrs.collectionProperties)(scope);
        scope.collectionPath = $parse(attrs.collectionPath)(scope);
        scope.collectionQuery = $parse(attrs.collectionQuery)(scope);

        ctrl.query();
      }
    };
  }]);
