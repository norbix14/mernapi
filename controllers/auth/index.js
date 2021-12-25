require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Usuario = require('../../models/usuario/')

exports.autenticarUsuario = async (req, res) => {
	try {
		const { email, password } = req.body
		let usuario = await Usuario.findOne({ email })
		if(!usuario) {
			return res.status(404).json({
				msg: 'Este email no pertenece a ninguna cuenta'
			})
		}
		const passOk = await bcrypt.compare(password, usuario.password)
		if(!passOk) {
			return res.status(401).json({
				msg: 'Credenciales incorrectas. Revisa tus datos'
			})
		}
		const payload = { usuario: { id: usuario.id } }
		const secret = process.env.JWT_SECRET
		const expiration = { expiresIn: 3600 }
		const callback = (error, token) => {
			if(error) throw error
			res.status(200).json({
				msg: 'Sesion iniciada correctamente',
				token
			})
		}
		jwt.sign(payload, secret, expiration, callback)
	} catch(e) {
		console.log('Ha ocurrido un error al autenticar al usuario')
		res.status(500).json({
			msg: 'Ha ocurrido un error al autenticar al usuario'
		})
	}
}

exports.obtenerUsuarioAutenticado = async (req, res) => {
	try {
		const usuario = await Usuario.findById(req.usuario.id).select('-password')
		res.status(200).json({
			msg: 'Datos del usuario autenticado',
			usuario
		})
	} catch(e) {
		console.log('No se pudieron obtener los datos del usuario autenticado')
		res.status(500).json({
			msg: 'No se pudieron obtener los datos del usuario autenticado'
		})
	}
}
