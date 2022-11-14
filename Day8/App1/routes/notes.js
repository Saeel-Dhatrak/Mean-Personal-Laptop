const express = require('express')
const db = require('../db')
const utils = require('../utils')
const router = express.Router()

router.get('/:userId', (request, response) => {
    const {userId} = request.params
    const statement = `select id, contents, userId, timestamp from note where userId = '${userId}'`
    db.query(statement, (error, data) => {
        response.send(utils.createResult(error,data))
    })
})

router.post('/:userId', (request, response) => {
    const {userId} = request.params
    const {contents} = request.body
    const statement = `insert into note (contents, userId) values ('${contents}', '${userId}')`
    db.query(statement, (error, data) => {
        response.send(utils.createResult(error, data))
    })
    
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