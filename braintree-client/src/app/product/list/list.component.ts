'use strict';

module ListComponent {
	console.log('list component');
	
	/* ngInject */
	function ListDirective () {
		return {
			templateUrl: 'app/product/list/list.html',
			/* ngInject */
			controller: function ListController($router) {
				this.text = 'Olaf';
			},
			controllerAs: 'list'
		}
	}
	
	angular.module('app.product')
		.directive('list', ListDirective);
	
}

export {ListComponent as default}