/// <reference path="../typings/tsd.d.ts" />
import * as express from "express";
import braintree from "./braintree/braintree";

export default function modules (app: express.Express) {
	
	var router = express.Router();
	
	app.use('/braintree', braintree(router));
	
}