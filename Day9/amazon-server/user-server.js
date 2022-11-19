const express = require('express')
const bodyParser = require('body-parser')

// morgan: for logging
const morgan = require('morgan')

// swagger: for api documentation
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const config = require('./config')
const jwt = require('jsonwebtoken')

// routers
const userRouter = require('./user/routes/user')

const app = express()
app.use(bodyParser.json())
app.use(morgan('combined'))

// swagger init
const swaggerOptions = {
    definition: {
        info: {
            title: 'Amazon Server (User Front)',
            version: '1.0.0',
            description: 'This is a Express Server for Amazon Application'
        }
    },
    apis: ['./user/routes/*.js']
}
const swaggerSpec = swaggerJSDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))




// add a middleware for getting the id from token
function getUserId(request, response, next){

    if(request.url == '/user/signin' || request.url == '/user/signup'){
        // do not check for token
         console.log('secret if = ' + config.secret)
        next()
    }else{

         console.log('secret else = ' + config.secret)

        try{
            const token = request.headers['token']
            const data = jwt.verify(token, config.secret)
    
            // add a new key named userId with the logged in user's id
            request.userId = data['id']
    
            // go to actual route
            next()
        }
        catch(ex){
            response.status(401)
            response.send({status: 'error', error: 'This is protected API'})
        }
    }
    
}

app.use(getUserId)

//required to send the static images
app.use(express.static('images/'))

// add the routes
app.use('/user', userRouter)



app.get('/', (request, response) => {
    response.send('welcome to the amazon backend server')
})
app.listen(4000, '0.0.0.0', () => {
    console.log('user server started listening on port 4000')
})