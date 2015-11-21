'use strict';

module AppComponent {
  console.log('app component');
  
  /* @ngInject */
  function AppDirective () {
    return {
      restrict: 'E',
      templateUrl: 'app/app.html',
      controller: 'AppController',
      controllerAs: 'app'
    }
  }
  
  /* @ngInject */
  function AppController($router) {
    $router.config([
      {
        path: '/product',
        component: 'product',
        name: 'Product'
      }
    ]);
    
    this.goTo = function (component) {
      var instruction = $router.generate([component]);
      $router.navigateByInstruction(instruction);
    }
    
    if (!location.hash) this.goTo('/Product/');
  }
	
	angular.module('braintreeClient')
    .directive('app', AppDirective)
    .controller('AppController', AppController);
  
}

export {AppComponent as default};