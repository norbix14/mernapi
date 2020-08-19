require('dotenv').config({ path: 'variables.env' })
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const Usuario = require('../../models/usuario/')

exports.crearUsuario = async (req, res) => {
	const errores = validationResult(req)
	if(!errores.isEmpty()) {
		return res.json({
			errores: errores.array()
		})
	}
	try {
		const { email, password } = req.body
		let usuario = await Usuario.findOne({ email })
		if(usuario) {
			return res.json({
				msg: 'Este email ya esta registrado'
			})
		}
		usuario = new Usuario(req.body)
		const salt = await bcrypt.genSalt(10)
		usuario.password = await bcrypt.hash(password, salt)
		await usuario.save()
		const payload = {
			usuario: { id: usuario.id }
		}
		jwt.sign(payload, 
			process.env.JWT_SECRET,
			{
				expiresIn: 3600
			},
			(error, token) => {
				if(error) throw error
				res.status(200).json({
					msg: 'Usuario creado correctamente',
					token
				})
			}
		)
	} catch(e) {
		console.log('Ha ocurrido un error al crear al usuario')
		res.status(400).json({
			msg: 'Ha ocurrido un error al crear al usuario'
		})
	}
}
