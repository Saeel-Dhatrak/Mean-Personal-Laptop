const express = require('express')

const router = express.Router()

router.get('/note', (request, response) => {
    console.log('inside GET /note')
    response.send('GET /note')
})

module.exports = router