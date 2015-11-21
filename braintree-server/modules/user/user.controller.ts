'use strict';

import * as mongoose from "mongoose";
import errors from "../../core/errors.controller";

var User = mongoose.model('User');
	
module UserController {
  
 /**
  * Mostrar el producto actual
  */
  export function read (req, res) {
    res.json(req.User);
  };
  
 /**
  * Listar productos
  */
  export function list (req, res) {
    User.find({}).sort('-created').exec(function (err, User) {
      if (err) {
        return res.status(400).send({
          message: errors.getErrorMessage(err)
        });
      } else {
        res.json(User);
      }
    });
  };
  
 /**
  * User middleware
  */
  export function userByID (req, res, next, id) {
  
    var isValid: any = mongoose.Types.ObjectId;
  
    if (!isValid(id)) {
      return res.status(400).send({
        message: 'User is invalid'
      });
    }
  
    User.findById(id).exec(function (err, User) {
      if (err) {
        return next(err);
      } else if (!User) {
        return res.status(404).send({
          message: 'No User with that identifier has been found'
        });
      }
      req.User = User;
      next();
    });
  };
  
}

export {UserController as default};