const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const tareaController = require('../controllers/tarea/')

router.post('/',
	auth,
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
