const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const todos = require('./routes/todos')
const register = require('./routes/register')

require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/todos', todos)
app.use('/api/register', register)

app.get('/', (req, res) => {
    res.send('hello')
})

const connection_string = process.env.CONNECTION_STRING
const port = process.env.PORT || 5001

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})

// 與 Mongo 建立連線
mongoose.connect(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connection established..."))
    .catch((error) => console.error("MongoDB connection failed:", error.message))