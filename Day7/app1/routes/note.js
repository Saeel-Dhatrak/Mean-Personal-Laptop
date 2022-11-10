const { response } = require('express')
const express = require('express')
const db = require('../db')
const utils = require('../utils')

const router = express.Router()

router.get('/all', (request, response) => {
    const statement = `select * from note;`

    db.query(statement, (error, dbResult) => {
        
        response.send(utils.createResult(error, dbResult))
    })
})


router.post('/', (request, response) => {
    const userId = request.body.userId
    const contents = request.body.contents

    const statement = `insert into note (userId, contents) values ('${userId}', '${contents}');`

    db.query(statement, (error, dbResult) => {
        
        response.send(utils.createResult(error, dbResult))
    })
})

router.put('/', (request, response) => {
    const userId = request.body.userId
    const contents = request.body.contents
    const statement = `update note set contents = '${contents}' where userId = '${userId}';`

    db.query(statement, (error, dbResult) => {
        response.send(utils.createResult(error, dbResult))
    })
})

router.delete('/', (request, response) => {
    const id = request.body.id

    const statement = `delete from note where id = '${id}';`

    db.query(statement, (error, dbResult) => {
        response.send(utils.createResult(error, dbResult))
    })
})

module.exports = router