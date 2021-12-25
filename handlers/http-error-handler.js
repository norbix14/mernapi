const createError = require('http-errors')

/**
 * Modulo encargado del manejo de los errores
 * 
 * @module handlers/http-error-handler
*/

/**
 * Middleware para crear un error HTTP
 * 
 * @param {object} req - user request
 * @param {object} res - server response
 * @param {function} next - continue to the next middleware
*/
exports.httpCreateError = (req, res, next) => {
  next(createError(404))
}

/**
 * Middleware para manejar un error HTTP
 *
 * @param {object} err - the error
 * @param {object} req - user request
 * @param {object} res - server response
*/
exports.httpErrorHandler = (err, req, res, next) => {
  if (err) {
    const error = {
      ...err,
      status: err.status || 404,
      message: 'Recurso no encontrado',
      details: {
        errors: [ err ]
      }
    }
    return res.status(error.status).json(error)
  }
  return res.status(500).json({
    status: 500,
    message: 'Ha ocurrido un error con la solicitud',
    details: { 
      errors: [ err ]
    }
  })
}
