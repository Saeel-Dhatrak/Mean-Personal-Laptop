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
router.get('/:productId', (request, response) => {
    const {productId} = request.params
    const statement = `select id, userId, review, rating from productReviews where productId = '${productId}'`
    db.query(statement, (error, data) => {
        response.send(utils.createResult(error,data))
    })

})


// --------------------------------------------------------
//--------------POST ROUTES STARTED------------------------
// POST
// router.post('/:iproductId', (request, response) => {
//     const {productId} = request.params
//     const {review, rating} = request.body
//     const statement = `insert into priductReviews (review, productId, userId, rating) values 
//     ('${review}', '${productId}', '${request.userId}', '${rating}')`
//     db.query(statement, (error, data) => {
//         response.send(utils.createResult(error,data))
//     })
// })


// --------------------------------------------------------
//--------------PUT ROUTES STARTED-------------------------
// PUT
router.put('/', (request, response) => {
    response.send()
})


// --------------------------------------------------------
//--------------DELETE ROUTES STARTED----------------------
// DELETE
router.delete('/:id', (request, response) => {
    const {id} = request.params
    const statement = `delete from productReviews where id = '${id}';`
    db.query(statement, (error, data) => {
        response.send(utils.createResult(error, data))
    })
})


// -------------------------------------------------
//--------------------------------------------------
module.exports = router