const express = require('express')
const router = express.Router()
const utils = require('../../utils')
const db = require('../../db')
const config = require('../../config')
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')
// --------------------------------------------------------
//--------------GET ROUTES STARTED-------------------------
// GET  
router.get('/', (request, response) => {
    const statement = `select id, title, description from brand;`
    db.query(statement, (error, data) => {
        response.send(utils.createResult(error, data))
    })
})


// --------------------------------------------------------
//--------------POST ROUTES STARTED------------------------
// POST
router.post('/', (request, response) => {
    const { title, description }  = request.body
    const statement = `insert into brand (title, description) values ('${title}', '${description}')`
    db.query(statement, (error, data) => {
        response.send(utils.createResult(error, data))
    })
})


// --------------------------------------------------------
//--------------PUT ROUTES STARTED-------------------------
// PUT
router.put('/:id', (request, response) => {
    const {id} = request.params
    const {title, description} = request.body
    const statement = `update brand set title = '${title}', description = '${description}' where id = '${id}'`
    console.log('after stament')
    db.query(statement, (error, data) => {
        console.log('before response . send')
        response.send(utils.createResult(error, data))
    })
})


// --------------------------------------------------------
//--------------DELETE ROUTES STARTED----------------------
// DELETE
router.delete('/:id', (request, response) => {
    const {id} = request.params
    console.log('the token is ' + request.userId)
    const statement = `delete from brand where id = '${id}';`
    db.query(statement, (error, data) => {
        response.send(utils.createResult(error, data))
    })
})


// -------------------------------------------------
//--------------------------------------------------
module.exports = router