/// <reference path="../../typings/tsd.d.ts" />
import * as express from "express";
import braintree from "./braintree.controller";
import product from "../product/product.controller";

export default function braintreeRouter () {
	
	var router = express.Router();
	
	router
		.get("/", braintree.generateClientToken)
		.post("/:productId", braintree.checkout);
	
  // Terminar bindeando el middleware del producto
  router.param('productId', product.productByID);
	
	return router;
}