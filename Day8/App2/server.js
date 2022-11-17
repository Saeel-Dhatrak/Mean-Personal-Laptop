const express = require('express')
const bodyParser = require('body-parser')
const routerUsers = require('./routes/users')
const routerNotes = require('./routes/notes')

const app = express()
app.use(bodyParser.json())
app.use('/users', routerUsers)
app.use('/notes', routerNotes)


app.get('/', (request, response)=>{
    response.send('welcome to notes backend')
})

app.listen(3000, '0.0.0.0', () => {
    console.log('server started listening on port 3000')
})