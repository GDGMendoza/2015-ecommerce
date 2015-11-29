/// <reference path="../../.tmp/typings/tsd.d.ts"/>

declare var componentHandler;
declare var moment: moment.MomentStatic;

declare module app {

	interface IBraintreePaymentDetails {
    details: {
      // target card
      cardType?: string; // Visa, MasterCard, Discover, Amex, JCB
      lastTwo?: string; // The last two digits of the supplied card
      // target card END
      // paypal
      email?: string;
      // paypal END
    }
    nonce: string;
    type: string; // CreditCard | PayPalAccount
  }

	interface IBraintreeToken {
		token: string;
	}

	interface IProduct {
		id?: number;
		created: string;
		title: string;
		content: string;
		image: string;
		dollarPrice: string;
		salesCount: number;
	}

	interface IBraintreeService {
		productCheckout(data: any, productId: string): ng.IHttpPromise<any>;
		getClientToken(): ng.IHttpPromise<IBraintreeToken>;
	}

	interface IProductService {
		addProduct (product: IProduct): ng.IHttpPromise<IProduct>;
		listProducts (): ng.IHttpPromise<[IProduct]>;
		getProduct (id: number): ng.IHttpPromise<IProduct>;
		updateProduct (id: number, product: IProduct): ng.IHttpPromise<IProduct>;
		removeProduct (id: number): ng.IHttpPromise<any>;
	}

}
