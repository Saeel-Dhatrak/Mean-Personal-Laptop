const express = require('express')
const db = require('../db')
const utils = require('../utils')
const crypto = require('crypto-js')
const router = express.Router()

router.get('/profile/:id', (request, response) => {
    const {id} = request.params
    //const encryptedPassword = crypto.SHA256(password)
    //const statement = `select firstName, lastName, email, phone from user where email = '${email}' and password = '${encryptedPassword}'`
    const statement = `select * from user where id = '${id}'`
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
    const statement = `select firstName, lastName, email, phone from user where email = '${email}' and password = '${encryptedPassword}'`
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
})

router.put('/', (request, response) => {
    response.send('In the /PUT of users')
})

router.delete('/', (request, response) => {
    response.send('In the /DELETE of users')
})

module.exports = router