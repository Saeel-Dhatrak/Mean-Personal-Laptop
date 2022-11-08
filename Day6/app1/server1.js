const express = require('express')

const app = express()

const bodyParser = require('body-parser')

const mysql = require('mysql')

// app.use(bodyParser)

app.get('/product', (request, response) => {

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'firstdb'
    })

    connection.connect()

 
    const statement = `select id, title, description, price, category, company from product1`


    connection.query(statement, (error, data) => {
        connection.end()

        if(error){
            response.end('error while executing query')
        }else{

            console.log(data)
            response.send(data)
        }
    })
})


// app.post('/product', (request, response) => {

//     console.log('body: ')

    
// })


app.listen('3000', '0.0.0.0', () => {
    console.log('server started listening on port 3000')
})