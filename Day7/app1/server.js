const express = require('express')

const bodyParser = require('body-parser')


const app = express()

const userRouter = require('./routes/user')
const noteRouter = require('./routes/note')
const categoryRouter = require('./routes/category')

// add all the user routes
app.use(bodyParser.json())
app.use('/user',userRouter)
app.use('/note',noteRouter)
app.use('/category', categoryRouter)


app.listen(3000, '0.0.0.0', () => {
    console.log('server strated on port 3000')
})

// the below command is only for linu and MAC user 
// for windows look for something called as "netstat" something something
// lsof -i : 3000 
// the above command will show you which process is listening on port number 3000