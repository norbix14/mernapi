require('dotenv').config({ path: 'variables.env' })
const cors = require('cors')
const express = require('express')
const conectarDB = require('./config/db')

const port = process.env.PORT || 4000
const host = '0.0.0.0'

const app = express()

conectarDB()

app.use(cors())

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth'))
app.use('/api/proyectos', require('./routes/proyectos'))
app.use('/api/tareas', require('./routes/tareas'))
app.use('/api/usuarios', require('./routes/usuarios'))

app.listen(port, host, () => console.log(`Servidor en puerto ${port}`))
