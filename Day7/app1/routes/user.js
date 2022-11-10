const e = require('express')
const express = require('express')
const db = require('../db')
const utils = require('../utils')

const router = express.Router()


router.get('/', (request, response) => {
    console.log('inside GET /user')
    response.send('GET /user')
})

router.post('/signin', (request, response) => {
    const email = request.body.email
    const password = request.body.password

    const statement = `select * from user where email = '${email}' and password = '${password}';`

    db.query(statement, (error, users) => {

        const result = { status: '' }
        if(users.length == 0){
            result['status'] = 'error'
            result['error'] = 'user does not exist'
        }
        else{
            const user = users[0]
            result['status'] = 'success'
            result['data'] = {
                id: user['id'],
                email: user['email'],
                firstName: user['firstName'],
                lastName: user['lastName']                
            }
        }  
        
        response.send(result)
    })
})

router.post('/signup', (request, response) => {
    const firstName = request.body.firstName
    const lastName = request.body.lastName
    const email = request.body.email
    const password = request.body.password
    const phone = request.body.phone

    const statement = `insert into user (firstName, lastName, email, password, phone) 
                       values('${firstName}', '${lastName}', '${email}', '${password}', '${phone}')`

    db.query(statement, (error, dbResult) => {
        //const result = utils.createResult(error, dbResult)
        //response.send(result)
        response.send(utils.createResult(error, dbResult))
    })
})


router.put('/update', (request, response) => {
    const id = request.body.id
    const firstName = request.body.firstName
    const lastName = request.body.lastName
    const email = request.body.email
    const password = request.body.password
    const phone = request.body.phone

    // const statement = `insert into user (firstName, lastName, email, password, phone) 
    //                    values('${firstName}', '${lastName}', '${email}', '${password}', '${phone}')`
    

    const statement = `update user set firstName = '${firstName}', lastName = '${lastName}', email = '${email}', password = '${password}', phone ='${phone}' where id = '${id}';`

    db.query(statement, (error, dbResult) => {
        //const result = utils.createResult(error, dbResult)
        //response.send(result)
        response.send(utils.createResult(error, dbResult))
    })
})


router.delete('/', (request, response) => {
    const id = request.body.id
    const statement = `delete from user where id = '${id}';`
    db.query(statement, (error, dbResult) => {
        response.send(utils.createResult(error, dbResult))
    })
})

module.exports = router