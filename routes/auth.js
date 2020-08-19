const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const authController = require('../controllers/auth/')

router.post('/', 
	[
		check('email')
		.isEmail()
		.withMessage('El email es requerido y debe ser válido'),
		check('password')
		.isLength({ min: 6 })
		.withMessage('La contraseña mínima es de 6 caracteres')
	],
	authController.autenticarUsuario
)

module.exports = router
