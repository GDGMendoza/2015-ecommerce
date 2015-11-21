/// <reference path="../../.tmp/typings/tsd.d.ts" />

'use strict';

import ProductComponent from './product/product.component';

declare var moment: moment.MomentStatic;

(function () {
  console.log('Index function');
  
  ProductComponent;

  angular.module('braintreeClient', ['ngAnimate', 'ngComponentRouter', 'app.product'])
  .constant('moment', moment);
    
})();

import AppComponent from './app.component';

AppComponent;