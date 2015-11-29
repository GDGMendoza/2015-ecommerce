module ErrorController {
  
 /**
  * Obtener nombre de campo de error único
  */
  var getUniqueErrorMessage = function (err) {
    var output;
  
    try {
      var fieldName = err.errmsg.substring(err.errmsg.lastIndexOf('.$') + 2, err.errmsg.lastIndexOf('_1'));
      output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists';
  
    } catch (ex) {
      output = 'Unique field already exists';
    }
  
    return output;
  };
  
 /**
  * Obtener el mensaje de error del objeto con el error
  */
  export function getErrorMessage (err) {
    var message = '';
  
    if (err.code) {
      switch (err.code) {
        case 11000:
        case 11001:
          message = getUniqueErrorMessage(err);
          break;
        default:
          message = 'Something went wrong';
      }
    } else {
      for (var errName in err.errors) {
        if (err.errors[errName].message) {
          message = err.errors[errName].message;
        }
      }
    }
  
    return message;
  };  
  
}

export {ErrorController as default};