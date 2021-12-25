require('dotenv').config()
const mongoose = require('mongoose')

const conectarDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URL_REMOTE, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true
		})
		console.log('La base de datos esta conectada')
	} catch(e) {
		console.log('No se ha podido conectar a BD')
	}
}

module.exports = conectarDB
