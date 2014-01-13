describe('dpdCollection', function () {
  var $compile, $rootScope;

  beforeEach(module('dpdCollection', 'collection-component.html'));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));


  describe('collectionComponent', function () {
    it('should show loading row before data is fetched', function () {

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


    it('should enforce property order')
  });


  describe('CollectionComponentCtrl', function () {

  });
});
