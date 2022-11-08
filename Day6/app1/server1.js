const express = require('express')

const app = express()


// used to parse the request body contents
const bodyParser = require('body-parser')

const mysql = require('mysql')

// use body parser's json parser to parse body into json Object
// when you call json() it returns an object of a function
// which can be used for parsing body to the json object
app.use(bodyParser.json())
// unless we add this app.use middleware, your'e body will not be read by the express

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


app.post('/product', (request, response) => {

    const connection = mysql.createConnection({
        hots: 'localhost',
        user: 'root',
        password: 'root',
        database: 'firstdb'
    })

    connection.connect()

    console.log(`body: `)
    console.log(request.body)

    const statement = `insert into product1
                       (title, description, price,
                        category, company) values
                       ('${request.body.title}',
                       '${request.body.description}',
                       '${request.body.price}',
                       '${request.body.category}',
                       '${request.body.company}')`

    connection.query(statement, (error, data) => {

        connection.end()

        if(error){
            response.end('error has occuered')
        }
        else{
            console.log(data)
            response.send(`data added succesfully`)
        }
    })
})


app.put('/product', (request, response) => {

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'firstdb'
    })

    connection.connect()

    const statement = `update product1 set title = '${request.body.title}' where id = '${request.body.id}'`


    connection.query(statement, (error, data) => {

        connection.end()

        if(error){
            response.end('error has occured while updating')
        }
        else{
            response.send('updated successfully')
        }
    })
})


app.delete('/product', (request, response) => {

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'firstdb'
    })

    connection.connect()

    const statement = `delete from product1 where id = '${request.body.id}'`


    connection.query(statement, (error, data) => {

        connection.end()

        if(error){
            response.end('error has occured while deleting')
        } 
        else{
            response.send('deleted successfully')
        }
    })
})


app.listen('3000', '0.0.0.0', () => {
    console.log('server started listening on port 3000')
})