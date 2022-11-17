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
    response.send()
})


// --------------------------------------------------------
//--------------POST ROUTES STARTED------------------------
// POST
router.post('/', (request, response) => {
    response.send()
})


// --------------------------------------------------------
//--------------PUT ROUTES STARTED-------------------------
// PUT
router.put('/', (request, response) => {
    response.send()
})


// --------------------------------------------------------
//--------------DELETE ROUTES STARTED----------------------
// DELETE
router.delete('/', (request, response) => {
    response.send()
})


// -------------------------------------------------
//--------------------------------------------------
module.exports = router