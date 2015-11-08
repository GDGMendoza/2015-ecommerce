/// <reference path="../typings/tsd.d.ts" />
import * as express from "express";

import ProductModel from "./product/product.model";

// registro los modelos
ProductModel.register();

import braintreeRoutes from "./braintree/braintree.routes";
import productRoutes from "./product/product.routes";

export default function modules (app: express.Express) {
	
	app.use(function (req, res, next) {
		res.setHeader("Content-Type", "application/json");
		next();
	});
	
	// activo las rutas
	app.use('/braintree', braintreeRoutes());
	app.use('/product', productRoutes());
	
	app.use('*', function (req, res) {
		res.sendStatus(404);
	});
}