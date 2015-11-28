/// <reference path="../../app.d.ts" />

declare var braintree;

interface IBraintreeScope extends angular.IScope {
  productId: string;
  // text
  descriptionOne: string;
  descriptionTwo: string;
  price: number;
  // text END
  // scope functions
  checkoutInProgress(promise: any);
}

interface IBraintreeController {
  loaded: boolean;
  // form
  cardType: string;
  // controller functions
  confirm();
  isUsingPaypal(): boolean;
}

'use strict';
(function() {
  /**
   * 
	 * Ej: <braintree checkout-in-progress="someFunction(){}" product-id="someId" price="75" description-one="'descripcion uno'" description-two="'description-two'" ></braintree>
   * 
   */

  // @ngInject
  function braintreeDirective($q: angular.IQService, $timeout: angular.ITimeoutService, BraintreeService: app.IBraintreeService): angular.IDirective {
    return {
      restrict: 'E',
      templateUrl: 'app/components/braintree/braintree.component.html',
      scope: {
				checkoutInProgress: '=',
        price: '=',
        productId: '=',
        descriptionOne: '=',
        descriptionTwo: '='
      },
      controllerAs: 'Braintree',
      controller: function ($scope: IBraintreeScope, $element: angular.IRootElementService) {
        
        console.log('scope', $scope);
        
        componentHandler.upgradeDom();

        var ctrl: IBraintreeController = this;

        var paypalNonce: string = "";
        var paypalEmail: string = "";

        ctrl.isUsingPaypal = function () {
          return !!paypalNonce;
        }

        var confirmData: any = {};
        var confirmResolve;
        var confirmReject;

        BraintreeService.getClientToken().then(function (clientToken) {

          ctrl.confirm = function () {
            
            var defer = $q.defer();
            
            // si va a pagar con paypal, ya tiene los datos del nonce y puede pagar
            if (paypalNonce) {
              checkout(paypalNonce, {}, defer.resolve, defer.reject);
            } else {
              // si va a pagar con tarjeta, espero hasta tener el nonce
              confirmResolve = defer.resolve;
              confirmReject = defer.reject;

            }
            
            // paso una promesa de que se esta realizando el pago
            $scope.checkoutInProgress(defer.promise);
          }
          
          braintree.setup(clientToken.data.token, "custom", {
            id: 'form-id',
            hostedFields: {
              styles: {
                // Style all elements
                "input": {
                  "font-size": "16pt",
                  "color": "#3A3A3A"
                }, 
                // Styling element state
                ":focus": {
                  "color": "#1A9DDB"
                },
                ".valid": {
                  "color": "#4caf50"
                },
                ".invalid": {
                  "color": "#F44336"
                },
                // Media queries
                // Note that these apply to the iframe, not the root window.
                "@media screen and (max-width: 700px)": {
                  "input": {
                    "font-size": "14pt"
                  }
                }
              },
              'number': {
                selector: '#number-id'
              },
              'expirationDate': {
                selector: '#expiration-date-id',
                placeholder: 'MM/AA'
              },
              'cvv': {
                selector: '#cvv-id'
              },
              'postalCode': {
                selector: '#postal-code-id'
              }
            },
            paypal: {
              container: 'paypal-container-id',
              onSuccess: function (nonce: string, email: string) {
                // This will be called as soon as the user completes the PayPal flow
                confirmData.braintreeType = "PayPalAccount";
                paypalNonce = nonce;
                paypalEmail = email;
              }
            },
            onCancelled: function () {
              // cuando se cancela en utilizar paypal
              paypalNonce = "";
              paypalEmail = "";
            },
            onPaymentMethodReceived: function (details: app.IBraintreePaymentDetails) {   
              // agrego la información de la tarjeta
              confirmData.braintreeType = details.type;
              confirmData.braintreeLastTwo = details.details.lastTwo;
              confirmData.braintreeCardType = details.details.cardType;
              // continuo con el checkout
              checkout(details.nonce, confirmData, confirmResolve, confirmReject);
            },
            onReady: function (onReady) {
              // quito el spinner y muestro los campos
              ctrl.loaded = true;
              // ingreso el cambio dentro del ciclo de angular
              $scope.$evalAsync();
            },
            onError: function (e) {
              if (confirmReject) confirmReject(e);
            },
            locale: 'es_es'
          });

        });

        function checkout (nonce: string, data, resolve, reject) { 

          // agrego los campos por defecto a enviar
          _.defaults(data, {braintreeEmail: paypalEmail, braintreeLastTwo: "", braintreeCardType: "", nonce: nonce});

          BraintreeService.productCheckout(data, $scope.productId).then(function (data) {

            resolve(data);

          }).catch(function braintreeServiceCheckout (e) {

            reject(e);

          }).finally(function () {
            confirmResolve = undefined;
            confirmReject = undefined;
          });
        }
  
      }
    }
  }

  angular.module('braintreePayments', ['backend.braintree'])
    .directive('braintree', braintreeDirective);

})();
