const express = require('express')
const bodyParser = require('body-parser')
// morgan: for logging
const morgan = require('morgan')
// swagger: for api documentation
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const config = require('./config')
const jwt = require('jsonwebtoken')


const app = express()
app.use(bodyParser.json())
app.use(morgan('combined'))

// swagger init
const swaggerOptions = {
    definition: {
        info: {
            title: 'Amazon Server',
            version: '1.0.0',
            description: 'This is a Express Server for Amazon Application'
        }
    },
    apis: ['./admin/routes/*.js']
}
const swaggerSpec = swaggerJSDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


const adminRouter = require('./admin/routes/admin')
const brandRouter = require('./admin/routes/brand')
const categoryRouter = require('./admin/routes/category')
const orderRouter = require('./admin/routes/order')
const productRouter = require('./admin/routes/product')
const reviewRouter = require('./admin/routes/review')


// add a middleware for getting the id from token
function getUserId(request, response, next){

    if(request.url == '/admin/signin' || request.url == '/admin/signup' || request.url == '/cb6cc43bfb64d84b6a8152997a7ca5d7'){
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



app.use('/admin', adminRouter)
app.use('/brand', brandRouter)
app.use('/category', categoryRouter)
app.use('/order', orderRouter)
app.use('/product', productRouter)
app.use('/review', reviewRouter)

app.get('/', (request, response) => {
    response.send('welcome to the amazon backend server')
})
app.listen(3000, '0.0.0.0', () => {
    console.log('app started listening on port 3000')
})