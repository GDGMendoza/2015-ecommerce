/// <reference path="../../typings/tsd.d.ts" />
import * as express from "express";
import user from "./user.controller";

export default function userRouter () {
	
	var router = express.Router();
	
  router.route('/')
    .get(user.list);

  router.route('/:userId')
    .get(user.read);
    
  // Terminar bindeando el middleware del user
  router.param('userId', user.userByID);
	
	return router;
}