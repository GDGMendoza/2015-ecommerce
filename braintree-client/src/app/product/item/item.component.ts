/// <reference path="../../app.d.ts"/>

'use strict';

(function () {

	/* ngInject */
	function ItemConfig ($routeProvider: ng.route.IRouteProvider) {
		$routeProvider.when('/product/item/:id', {
			template: '<product-item></product-item>'
		});
	}

	/* ngInject */
	function ItemDirective () {
		return {
			templateUrl: 'app/product/item/item.html',
			/* ngInject */
			controller: function CreateController($routeParams, ProductService: app.IProductService) {
				var ctrl = this;

				ProductService.getProduct($routeParams.id).then(function (product) {
					ctrl.product = product.data;
				});
				
				ctrl.checkoutInProgress = function (promise: angular.IPromise<any>) {
					
					ctrl.inProgress = true;
					
					promise.then(function () {
						// oculto la opción de pago
						ctrl.showPaymentOption = false;
			
						// agradezco por la compra
						ctrl.transactionComplete = true;
				
					}).finally(function () {
							
						ctrl.inProgress = false;
						
					});
						
				};

				// renderizo los elementos de material design lite
				componentHandler.upgradeDom();
			},
			controllerAs: 'Item'
		};
	}

	angular.module('app.product.item', ['ngRoute', 'backend.product', 'backend.braintree', 'braintreePayments'])
		.config(ItemConfig)
		.directive('productItem', ItemDirective);

})();
