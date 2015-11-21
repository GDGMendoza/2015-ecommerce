export interface IProduct {
	id?: number;
	created: string;
	title: string;
	content: string;
	image: string;
	dollarPrice: string;
}

export class ProductService {
	
	api = '/product';
	
	/* @ngInject */
	constructor (public $http: ng.IHttpService) {
		
	}
	
	addProduct (product: IProduct): ng.IPromise<IProduct> {
		return this.$http.post(this.api, product);
	}
	
	listProducts (): ng.IPromise<[IProduct]> {
		return this.$http.get(this.api);
	}
	
	getProduct (id: number): ng.IPromise<IProduct> {
		return this.$http.get(`${this.api}/${id}`);
	}
	
	updateProduct (id: number, product: IProduct): ng.IPromise<IProduct> {
		return this.$http.put(`${this.api}/${id}`, product);
	}
	
	removeProduct (id: number): ng.IPromise<any> {
		return this.$http.delete(`${this.api}/${id}`);
	}
	
}