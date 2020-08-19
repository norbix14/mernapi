const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const auth = require('../middlewares/auth')
const proyectoController = require('../controllers/proyecto/')

router.post('/',
	auth,
	[
		check('nombre')
		.not()
		.isEmpty()
		.withMessage('El nombre del proyecto es obligatorio')
	],
	proyectoController.crearProyecto
)

router.get('/',
	auth,
	proyectoController.obtenerProyectos
)

router.put('/:id',
	auth,
	[
		check('nombre')
		.not()
		.isEmpty()
		.withMessage('El nombre del proyecto es obligatorio')
	],
	proyectoController.actualizarProyecto
)

router.delete('/:id',
	auth,
	proyectoController.eliminarProyecto
)

module.exports = router
