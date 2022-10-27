const express = require('express')
const cors = require('cors')
const {seed} = require('./seed')
const { getHTML,addDay,getDays } = require('./controller')
require('dotenv').config()
const app = express()
app.use(express.static('public'))
app.use(express.json())
app.use(cors())

app.post('/seed',seed)
app.get('/',getHTML)
app.get('/days',getDays)

app.post('/day',addDay)

const port = process.env.PORT || 4567
app.listen(port, console.log(`Server running on ${port}`))