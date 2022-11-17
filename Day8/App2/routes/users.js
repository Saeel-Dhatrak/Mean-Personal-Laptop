const express = require('express')
const db = require('../db')
const utils = require('../utils')
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')
const router = express.Router()

router.get('/profile', (request, response) => {

    const token = request.headers['token']
    console.log(`token: ${token}`)
    try{
        const data = jwt.verify(token, '123456789')
        console.log(`token data`)
        console.log(data)

        const statement = `select firstName, lastName, email, phone from user where id = '${data.id}'`
        db.query(statement, (error, users) => {
            if(error){
                response.send({status: 'error', error: error })
            }else{
                if(users.length == 0){
                    response.send({status: 'error', error: 'user does not exist'})
                }
                else{
                    const user = users[0]
                    response.send({status: 'success', data: user })
                }
            }
        })
    }
    catch(ex){
        console.log(ex)
        // unauthorized API
        response.status(401)
        response.send('you are not allowed to access thi API')
    }    
    

    
    
})

router.post('/signup', (request, response) => {
    const {firstName, lastName, email, password, phone} = request.body
    const encryptedPassword = crypto.SHA256(password)
    const statement = `insert into user (firstName, lastName, email, password, phone) values 
        ('${firstName}', '${lastName}', '${email}', '${encryptedPassword}', '${phone}')`
    db.query(statement, (error, data) => {
        response.send(utils.createResult(error, data))
    })
})

router.post('/signin', (request, response) => {
    const {email, password} = request.body
    const encryptedPassword = crypto.SHA256(password)
    const statement = `select id, firstName, lastName, email, phone from user where email = '${email}' and password = '${encryptedPassword}'`
    db.query(statement, (error, users) => {
        if(error){
            response.send({status: 'error', error: error })
        }else{
            if(users.length == 0){
                response.send({status: 'error', error: 'user does not exist'})
            }
            else{
                const user = users[0]
                const token = jwt.sign({ id: user['id'] }, '123456789')
                response.send({status: 'success', data: 
                    {
                        firstName: user['firstName'],
                        lastName: user['lastName'],
                        email: user['email'],
                        phone: user['phone'],
                        token: token
                    } })
            }
        }
    })
})

router.put('/', (request, response) => {
    response.send('In the /PUT of users')
})

router.delete('/', (request, response) => {
    response.send('In the /DELETE of users')
})

module.exports = router