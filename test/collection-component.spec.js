describe('dpdCollection', function () {
  var $compile, $rootScope, $controller, $httpBackend;

  beforeEach(module('dpdCollection', 'collection-component.html'));

  beforeEach(inject(function (_$compile_, _$rootScope_, _$controller_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
  }));


  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });


  describe('collectionComponent', function () {
    it('should show loading row before data is fetched', function () {

    });


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
    });

  });


  it('should allow auto updating of rows');
});
