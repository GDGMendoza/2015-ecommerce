/// <reference path="../../typings/tsd.d.ts" />
import * as express from "express";
import braintree from "./braintree.controller";

export default function braintreeRouter () {
	
	var router = express.Router();
	
	router
		.get("/client_token", braintree.generateClientToken)
		.post("/checkout", braintree.checkout);
	
	return router;
}