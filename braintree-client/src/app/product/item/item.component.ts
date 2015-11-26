/// <reference path="../../app.d.ts"/>

'use strict';

(function () {

	/* ngInject */
	function ItemConfig ($routeProvider: ng.route.IRouteProvider) {
		$routeProvider.when('/product/item', {
			template: '<product-item></product-item>'
		});
	}

	/* ngInject */
	function ItemDirective () {
		return {
			templateUrl: 'app/product/item/item.html',
			/* ngInject */
			controller: function CreateController(ProductService: app.IProductService) {
				var ctrl = this;

				ctrl.product = {};

				ctrl.getProduct = function () {

				};

				// renderizo los elementos de material design lite
				componentHandler.upgradeDom();
			},
			controllerAs: 'Item'
		};
	}

	angular.module('app.product.item', ['ngRoute', 'ProductService'])
		.config(ItemConfig)
		.directive('productItem', ItemDirective);

})();
