require('dotenv').config({ path: 'variables.env' })
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const Usuario = require('../../models/usuario/')

exports.autenticarUsuario = async (req, res) => {
	const errores = validationResult(req)
	if(!errores.isEmpty()) {
		return res.status(400).json({
			errores: errores.array()
		})
	}
	try {
		const { email, password } = req.body
		let usuario = await Usuario.findOne({ email })
		if(!usuario) {
			return res.json({
				msg: 'Este email no pertenece a ninguna cuenta'
			})
		}
		const passOk = await bcrypt.compare(password, usuario.password)
		if(!passOk) {
			return res.json({
				msg: 'Credenciales incorrectas. Revisa tu contraseña'
			})
		}
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
					token,
					msg: 'Sesion iniciada correctamente'
				})
			}
		)
	} catch(e) {
		console.log('Ha ocurrido un error al autenticar al usuario')
		res.status(400).json({
			msg: 'Ha ocurrido un error al autenticar al usuario'
		})
	}
}
