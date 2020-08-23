const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const proyectoController = require('../controllers/proyecto/')

router.post('/',
	auth,
	proyectoController.crearProyecto
)

router.get('/',
	auth,
	proyectoController.obtenerProyectos
)

router.put('/:id',
	auth,
	proyectoController.actualizarProyecto
)

router.delete('/:id',
	auth,
	proyectoController.eliminarProyecto
)

module.exports = router
