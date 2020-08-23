const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const authController = require('../controllers/auth/')

router.post('/',
	authController.autenticarUsuario
)

router.get('/',
	auth,
	authController.obtenerUsuarioAutenticado
)

module.exports = router
