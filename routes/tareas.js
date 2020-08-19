const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const tareaController = require('../controllers/tarea/')
const auth = require('../middlewares/auth')

router.post('/',
	auth,
	[
		check('nombre')
		.not()
		.isEmpty()
		.withMessage('El nombre de la tarea es requerido'),
		check('proyecto')
		.not()
		.isEmpty()
		.withMessage('El nombre del proyecto es requerido')
	],
	tareaController.crearTarea
)

router.get('/',
	auth,
	tareaController.obtenerTareas
)

router.put('/:id',
	auth,
	tareaController.actualizarTarea
)

router.delete('/:id', 
	auth,
	tareaController.eliminarTarea
)

module.exports = router
