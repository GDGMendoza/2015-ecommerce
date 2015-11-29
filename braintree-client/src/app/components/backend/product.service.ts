/// <reference path="../../app.d.ts"/>

'use strict';

(function () {

	/* ngInject */
	function ProductService ($http: ng.IHttpService): app.IProductService {

		var api = '/api/product';

		return {
			addProduct (product) {
				return $http.post(api, product);
			},
			listProducts () {
				return $http.get(api);
			},
			getProduct (id) {
				return $http.get(`${api}/${id}`);
			},
			updateProduct (id, product) {
				return $http.put(`${api}/${id}`, product);
			},
			removeProduct (id) {
				return $http.delete(`${api}/${id}`);
			}
		};

	}

	angular.module('backend.product', [])
		.factory('ProductService', ProductService);

})();
