require('dotenv').config({ path: 'variables.env' })
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
	const token = req.header('x-auth-token')
	if(!token) {
		return res.json({
			msg: 'No hay token. Acceso denegado'
		})
	}
	try {
		const cifrado = jwt.verify(token, process.env.JWT_SECRET)
		req.usuario = cifrado.usuario
		next()
	} catch(e) {
		console.log('Token no valido')
		res.status(401).json({
			msg: 'Token no válido'
		})
	}
}
