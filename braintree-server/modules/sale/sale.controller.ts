'use strict';

import * as mongoose from "mongoose";
import errors from "../../core/errors.controller";

var Sale = mongoose.model('Sale');
	
module SaleController {
  
 /**
  * Mostrar la venta actual
  */
  export function read (req, res) {
    res.json(req.Sale);
  };
  
 /**
  * Listar ventas
  */
  export function list (req, res) {
    Sale.find({}).sort('-created').exec(function (err, Sale) {
      if (err) {
        return res.status(400).send({
          message: errors.getErrorMessage(err)
        });
      } else {
        res.json(Sale);
      }
    });
  };
  
 /**
  * Middleware de ventas
  */
  export function saleByID (req, res, next, id) {
  
    var isValid: any = mongoose.Types.ObjectId;
  
    if (!isValid(id)) {
      return res.status(400).send({
        message: 'Sale is invalid'
      });
    }
  
    Sale.findById(id).exec(function (err, Sale) {
      if (err) {
        return next(err);
      } else if (!Sale) {
        return res.status(404).send({
          message: 'No Sale with that identifier has been found'
        });
      }
      req.Sale = Sale;
      next();
    });
  };
  
}

export {SaleController as default};