const express = require('express')
const db = require('../db')
const utils = require('../utils')
const jwt = require('jsonwebtoken')
const router = express.Router()

router.get('/', (request, response) => {
    //const {userId} = request.params
    const token = request.headers['token']
    const data = jwt.verify(token, '123456789')
    try{
        const statement = `select id, contents, userId, timestamp from note where userId = '${data.id}'`
        db.query(statement, (error, data) => {
            response.send(utils.createResult(error,data))
        })
    }
    catch(ex){
        response.status(401)
        response.send('You are not Allowed to use this API')
    }
    
})

router.post('/', (request, response) => {
    //const {userId} = request.params
    const token = request.headers['token']
    const data = jwt.verify(token, '123456789')
    try{
        const {contents} = request.body
        const statement = `insert into note (contents, userId) values ('${contents}', '${data.id}')`
        db.query(statement, (error, data) => {
            response.send(utils.createResult(error, data))
        })
    }catch(ex){
        response.status(401)
        response.send('You are not Allowed to use this API')
    }    
})

router.put('/edit/:id', (request, response) => {
    const {id} = request.params
    const {contents} = request.body
    const statement = `update note set contents = '${contents}' where id = '${id}'`
    db.query(statement, (error, data) => {
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:id', (request, response) => {
    const {id} = request.params
    const statement = `delete from note where id = '${id}'`
    db.query(statement, (error, data) => {
        response.send(utils.createResult(error, data))
    })
})

module.exports = router