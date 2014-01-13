describe('dpdCollection', function () {
  var $compile, $rootScope, $controller, $httpBackend, $filter;

  beforeEach(module('dpdCollection', 'collection-component.html'));

  beforeEach(inject(function (_$compile_, _$rootScope_, _$controller_, _$httpBackend_, _$filter_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $filter = _$filter_;
  }));


  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });


  describe('collectionComponent', function () {
    it('should show loading row before data is fetched');
    it('should allow auto updating of rows');
    it('should support readonly');
    it('should have a form in the last row for creating new objects');


    it('should set properties on the scope from a passed-in array literal', function () {
      var originalProp = [{key:'foo', readable: 'foo readable'}];
      var collectionProp = JSON.stringify(originalProp).replace(/\"/g, '\'');
      var compiled = $compile(
          '<dpd-collection ' +
          'collection-properties="'+
          collectionProp +
          '"></dpd-collection>'
          )($rootScope);
      $rootScope.$digest();
      delete $rootScope.properties[0].$$hashKey;

      expect($rootScope.properties).toEqual(originalProp);
    });


    it('should show a table heading for each passed property', function () {
      var collectionProp = JSON.stringify([{key:'foo', readable: 'foo readable'}]).replace(/\"/g, '\'');
      var compiled = $compile(
          '<dpd-collection ' +
          'collection-properties="'+
          collectionProp +
          '"></dpd-collection>'
          )($rootScope);
      $rootScope.$digest();
      expect(compiled.text()).toContain('foo readable');
    });


    it('should set collectionPath on scope when passed an array literal', function () {
      $httpBackend.expectGET('/myCollection').respond(200);
      var compiled = $compile(
          '<dpd-collection ' +
          'collection-path="'+
          '\'/myCollection\''+
          '"></dpd-collection>'
          )($rootScope);
      $rootScope.$digest();

      expect($rootScope.collectionPath).toBe('/myCollection');
      $httpBackend.flush();
    });


    it('should render the collection objects in rows');
  });


  describe('readable', function () {
    var readable;
    beforeEach(function () {
      readable = $filter('readable');
    });

    it('should format a date object using built-in date filter', function () {
      expect(readable('1389245177768', 'datetime')).toBe('2014-01-08 9:26 PM');
    });


    it('should filter objects with an ellipsis', function () {
      expect(readable({foo: 'bar'})).toBe('...');
    });


    it('should return the input if no formatting should be applied', function () {
      expect(readable('simple string')).toBe('simple string');
    })

  });


  describe('CollectionComponentCtrl', function () {
    describe('.query()', function () {
      it('should request the collection once `collectionPath` is set', function () {
        var scope = $rootScope.$new();
        var controller = $controller('CollectionComponentCtrl', {$scope: scope});
        $httpBackend.expectGET('/myCollection').respond(200);
        scope.collectionPath = '/myCollection';
        controller.query();
        $httpBackend.flush();
      });


      it('should set the response to `scope.collection`', function () {
        var scope = $rootScope.$new();
        var collection = [{
          foo: 'bar'
        }];
        var controller = $controller('CollectionComponentCtrl', {$scope: scope});
        $httpBackend.whenGET('/myCollection').respond(collection);
        scope.collectionPath = '/myCollection';
        controller.query();
        $httpBackend.flush();

        expect(scope.collection).toEqual(collection);
      });
    });
  });
});
