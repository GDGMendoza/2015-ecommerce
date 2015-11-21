'use strict';

import * as mongoose from "mongoose";

var Schema = mongoose.Schema;

/**
 * User Schema
 */
var User = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    trim: true,
    unique: true,
		required: 'Username is required'
  },
  password: {
    type: String,
    trim: true,
    required: 'Password is required'
  },
  name: {
    type: String,
    trim: true,
    required: 'Name can not be blank'
  }
});

module UserModel {
  export function register () {
    mongoose.model('User', User);
  }
}

export {UserModel as default};