'use strict';

import * as mongoose from "mongoose";

var Schema = mongoose.Schema;

/**
 * Sale Schema
 */
var Sale = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }
});

module SaleModel {
  export function register () {
    mongoose.model('Sale', Sale);
  }
}

export {SaleModel as default};