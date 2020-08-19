const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const usuarioController = require('../controllers/usuario/')

router.post('/', 
	[
		check('nombre')
		.not()
		.isEmpty()
		.withMessage('El nombre es requerido'),
		check('email')
		.isEmail()
		.withMessage('El email es requerido y debe ser válido'),
		check('password')
		.isLength({ min: 6 })
		.withMessage('La contraseña mínima es de 6 caracteres')
	],
	usuarioController.crearUsuario
)

module.exports = router
