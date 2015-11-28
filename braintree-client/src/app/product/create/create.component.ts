/// <reference path="../../app.d.ts"/>

'use strict';

(function () {

	/* ngInject */
	function CreateConfig ($routeProvider: ng.route.IRouteProvider) {
		$routeProvider.when('/product/create', {
			template: '<product-create></product-create>'
		});
	}

	/* ngInject */
	function CreateDirective () {
		return {
			templateUrl: 'app/product/create/create.html',
			/* ngInject */
			controller: function CreateController ($element: ng.IRootElementService, $scope: ng.IScope, 
				$timeout: ng.ITimeoutService, ProductService: app.IProductService) {
				
				var ctrl = this;

				ctrl.product = {};

				ctrl.createProduct = function () {
					ProductService.addProduct(ctrl.product).then(function (product) {
						ctrl.product = {};
						// limpio los inputs
						$timeout(function () {
							_.forEach(document.querySelectorAll('form .mdl-js-textfield'), function (element: any) {
								element.MaterialTextfield.checkDirty();
							});
						}, 0);
					});
				};

				// renderizo los elementos de material design lite
				componentHandler.upgradeDom();
			},
			controllerAs: 'Create'
		};
	}

	angular.module('app.product.create', ['ngRoute', 'backend.product'])
		.config(CreateConfig)
		.directive('productCreate', CreateDirective);

})();
