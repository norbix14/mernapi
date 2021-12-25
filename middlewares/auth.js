require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
	const token = req.header('x-auth-token')
	if(!token) {
		return res.status(401).json({
			msg: 'No hay token. Acceso denegado'
		})
	}
	try {
		const { usuario } = jwt.verify(token, process.env.JWT_SECRET)
		req.usuario = usuario
		next()
	} catch(e) {
		console.log('Token incorrecto')
		res.status(401).json({
			msg: 'Token incorrecto'
		})
	}
}
