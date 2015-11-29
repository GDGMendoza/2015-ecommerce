/// <reference path="typings/tsd.d.ts" />

import * as path from "path";
import * as bodyParser from "body-parser";
import * as express from "express";

import mongoose from "./common/mongoose";
import modules from "./modules/modules";

var app = express();

app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);

// Realizo la conección a la base de datos
mongoose.connect().then(function (db) {
	// Inicio los modulos
	modules(app);
});

var port = app.get('port');
app.listen(port, function() {
	console.log('Listen on port', port);
});