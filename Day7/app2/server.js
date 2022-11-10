const express = require('express')

const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

const userRouter = require('./routes/note')


app.use('/user', userRouter)


app.listen(3000, '0.0.0.0', () => {
    console.log('app started listening on port 3000')
})