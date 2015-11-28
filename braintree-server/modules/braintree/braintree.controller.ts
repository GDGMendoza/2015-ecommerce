import * as braintree from "braintree";
import * as mongoose from "mongoose";
import errors from "../../core/errors.controller";

var Sale = mongoose.model('Sale');

module BraintreeController {
	
	var gateway = braintree.connect({
		environment: braintree.Environment.Sandbox,
		merchantId: "sgxtk48ffb2q6jnw",
		publicKey: "dtk9d584sgtsxzvd",
		privateKey: "6d330cab6b77ac7711e4252a5b6c483e"
	});
	
	export function generateClientToken (req, res) {
		gateway.clientToken.generate({}, function (err, response) {
			if (err) res.sendStatus(503);
			else res.json({token: response.clientToken});
		});
	}
	
	export function checkout (req, res) {
		
		var b = req.body;
		
		// recupero el nonce enviado por el cliente
		var nonce = b.nonce;
				
		// asigno el producto a pagar obtenido por el middleware, en una variable
		var product = req.Product;
		
		gateway.transaction.sale({
			amount: product.dollarPrice,
			paymentMethodNonce: nonce,
		}, function (err, result) {
			if (err) {
				return res.status(400).send({
					message: 'Un problema ha ocurrido. Por favor, intente nuevamente.'
				});
			}
			
			console.log('Result', result);
			
			// aumento el contador de productos vendidos en uno
			product.salesCount++;
			product.save(function () {});
			
			var sale = new Sale({product: product._id});
  
			sale.save(function (err) {
				if (err) {
					return res.status(400).send({
						message: errors.getErrorMessage(err)
					});
				} else {
					// en caso de salir bien, le devolvemos algo al cliente
					res.json(sale);
				}
			});
			
		});
	}
	
}

export {BraintreeController as default};