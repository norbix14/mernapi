require('dotenv').config({ path: 'variables.env' })
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
		process.exit(1)
	}
}

module.exports = conectarDB
