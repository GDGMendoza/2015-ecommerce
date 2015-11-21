'use strict';

import * as mongoose from "mongoose";

var Schema = mongoose.Schema;

/**
 * Product Schema
 */
var Product = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
	image: {
		type: String,
		default: '',
		trim: true
	},
	dollarPrice: {
		type: String,
		trim: true,
		required: 'Dollar price cannot be blank'
	}
});

module ProductModel {
  export function register () {
    mongoose.model('Product', Product);
  }
}

export {ProductModel as default};