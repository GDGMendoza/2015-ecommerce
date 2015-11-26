/// <reference path="app.d.ts" />

'use strict';

(function () {

  /* ngInject */
  function IndexConfig ($routeProvider: ng.route.IRouteProvider) {

    $routeProvider.otherwise('/product/list');

  }

  angular.module('braintreeClient', ['ngRoute', 'app.product'])
  .config(IndexConfig)
  .constant('moment', moment);

})();
