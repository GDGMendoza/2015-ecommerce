/// <reference path="../../typings/tsd.d.ts" />
import * as express from "express";
import product from "./product.controller";

export default function productRouter () {
	
	var router = express.Router();
	
  router.route('/')
    .get(product.list)
    .post(product.create);

  router.route('/:articleId')
    .get(product.read)
    .put(product.update)
    .delete(product.remove);
    
  // Terminar bindeando el middleware del producto
  router.param('articleId', product.productByID);
	
	return router;
}