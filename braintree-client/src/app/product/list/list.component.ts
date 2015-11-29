/// <reference path="../../app.d.ts"/>

'use strict';

(function () {

	/* ngInject */
	function ListeConfig ($routeProvider: ng.route.IRouteProvider) {
		$routeProvider.when('/product/list', {
			template: '<product-list></product-list>'
		});
	}

	/* ngInject */
	function ListDirective () {
		return {
			templateUrl: 'app/product/list/list.html',
			/* ngInject */
			controller: function ListController(ProductService: app.IProductService) {

				var ctrl = this;

				ProductService.listProducts().then(function (products) {
					ctrl.products = products.data;
				});

			},
			controllerAs: 'List'
		};
	}

	angular.module('app.product.list', ['ngRoute', 'backend.product'])
		.config(ListeConfig)
		.directive('productList', ListDirective);

})();
