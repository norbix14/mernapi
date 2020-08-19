const mongoose = require('mongoose')
require('dotenv').config({ path: 'variables.env' })

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
		console.log(e)
		process.exit(1)
	}
}

module.exports = conectarDB
