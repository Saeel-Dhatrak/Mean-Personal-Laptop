const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/get', (request, response) => {
    console.log('inside the GET / Method USER')
    response.send('GET /User')
})

router.post('/singin', (request, response) => {
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



module.exports = router