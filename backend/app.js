const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const authRoutes = require('./routes/auth.routes')
app.use('/api', authRoutes)

app.listen(3000, () => console.log('Backend en http://localhost:3000'))
