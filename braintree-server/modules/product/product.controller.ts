'use strict';

import * as mongoose from "mongoose";
import errors from "../../core/errors.controller";

var Product = mongoose.model('Product');
	
module ProductController {
  
 /**
  * Crear Producto
  */
  export function create (req, res) {
    var Product = new Product(req.body);
  
    Product.save(function (err) {
      if (err) {
        return res.status(400).send({
          message: errors.getErrorMessage(err)
        });
      } else {
        res.json(Product);
      }
    });
  };
  
 /**
  * Mostrar el producto actual
  */
  export function read (req, res) {
    res.json(req.Product);
  };
  
 /**
  * Actualizar un producto
  */
  export function update (req, res) {
    var Product = req.Product;
  
    Product.title = req.body.title;
    Product.content = req.body.content;
  
    Product.save(function (err) {
      if (err) {
        return res.status(400).send({
          message: errors.getErrorMessage(err)
        });
      } else {
        res.json(Product);
      }
    });
  };
  
 /**
  * Eliminar un producto
  */
  export function remove (req, res) {
    var Product = req.Product;
  
    Product.remove(function (err) {
      if (err) {
        return res.status(400).send({
          message: errors.getErrorMessage(err)
        });
      } else {
        res.json(Product);
      }
    });
  };
  
 /**
  * Listar productos
  */
  export function list (req, res) {
    Product.find({}).sort('-created').exec(function (err, Products) {
      if (err) {
        return res.status(400).send({
          message: errors.getErrorMessage(err)
        });
      } else {
        res.json(Products);
      }
    });
  };
  
 /**
  * Middleware de productos
  */
  export function productByID (req, res, next, id) {
  
    var isValid: any = mongoose.Types.ObjectId;
  
    if (!isValid(id)) {
      return res.status(400).send({
        message: 'Product is invalid'
      });
    }
  
    Product.findById(id).exec(function (err, Product) {
      if (err) {
        return next(err);
      } else if (!Product) {
        return res.status(404).send({
          message: 'No Product with that identifier has been found'
        });
      }
      req.Product = Product;
      next();
    });
  };
  
}

export {ProductController as default};