# &lt;dpd-collection&gt;

An AngularJS component for deployd collection
resource optimized for Bootstrap 3.
Fetches and renders a collection of objects from a [deployd](http://deployd.com)
server in a table.

## Status: In-Development

## Usage

### 1. Get the component

`$ bower install ng-dpd-collection-component`

### 2. Add the module as a dependency

```javascript
var app = angular.module('myApp', ['dpdCollection']);
```

### 3. Use the component in a template

```html
<script src="bower_components/ng-dpd-collection-component/collection-component.js"></script>
<dpd-collection collection-path="'/myCollection'"
                collection-query="{$limit: 10}"
                >
</dpd-collection>
```

The Directive must be an element,
and accepts inputs via the following attributes:

 * `collectionPath` (required scope expression or string):
    the relative path to the collection on the server
 * `collectionQuery` (optional scope expression or object literal): a query
    to be passed to deployd. See [Querying Collections](http://docs.deployd.com/docs/collections/reference/querying-collections.md)
 * `collectionProperties` (required scope expression or array literal): an array
    specifying how to order and display the properties of objects within the
    list. For example:

```javascript
[{
  //Makes the time property the first column,
  //with a heading of "time logged"
  //Will use Angular date filter to render (only supported filter)
  key: 'time',
  readable: 'time logged',
  type: 'datetime'
},{
  //food property will be the second column,
  //with a heading of "food",
  //Since value is an object, the object's "name" property will be displayed.
  //If value is an object and no path is provided, "..." will be displayed.
  key: 'food',
  readable: 'food',
  path: 'name'
}]
```

## Additional Providers

### `dpdCollectionStore` service

Service used to maintain state of logged-in user.
Used by this directive, but can be used anywhere else in the app as well.

 * properties:
    * `collectionCache`: an object to cache fetched follections, indexed by
      pathname without slashes. E.g.
      `dpdCollectionStore.collectionCache['someobjects']` == `[{id: '123'}];`
 * methods:
    * `get(path)` string, path of cached collection to retrieve. Returns
      array of objects or undefined. If path contains leading slash, it will be
      stripped.
    * `set(path, collection)` where path is a string and collection is an array
      of objects. If path contains leading slash, it will be stripped.


## Development
 * `$ npm install .`
 * Test: `$ npm test` (starts karma and keeps it open)
 * Package for distribution: `$ node dist.js` (merges template into javascript as string, copies to `./collection-component.js`)

## Todo

 * Add ability to add and edit objects
 * Add ability to filter & sort collections
 * Support absolute paths to remote servers
 * Make filtering of values more flexible
