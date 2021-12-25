const { Schema, model } = require('mongoose')

const UsuariosSchema = Schema({
	nombre: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		trim: true
	},
	registro: {
		type: Date,
		default: Date.now()
	}
})

module.exports = model('Usuario', UsuariosSchema)
