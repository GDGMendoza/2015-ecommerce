/// <reference path="../typings/tsd.d.ts" />
import * as express from "express";

import ProductModel from "./product/product.model";
import SaleModel from "./sale/sale.model";
import UserModel from "./user/user.model";

// registro los modelos
ProductModel.register();
SaleModel.register();
UserModel.register();

import braintreeRoutes from "./braintree/braintree.routes";
import productRoutes from "./product/product.routes";
import saleRoutes from "./sale/sale.routes";
import userRoutes from "./user/user.routes";

export default function modules (app: express.Express) {
	
	app.use(function (req, res, next) {
		res.setHeader("Content-Type", "application/json");
		next();
	});
	
	// activo las rutas
	app.use('/braintree', braintreeRoutes());
	app.use('/product', productRoutes());
	app.use('/sale', saleRoutes());
	app.use('/user', userRoutes());
	
	app.use('*', function (req, res) {
		res.sendStatus(404);
	});
}