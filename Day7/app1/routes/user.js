const e = require('express')
const express = require('express')
const db = require('../db')

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
        const result = { status: '', data: '', error: '' }
        if(error){
            result['status'] = 'error'
            result['error'] = error
        }
        else{
            result['status'] = 'success'
            result['data'] = dbResult
        }
        response.send(result)
    })
})

module.exports = router