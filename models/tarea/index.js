const { Schema, model } = require('mongoose')

const tareaSchema = Schema({
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
		type: Schema.Types.ObjectId,
		ref: 'Proyectos'
	}
})

module.exports = model('Tareas', tareaSchema)
