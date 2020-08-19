const mongoose = require('mongoose')

const tareaSchema = mongoose.Schema({
	nombre: {
		type: String,
		required: true,
		trim: true
	},
	estado: {
		type: Boolean,
		default: false
	},
	creado: {
		type: Date,
		default: Date.now()
	},
	proyecto: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Proyectos'
	}
})

module.exports = mongoose.model('Tareas', tareaSchema)
