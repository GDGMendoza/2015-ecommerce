/// <reference path="../typings/tsd.d.ts" />
import * as express from "express";

import ProductModel from "./product/product.model";
import SaleModel from "./sale/sale.model";

// registro los modelos
ProductModel.register();
SaleModel.register();

import braintreeRoutes from "./braintree/braintree.routes";
import productRoutes from "./product/product.routes";

export default function modules (app: express.Express) {
	
	app.use(function (req, res, next) {
		res.setHeader("Content-Type", "application/json");
		next();
	});
	
	var router = express.Router();
	
	// activo las rutas
	router.use('/braintree', braintreeRoutes());
	router.use('/product', productRoutes());
	
	// todas los servicios van a estar bajo /api
	app.use('/api', router);
	
	app.use('*', function (req, res) {
		res.sendStatus(404);
	});
}