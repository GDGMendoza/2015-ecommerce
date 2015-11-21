'use strict';

module CreateComponent {
	console.log('create component');
	
	/* ngInject */
	function CreateDirective () {
		return {
			templateUrl: 'app/product/create/create.html',
			/* ngInject */
			controller: function CreateController($router) {
				this.text = 'Olaf';
			},
			controllerAs: 'Create'
		}
	}
	
	angular.module('app.product')
		.directive('create', CreateDirective);
	
}

export {CreateComponent as default}