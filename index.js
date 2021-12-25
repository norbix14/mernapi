require('dotenv').config()
const cors = require('cors')
const express = require('express')
const conectarDB = require('./config/db')
const {
  httpCreateError,
  httpErrorHandler
} = require('./handlers/http-error-handler')

const port = Number(process.env.PORT) || 4000
const host = '0.0.0.0'

const app = express()

conectarDB()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', require('./routes/auth'))
app.use('/api/proyectos', require('./routes/proyectos'))
app.use('/api/tareas', require('./routes/tareas'))
app.use('/api/usuarios', require('./routes/usuarios'))

app.use(httpCreateError)
app.use(httpErrorHandler)

app.listen(port, host, () => console.log(`Servidor en puerto ${port}`))
