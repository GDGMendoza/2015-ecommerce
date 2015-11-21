/// <reference path="../../typings/tsd.d.ts" />
import * as express from "express";
import sale from "./sale.controller";

export default function saleRouter () {
	
	var router = express.Router();
	
  router.route('/')
    .get(sale.list);

  router.route('/:saleId')
    .get(sale.read);
    
  // Terminar bindeando el middleware del sale
  router.param('saleId', sale.saleByID);
	
	return router;
}