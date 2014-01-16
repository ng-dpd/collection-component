describe('dpdCollection', function () {
  var $compile, $rootScope, $controller, $httpBackend, $filter, dpdCollectionStore;

  beforeEach(module('dpdCollection', 'collection-component.html'));

  beforeEach(inject(function (_$compile_, _$rootScope_, _$controller_, _$httpBackend_, _$filter_, _dpdCollectionStore_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $filter = _$filter_;
    dpdCollectionStore = _dpdCollectionStore_;
  }));


  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });


  describe('dpdCollectionStore', function () {
    describe('.get()', function () {
      it('should get the cached collection by relative path', function () {
        var dummyCollection = dpdCollectionStore.collectionCache.foo = [{bar: 'baz'}];
        expect(dpdCollectionStore.get('foo')).toBe(dummyCollection);
      });


      it('should sanitize paths prepended with /', function () {
        var dummyCollection = dpdCollectionStore.collectionCache.foo = [{bar: 'baz'}];
        expect(dpdCollectionStore.get('/foo')).toBe(dummyCollection);
      });
    });


    describe('.set()', function () {
      it('should allow setting a collection by path', function () {
        var dummyCollection = [{bar: 'baz'}];
        dpdCollectionStore.set('foo', dummyCollection);
        expect(dpdCollectionStore.get('foo')).toBe(dummyCollection);
      });


      it('should throw if collection is not an array', function () {
        expect(function () {dpdCollectionStore.set('foo')}).toThrow(new Error('collection must be an array'));
      });
    });

    describe('.merge()', function () {
      it('should allow merging a collection', function () {

      });
    });
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
      $httpBackend.expectGET('/myCollection').respond([]);
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


    it('should accept a collectionQuery and attach it to the scope', function () {
      $httpBackend.expectGET('/myCollection?%7B%22user%22:%22foo%22%7D').respond([]);
      var compiled = $compile(
          '<dpd-collection ' +
          'collection-path="'+
          '\'/myCollection\''+
          '" collection-query="'+
          '{user: \'foo\'}'+
          '"></dpd-collection>'
          )($rootScope);
      $rootScope.$digest();

      expect($rootScope.collectionQuery).toEqual({user: 'foo'});
      $httpBackend.flush();
    });
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
      var dummyCollection;

      beforeEach(function () {
        dummyCollection = dpdCollectionStore.collectionCache.foo = [{bar: 'baz'}];
      });


      it('should request the collection once `collectionPath` is set', function () {
        var scope = $rootScope.$new();
        var controller = $controller('CollectionComponentCtrl', {$scope: scope});
        $httpBackend.expectGET('/myCollection').respond([]);
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


      it('should make the request with a query if provided on the scope', function () {
        var scope = $rootScope.$new();
        var controller = $controller('CollectionComponentCtrl', {$scope: scope});
        $httpBackend.whenGET('/myCollection?%7B%22user%22:%22foobar%22%7D').respond(dummyCollection);
        scope.collectionPath = '/myCollection';
        scope.collectionQuery = {user: 'foobar'};
        controller.query();
        $httpBackend.flush();
      });


      it('should set the collection in the dpdCollectionStore service', function () {
        var scope = $rootScope.$new();
        var spy = spyOn(dpdCollectionStore, 'set');


        var controller = $controller('CollectionComponentCtrl', {$scope: scope});
        $httpBackend.whenGET('/myCollection').respond(dummyCollection);
        scope.collectionPath = '/myCollection';
        controller.query();
        $httpBackend.flush();

        expect(spy).toHaveBeenCalledWith('/myCollection', dummyCollection)
      });
    });
  });
});
