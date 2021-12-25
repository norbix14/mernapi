require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Usuario = require('../../models/usuario/')

exports.crearUsuario = async (req, res) => {
	try {
		const { email, password } = req.body
		let usuario = await Usuario.findOne({ email })
		if(usuario) {
			return res.status(400).json({
				msg: 'Este email ya esta registrado'
			})
		}
		usuario = new Usuario(req.body)
		const salt = await bcrypt.genSalt(10)
		usuario.password = await bcrypt.hash(password, salt)
		await usuario.save()
		const payload = { usuario: { id: usuario.id } }
		const secret = process.env.JWT_SECRET
		const expiration = { expiresIn: 3600 }
		const callback = (error, token) => {
			if(error) throw error
			res.status(200).json({
				msg: 'Usuario creado correctamente',
				token
			})
		}
		jwt.sign(payload, secret, expiration, callback)
	} catch(e) {
		console.log('Ha ocurrido un error al crear al usuario')
		res.status(500).json({
			msg: 'Ha ocurrido un error al crear al usuario'
		})
	}
}
