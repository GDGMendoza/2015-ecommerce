'use strict';

module ProductComponent {
    
  console.log('product component');
  
  function ProductDirective() {
    return {
      templateUrl: 'app/product/product.html',
      /* ngInject */
      controller: function ProductController($router) {
        this.text = 'World';
      },
      controllerAs: 'product'
    }
  }
  
  ProductDirective.$routeConfig = [
    {
      path: '/list',
      component: 'list',
      as: 'List'
    },
    {
      path: '/create',
      component: 'create',
      as: 'Create'
    }
  ];
  
  angular.module('app.product', [])
    .directive('product', ProductDirective);
    
}

import CreateComponent from './create/create.component';
import ListComponent from './list/list.component';

CreateComponent;
ListComponent;

export {ProductComponent as default}